"use client";
import { useState, useRef, useEffect } from "react";
import { flushSync } from "react-dom";
import TrendChart from "./TrendChart";

type SerialPort = any;
type ReadableStreamDefaultReader<T> = any;
type WritableStreamDefaultWriter<T = any> = any;


interface RegisterRow {
  index: number;
  decimal: number | string;
}

export default function ModbusRTU() {
  const [port, setPort] = useState<SerialPort | null>(null);
  const [log, setLog] = useState<string[]>([]);
  const [registers, setRegisters] = useState<RegisterRow[]>([]);
  const [history, setHistory] = useState<(number | string)[][]>([]);
  const [polling, setPolling] = useState(false);
  const [pollCount, setPollCount] = useState(0);
  const [step, setStep] = useState<"idle" | "confirmed" | "recording">("idle");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);


  const pollCountRef = useRef(0);
  const pollingIntervalRef = useRef<number | null>(null);
  const countdownRef = useRef<number | null>(null);
  const bufferRef = useRef<Uint8Array>(new Uint8Array());
  const readerRef = useRef<ReadableStreamDefaultReader<Uint8Array> | null>(null);
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastErrorRef = useRef<string | null>(null);
  const seqRef = useRef(0);
  const addressRef = useRef(0);
  const pollingRef = useRef(false);
  useEffect(() => { pollingRef.current = polling; }, [polling]);

  const firstResponseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastAutoReadErrorRef = useRef<string | null>(null);
  const wasDisconnectedRef = useRef(false);


  // connection settings
  const [baudRate, setBaudRate] = useState(38400);
  const [dataBits, setDataBits] = useState(8);
  const [parity, setParity] = useState<"none" | "even" | "odd">("even");
  const [stopBits, setStopBits] = useState(1);

  // read/write settings
  const [hasError, setHasError] = useState(false);
  const [slaveId, setSlaveId] = useState(1);
  const [func, setFunc] = useState(3);
  const [address, setAddress] = useState(0);
  const [quantity, setQuantity] = useState(10);
  const [scanRate, setScanRate] = useState(1000);
  const [dataType, setDataType] = useState<
    | "signed"
    | "unsigned"
    | "hex"
    | "float"
    | "floatInverse"
    | "double"
    | "doubleInverse"
    | "long"
    | "longInverse"
  >("signed");

  const dataTypeRef = useRef(dataType);
  useEffect(() => {
    dataTypeRef.current = dataType;
  }, [dataType]);

  useEffect(() => {
    addressRef.current = address;
  }, [address]);

  useEffect(() => {
    pollCountRef.current = pollCount;
  }, [pollCount]);

  /* ---------------- PORT İŞLEMLERİ ---------------- */
  async function connectPort() {
    try {
      const selectedPort = await navigator.serial.requestPort();
      await selectedPort.open({ baudRate, dataBits, parity, stopBits });
      setPort(selectedPort);
      setLog((p) => [
        ...p,
        `✅ Modbus RTU bağlantısı kuruldu (${baudRate}, ${dataBits}${parity}, ${stopBits} stop)`,
      ]);
      startReader(selectedPort);
    } catch (err: any) {
      const msg =
        err.message?.includes("open")
          ? "❌ Port zaten kullanımda veya uygun değil."
          : err.message?.includes("NetworkError")
          ? "❌ Port bağlantısı reddedildi veya kullanımda."
          : "❌ Port açılamadı: " + err.message;
      setLog((p) => [...p, msg]);
      alert(msg);
    }
  }

  async function closePort() {
    try {
      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
      if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
      if (readerRef.current) {
        try {
          await readerRef.current.cancel();
        } catch {}
        try {
          readerRef.current.releaseLock();
        } catch {}
      }
      await port?.close();
      setRegisters([]);
      setHistory([]);
      setStep("idle");
      setPolling(false);
      setLog((p) => [...p, "🔌 Port kapatıldı"]);
    } catch (err: any) {
      setLog((p) => [...p, "⚠️ Port kapatılamadı: " + err.message]);
    }
  }

  /* ---------------- CRC / READER ---------------- */
  function calcCRC(buf: number[]): [number, number] {
    let crc = 0xffff;
    for (let pos = 0; pos < buf.length; pos++) {
      crc ^= buf[pos];
      for (let i = 0; i < 8; i++) {
        if (crc & 1) {
          crc >>= 1;
          crc ^= 0xa001;
        } else crc >>= 1;
      }
    }
    return [crc & 0xff, (crc >> 8) & 0xff];
  }

  async function startReader(selectedPort: SerialPort) {
    const reader = selectedPort.readable?.getReader();
    if (!reader) return;
    readerRef.current = reader;

    try {
      while (selectedPort.readable) {
        const { value, done } = await reader.read().catch(() => ({ done: true }));
        if (done || !value) break;

        const newBuffer = new Uint8Array(bufferRef.current.length + value.length);
        newBuffer.set(bufferRef.current);
        newBuffer.set(value, bufferRef.current.length);
        bufferRef.current = newBuffer;

        if (bufferRef.current.length >= 5) processBuffer();
      }
    } catch (err: any) {
      const message = err?.message || "Cihaz yanıt vermiyor";

      if (lastAutoReadErrorRef.current !== message) {
        setLog((p) => [
          ...p.slice(-99),
          "⛔ Bağlantı koptu: Cihazdan veri alınamadı. Kabloyu kontrol edin."
        ]);
        lastAutoReadErrorRef.current = message;
      }
      wasDisconnectedRef.current = true;

      flushSync(() => {
        setPolling(false);
        pollingRef.current = false;
        setStep("idle");
	setHasError(true);
      });

      try { await port?.close(); } catch {}

    } finally {
      try { reader.releaseLock(); } catch {}
      readerRef.current = null;
    }
  }

  function processBuffer() {
    const buf = bufferRef.current;
    if (!buf || buf.length < 3) return;
    if (buf[0] !== slaveId) return;

    const funcCode = buf[1];

    if (funcCode === func && buf.length >= 3) {
      const byteCount = buf[2];
      const expectedLength = 3 + byteCount + 2;
      if (buf.length >= expectedLength) {
        const fullPacket = buf.slice(0, expectedLength);
        bufferRef.current = buf.slice(expectedLength);
        handleResponse(fullPacket);
        lastErrorRef.current = null;
      }
    } else if (funcCode & 0x80) { 
        if (buf.length >= 5) {
          const errorCode = buf[2];
      
          const errorMap: Record<number, string> = {
            1: "Illegal Function",
            2: "Illegal Data Address",
            3: "Illegal Data Value",
            4: "Slave Device Failure",
          };

          const desc = `Modbus Exception (Code ${errorCode})${
            errorMap[errorCode] ? ` - ${errorMap[errorCode]}` : ""
          }`;

          if (lastErrorRef.current !== desc) {
            flushSync(() => setLog((p) => [...p, "❌ " + desc]));
            lastErrorRef.current = desc;
            setHasError(true);
          }
          if (firstResponseTimerRef.current) {
            clearTimeout(firstResponseTimerRef.current);
            firstResponseTimerRef.current = null;
          }
          bufferRef.current = buf.slice(5);
      }
    }
  }

  /* ---------------- VERİ AYRIŞTIRMA ---------------- */
  function handleResponse(value: Uint8Array) {

    if (wasDisconnectedRef.current) {
      setLog((p) => [
        ...p.slice(-99),
        "🔄 Bağlantı yeniden sağlandı."
      ]);

      wasDisconnectedRef.current = false;
      lastAutoReadErrorRef.current = null; // Hata flag reset
    }
    if (firstResponseTimerRef.current) {
      clearTimeout(firstResponseTimerRef.current);
      firstResponseTimerRef.current = null;
    }

    if (value[1] !== func) return;
    const byteCount = value[2];
    const dataBytes = value.slice(3, 3 + byteCount);
    const regs: RegisterRow[] = [];

    const typeByteSize =
      dataTypeRef.current === "double" || dataTypeRef.current === "doubleInverse"
        ? 8
        : dataTypeRef.current === "float" ||
          dataTypeRef.current === "floatInverse" ||
          dataTypeRef.current === "long" ||
          dataTypeRef.current === "longInverse"
        ? 4
        : 2;

    const usableBytes = Math.floor(dataBytes.length / typeByteSize) * typeByteSize;
    const step = typeByteSize / 2;

    for (let i = 0; i < usableBytes; ) {
      let val: number | string;

      if (dataTypeRef.current === "float" && i + 3 < usableBytes) {
        const buf = new Uint8Array([
          dataBytes[i],
          dataBytes[i + 1],
          dataBytes[i + 2],
          dataBytes[i + 3],
        ]);
        val = new DataView(buf.buffer).getFloat32(0, false);
        i += 4;
      } else if (dataTypeRef.current === "floatInverse" && i + 3 < usableBytes) {
        const buf = new Uint8Array([
          dataBytes[i + 2],
          dataBytes[i + 3],
          dataBytes[i],
          dataBytes[i + 1],
        ]);
        val = new DataView(buf.buffer).getFloat32(0, false);
        i += 4;
      } else if (dataTypeRef.current === "double" && i + 7 < usableBytes) {
        const buf = dataBytes.slice(i, i + 8);
        val = new DataView(buf.buffer).getFloat64(0, false);
        i += 8;
      } else if (dataTypeRef.current === "doubleInverse" && i + 7 < usableBytes) {
        const buf = new Uint8Array([
          dataBytes[i + 6],
          dataBytes[i + 7],
          dataBytes[i + 4],
          dataBytes[i + 5],
          dataBytes[i + 2],
          dataBytes[i + 3],
          dataBytes[i],
          dataBytes[i + 1],
        ]);
        val = new DataView(buf.buffer).getFloat64(0, false);
        i += 8;
      } else if (dataTypeRef.current === "long" && i + 3 < usableBytes) {
        const buf = dataBytes.slice(i, i + 4);
        val = new DataView(buf.buffer).getInt32(0, false);
        i += 4;
      } else if (dataTypeRef.current === "longInverse" && i + 3 < usableBytes) {
        const buf = new Uint8Array([
          dataBytes[i + 2],
          dataBytes[i + 3],
          dataBytes[i],
          dataBytes[i + 1],
        ]);
        val = new DataView(buf.buffer).getInt32(0, false);
        i += 4;
      } else {
        const hi = dataBytes[i];
        const lo = dataBytes[i + 1];
        val = (hi << 8) | lo;
        if (dataTypeRef.current === "signed" && val > 0x7fff)
          val = val - 0x10000;
        else if (dataTypeRef.current === "hex")
          val = "0x" + val.toString(16).toUpperCase().padStart(4, "0");
        i += 2;
      }

      regs.push({
        index: addressRef.current + regs.length * step,
        decimal: val,
      });
    }

    setRegisters(regs);

    setHasError(false);

    if (pollingRef.current) {
      setHistory((prev) => {
        const updated = [...prev];
        regs.forEach((reg, idx) => {
          const old = updated[idx] || [];
          updated[idx] = [...old.slice(-10), reg.decimal];
        });
        return updated;
      });
    }
  }

  /* ---------------- FRAME GÖNDERME ---------------- */
  async function sendFrame() {
    if (!port) throw new Error("Port bağlı değil");

    bufferRef.current = new Uint8Array();
    const frame = [
      slaveId,
      func,
      (address >> 8) & 0xff,
      address & 0xff,
      (quantity >> 8) & 0xff,
      quantity & 0xff,
    ];
    const [crcLo, crcHi] = calcCRC(frame);
    const request = new Uint8Array([...frame, crcLo, crcHi]);

    let writer: WritableStreamDefaultWriter | null = null;

    try {
      writer = port.writable?.getWriter();
      if (!writer) throw new Error("Cannot create writer");

      await writer.write(request);

    } catch (err: any) {
       const message = err?.message || "Unknown write error";

      if (lastAutoReadErrorRef.current !== message) {
        setLog((p) => [
          ...p.slice(-99),
          "⛔ Bağlantı koptu: Cihazdan veri alınamadı. Kabloyu kontrol edin."
        ]);
        lastAutoReadErrorRef.current = message;
      }
      wasDisconnectedRef.current = true; 

      flushSync(() => {
        setPolling(false);
        pollingRef.current = false;
        setStep("idle");
        setHasError(true);
      });

      try { await port?.close(); } catch {}

    } finally {
      try { writer?.releaseLock(); } catch {}
    }
  }

  /* ---------------- ONAYLA / KAYIT BAŞLAT / DURDUR ---------------- */

  function onaylaAyarlar() {
    try {
      setRegisters([]);
      setHistory([]);
      seqRef.current = 0;

      const typeLabelMap: Record<string, string> = {
        signed: "SIGNED",
        unsigned: "UNSIGNED",
        hex: "HEX",
        float: "FLOAT INVERSE (32-bit)",
        floatInverse: "FLOAT (32-bit)",
        double: "DOUBLE INVERSE (64-bit)",
        doubleInverse: "DOUBLE (64-bit)",
        long: "LONG INVERSE (32-bit INT)",
        longInverse: "LONG (32-bit INT)",
      };

      if (scanRate < 200) {
        setLog((p) => [
          ...p.slice(-99),
          "⚠️ Çok düşük scan rate kullanıyorsunuz (<200 ms). Gerçek Modbus cihazlarında timeout ve kopma sorunlarına yol açabilir."
        ]);
      }

      setLog((p) => [
        ...p,
        `⚙️ Okuma ayarları (ID:${slaveId}, F:${func}, A:${address}, Q:${quantity}, ${
          typeLabelMap[dataType] || dataType.toUpperCase()
        }, Scan:${scanRate}ms)`,
      ]);

      lastErrorRef.current = null;

      sendFrame().catch((err) =>
        setLog((p) => [...p, "❌ İlk okuma hatası: " + err.message])
      );

      if (firstResponseTimerRef.current) clearTimeout(firstResponseTimerRef.current);

      firstResponseTimerRef.current = setTimeout(() => {
        if (!registers.length) {
          setHasError(true);
          setLog(p => [...p, "⛔ Timeout: Cihazdan cevap alınamadı. Bağlantı ayarlarını kontrol edin."]);
        }
      }, 2000); // 2 saniye

      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = setInterval(() => {
        sendFrame().catch((err) =>
          setLog((p) => [...p, "⚠️ Otomatik okuma hatası: " + err.message])
        );
      }, scanRate);

      setStep("confirmed");
    } catch (err: any) {
      setLog((p) => [...p, "❌ Onaylama hatası: " + err.message]);
    }
  }

  function startPolling() {
    if (!port) return;
    if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
    if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);

    setPolling(true);
    setPollCount(0);
    seqRef.current = 0;
    setHistory([]);
    setLog((p) => [...p, "▶️ Kayıt başladı"]);

    pollingIntervalRef.current = window.setInterval(async () => {
      try {
        seqRef.current += 1;
        setPollCount(seqRef.current);
        await sendFrame();
      } catch (err: any) {
        setLog((p) => [...p.slice(-99), "⚠️ Sorgu hatası: " + err.message]);
      }
    }, scanRate);

    setStep("recording");
  }

  function stopPolling() {
    if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);

    setPolling(false);
pollingRef.current = false; // 🧩 anında kapat
    setLog((p) => [...p.slice(-99), "⏹ Kayıt durduruldu"]);

    setStep("confirmed");
    seqRef.current = 0;

    if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
    scanIntervalRef.current = setInterval(() => {
      sendFrame().catch((err) =>
        setLog((p) => [...p.slice(-99), "⚠️ Otomatik okuma hatası (yeniden): " + err.message])
      );
    }, scanRate);
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="p-4 space-y-6 border rounded bg-gray-50 mt-6">
      <h2 className="text-xl font-bold">🔌 Modbus RTU Terminal</h2>

      {!port ? (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Connection Settings</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label>Baud Rate</label>
              <select
                value={baudRate}
                onChange={(e) => setBaudRate(Number(e.target.value))}
                className="border rounded px-2 py-1 w-full"
              >
                {[9600, 19200, 38400, 57600, 115200].map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Data Bits</label>
              <select
                value={dataBits}
                onChange={(e) => setDataBits(Number(e.target.value))}
                className="border rounded px-2 py-1 w-full"
              >
                {[7, 8].map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Parity</label>
              <select
                value={parity}
                onChange={(e) => setParity(e.target.value as any)}
                className="border rounded px-2 py-1 w-full"
              >
                <option value="none">None</option>
  		<option value="even">Even</option>
                <option value="odd">Odd</option>
              </select>
            </div>
            <div>
              <label>Stop Bits</label>
              <select
                value={stopBits}
                onChange={(e) => setStopBits(Number(e.target.value))}
                className="border rounded px-2 py-1 w-full"
              >
                {[1, 2].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={connectPort}
            className="px-3 py-2 rounded bg-brand-navy text-white hover:bg-brand-navy/90"
          >
            Porta Bağlan
          </button>
        </div>
      ) : (
        <div className="space-y-4 relative">
          {/* Port açıkken kapatma butonu */}
          <button
            onClick={closePort}
            title="Portu kapat"
            className="absolute top-0 right-0 m-2 px-2 py-1 text-sm text-gray-500 hover:text-red-600 border rounded hover:bg-red-50"
          >
            ✕
          </button>

          <h3 className="text-lg font-semibold">Read/Write Definition</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            <div>
              <label>Slave ID</label>
              <input
                type="number"
                value={slaveId}
                onChange={(e) => setSlaveId(Number(e.target.value))}
                className="border p-1 rounded w-full"
              />
            </div>

            <div>
              <label>Function</label>
              <select
                value={func}
                onChange={(e) => setFunc(Number(e.target.value))}
                className="border p-1 rounded w-full"
              >
                <option value={1}>01 - Read Coils</option>
                <option value={2}>02 - Read Discrete Inputs</option>
                <option value={3}>03 - Read Holding</option>
                <option value={4}>04 - Read Input</option>
              </select>
            </div>

            <div>
              <label>Address</label>
              <input
                type="number"
                value={address}
                onChange={(e) => setAddress(Number(e.target.value))}
                className="border p-1 rounded w-full"
              />
            </div>

            <div>
              <label>Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border p-1 rounded w-full"
              />
            </div>

            <div>
              <label>Data Type</label>
              <select
                value={dataType}
                onChange={(e) => setDataType(e.target.value as any)}
                className="border p-1 rounded w-full"
              >
                <option value="signed">Signed (16-bit)</option>
                <option value="unsigned">Unsigned (16-bit)</option>
                <option value="hex">Hex (16-bit)</option>
                <option value="floatInverse">Float (32-bit)</option>
                <option value="float">Float Inverse (32-bit)</option>
                <option value="doubleInverse">Double (64-bit)</option>
                <option value="double">Double Inverse (64-bit)</option>
                <option value="longInverse">Long (32-bit Int)</option>
                <option value="long">Long Inverse (32-bit Int)</option>
              </select>
            </div>

            <div>
              <label>Scan Rate (ms)</label>
              <input
                type="number"
                value={scanRate}
                onChange={(e) => setScanRate(Number(e.target.value))}
                className="border p-1 rounded w-full"
                min={200}
              />
            </div>
          </div>

          {/* Kontrol Butonları */}
          <div className="space-x-2">
            <button
              onClick={onaylaAyarlar}
  	      disabled={polling}
  	      title={polling ? "Kayıt devam ederken ayar değiştirilemez." : ""} // 🟢 tooltip eklendi
  	      className={`px-3 py-2 rounded text-white transition ${
                 polling
                   ? "bg-gray-400 cursor-not-allowed"
                   : "bg-green-600 hover:bg-green-700"
               }`}
            >
              Onayla
            </button>

            {step === "confirmed" && !hasError && (
              <button
                onClick={startPolling}
                disabled={polling}
                className={`px-3 py-2 rounded text-white ${
                  polling
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700"
                }`}
              >
                {polling ? "Kayıt Devam Ediyor..." : "Kayıt Başlat"}
              </button>
            )}

            {step === "recording" && (
              <button
                onClick={stopPolling}
                className="px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Durdur
              </button>
            )}
          </div>

          {/* Log Alanı */}
          <div className="relative">
            <button
              onClick={() => setLog([])}
              className="absolute top-2 right-5 px-2 py-1 text-xs bg-white text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
            >
              Temizle
            </button>
            <div className="bg-black text-green-400 font-mono text-sm p-2 rounded h-40 overflow-y-auto">
              {log.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Register Tablosu */}
      {registers.length > 0 && (
	<div className="overflow-x-auto">
         <table className="w-full border-collapse border text-sm">
          <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">#</th>
            <th className="border px-2 py-1">Register</th>
            <th className="border px-2 py-1">
                {(() => {
                  switch (dataType) {
                    case "signed":
                      return "Decimal (Int16)";
                    case "unsigned":
                      return "Unsigned (UInt16)";
                    case "hex":
                      return "Hex (16-bit)";
                    case "float":
                      return "Float32 (Inv)";
                    case "floatInverse":
                      return "Float32";
                    case "double":
                      return "Double64 (Inv)";
                    case "doubleInverse":
                      return "Double64";
                    case "long":
                      return "Int32 (Inv)";
                    case "longInverse":
                      return "Int32";
                    default:
                      return "Value";
                  }
                })()}
              </th>
              {Array.from({ length: 11 }).map((_, i) => (
                <th key={i} className="border px-2 py-1 whitespace-nowrap">
                  {i === 0 ? "Başlangıç" : `Sorgu ${i}`}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {registers.map((r, idx) => (
              <tr key={idx}>
                <td className="border px-2 py-1 text-center">
                  <input
                    type="radio"
                    name="selectedRegister"
                    checked={selectedIndex === idx}
                    onChange={() => setSelectedIndex(idx)}
                  />
                </td>
                <td className="border px-2 py-1 text-center">{r.index}</td>
                <td className="border px-2 py-1 text-center">
                  {typeof r.decimal === "number"
                    ? r.decimal.toFixed(2)
                    : r.decimal}
                </td>
                {Array.from({ length: 11 }).map((_, col) => (
                  <td key={col} className="border px-1 py-0.5 text-center text-[12px] whitespace-nowrap">
                    {typeof history[idx]?.[col] === "number"
                      ? Number(history[idx]?.[col]).toFixed(2)
                      : history[idx]?.[col] ?? "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
         </table> 
        </div>
      )}   

	{/* Trend Alanı */}
       <div className="mt-6 space-y-6">
 	 {/* Eğer hiçbir satır seçilmediyse: tüm register'ların trendini göster */}
 	 {selectedIndex === null ? (
  	  <div>
  	   <h3 className="text-lg font-semibold text-brand-navy mb-2">
  	      📊 Tüm Register Trendleri
   	   </h3>
   	   <div className="grid md:grid-cols-2 gap-6">
  	      {registers.map((r, idx) =>
  	        history[idx] ? (
  	          <TrendChart
           	   key={idx}
        	   label={r.index}
        	   data={history[idx]}
         	   polling={polling}
         	   scanRate={scanRate}
        	  />
      	      ) : null
   	     )}
     	   </div>
      </div>
  ) : (
    /* Eğer bir satır seçildiyse: sadece o grafiği göster */
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-brand-navy">
          Register {registers[selectedIndex].index} Trend
        </h3>
        <button
          onClick={() => setSelectedIndex(null)}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Hepsini Göster
        </button>
      </div>

      <TrendChart
       label={registers[selectedIndex].index}
       data={history[selectedIndex]}
       polling={polling}
       scanRate={scanRate} // 🔹 buradan doğru aktarılıyor
      />
    </div>
  )}
</div>

    </div>
  );
}


