"use client";
import { useState, useEffect, useRef } from "react";
import TrendChart from "./TrendChart";

interface RegisterRow {
  index: number;
  decimal: number | string;
}

export default function ModbusTCP() {
  const [connected, setConnected] = useState(false);
  const [ipAddress, setIpAddress] = useState("192.168.1.100");
  const [port, setPort] = useState(502);
  const [log, setLog] = useState<string[]>([]);
  const [registers, setRegisters] = useState<RegisterRow[]>([]);
  const [history, setHistory] = useState<(number | string)[][]>([]); // 🔹 geçmiş sorgular
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

  const [polling, setPolling] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<null | "success" | "error">(null);
  const [connectionMessage, setConnectionMessage] = useState("");
  const [step, setStep] = useState<"idle" | "confirmed" | "recording">("idle");

  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastErrorRef = useRef<string | null>(null);
  const pollingRef = useRef(false);
  useEffect(() => { pollingRef.current = polling; }, [polling]);
  const wasDisconnectedRef = useRef(false);


  /* ---------------- TCP BAĞLANTI ---------------- */
  async function connectTCP() {
    setConnectionStatus(null);
    setConnectionMessage("");

    try {
      const res = await fetch("/api/modbus/ping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ip: ipAddress,
          port: port,
        }),
      });

      const json = await res.json();

      if (!json.success) {
        setLog((p) => [...p, `❌ Bağlantı kurulamadı: ${json.error}`]);
        setConnectionStatus("error");
        setConnectionMessage("Bağlantı yok. Cihaz yanıt vermedi.");
        return;
      }

      setConnected(true);
      setLog((p) => [...p, `✅ Modbus TCP bağlantısı kuruldu (${ipAddress}:${port})`]);

      setConnectionStatus("success");
      setConnectionMessage("Bağlantı başarılı!");

    } catch (err: any) {
      setLog((p) => [...p, "❌ Bağlantı hatası: " + String(err.message)]);
      setConnectionStatus("error");
      setConnectionMessage("Bağlantı hatası oluştu.");
    }
  }

  /* ---------------- VERİ AYRIŞTIRMA ---------------- */
function parseRegisters(rawBytes: number[], address: number) {
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

  const usableBytes = Math.floor(rawBytes.length / typeByteSize) * typeByteSize;
  const step = typeByteSize / 2;

  for (let i = 0; i < usableBytes; ) {
    let val: number | string;

    if (dataTypeRef.current === "float" && i + 3 < usableBytes) {
      const buf = new Uint8Array([
        rawBytes[i],
        rawBytes[i + 1],
        rawBytes[i + 2],
        rawBytes[i + 3],
      ]);
      val = new DataView(buf.buffer).getFloat32(0, false);
      i += 4;
    } else if (dataTypeRef.current === "floatInverse" && i + 3 < usableBytes) {
      const buf = new Uint8Array([
        rawBytes[i + 2],
        rawBytes[i + 3],
        rawBytes[i],
        rawBytes[i + 1],
      ]);
      val = new DataView(buf.buffer).getFloat32(0, false);
      i += 4;
    } else if (dataTypeRef.current === "double" && i + 7 < usableBytes) {
    const buf = new Uint8Array(rawBytes.slice(i, i + 8));
    val = new DataView(buf.buffer).getFloat64(0, false);
      i += 8;
    } else if (dataTypeRef.current === "doubleInverse" && i + 7 < usableBytes) {
      const buf = new Uint8Array([
        rawBytes[i + 6],
        rawBytes[i + 7],
        rawBytes[i + 4],
        rawBytes[i + 5],
        rawBytes[i + 2],
        rawBytes[i + 3],
        rawBytes[i],
        rawBytes[i + 1],
      ]);
      val = new DataView(buf.buffer).getFloat64(0, false);
      i += 8;
    } else if (dataTypeRef.current === "long" && i + 3 < usableBytes) {
    const buf = new Uint8Array(rawBytes.slice(i, i + 4));
    val = new DataView(buf.buffer).getInt32(0, false);
      i += 4;
    } else if (dataTypeRef.current === "longInverse" && i + 3 < usableBytes) {
      const buf = new Uint8Array([
        rawBytes[i + 2],
        rawBytes[i + 3],
        rawBytes[i],
        rawBytes[i + 1],
      ]);
      val = new DataView(buf.buffer).getInt32(0, false);
      i += 4;
    } else {
      const hi = rawBytes[i];
      const lo = rawBytes[i + 1];
      val = (hi << 8) | lo;
      if (dataTypeRef.current === "signed" && val > 0x7fff) val -= 0x10000;
      else if (dataTypeRef.current === "hex")
        val = "0x" + val.toString(16).toUpperCase().padStart(4, "0");
      i += 2;
    }

    regs.push({
      index: address + regs.length * step,
      decimal: val,
    });
  }

  return regs;
}

  const typeSize: any = {
    signed: 2,
    unsigned: 2,
    hex: 2,

    float: 4,
    floatInverse: 4,
  
    double: 8,
    doubleInverse: 8,

    long: 4,
    longInverse: 4,
  };

  function disconnectTCP() {
    setConnected(false);
    setPolling(false);
    setRegisters([]);
    setHistory([]);
    setStep("idle");
    if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
    setLog((p) => [...p, "🔴 Bağlantı sonlandırıldı"]);
  }

  /* ---------------- OKUMA GÖNDERİMİ ---------------- */

  async function sendReadRequest() {
    try {
      const res = await fetch("/api/modbus/read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ip: ipAddress,
          port,
          slaveId,
          func,
          address,
          quantity,
        }),
      });

      const json = await res.json();

      if (json.success && Array.isArray(json.raw)) {
	if (wasDisconnectedRef.current) {
	  setLog((p) => [...p, "🔄 Bağlantı yeniden sağlandı."]);
	  wasDisconnectedRef.current = false;
	}
        const regs = parseRegisters(json.raw, address);
        setRegisters(regs);
        lastErrorRef.current = null;

        if (pollingRef.current) {
          setHistory(prev => {
            const updated = [...prev];
            regs.forEach((reg, idx) => {
              const old = updated[idx] || [];
              updated[idx] = [...old.slice(-10), reg.decimal];
            });
            return updated;
          });
        }
      } 
      else if (json.success === false) {
  	if (!wasDisconnectedRef.current) {
   	    setLog((p) => [...p, "⛔ Bağlantı koptu: Cihaz yanıt vermiyor."]);
  	    wasDisconnectedRef.current = true;
  	}
  	setPolling(false);
  	pollingRef.current = false;
  	setStep("confirmed");
      }
    } catch (err: any) {
       if (!wasDisconnectedRef.current) {
	 setLog((p) => [...p, "⛔ Bağlantı koptu: Cihaz yanıt vermiyor."]);
	 wasDisconnectedRef.current = true;
       }

       setPolling(false);
       pollingRef.current = false;
       setStep("confirmed");
    }
  }

  /* ---------------- ONAYLA / KAYIT BAŞLAT / DURDUR ---------------- */

  async function onaylaAyarlar() {
    try {
      setRegisters([]);
      setHistory([]);

      if (scanRate < 200) {
        setLog((p) => [
          ...p.slice(-99),
          "⚠️ Çok düşük scan rate kullanıyorsunuz (<200 ms). Gerçek Modbus cihazlarında timeout ve kopma sorunlarına yol açabilir."
        ]);
      }

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

      setLog((p) => [
        ...p,
        `⚙️ Okuma ayarları (ID:${slaveId}, F:${func}, A:${address}, Q:${quantity}, ${
          typeLabelMap[dataType] || dataType.toUpperCase()
        }, Scan:${scanRate}ms)`,
      ]);

     await sendReadRequest();

      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);

      scanIntervalRef.current = setInterval(() => {
        sendReadRequest().catch((err) =>
          setLog((p) => [...p, "⚠️ Otomatik okuma hatası: " + err.message])
        );
      }, scanRate);

      setStep("confirmed");
    } catch (err: any) {
      setLog((p) => [...p, "❌ Onaylama hatası: " + err.message]);
    }
  }

  function startPolling() {
    setPolling(true);
    setLog((p) => [...p, "▶️ Kayıt başladı"]);
    if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
    scanIntervalRef.current = setInterval(sendReadRequest, scanRate);
    setStep("recording");
  }

  function stopPolling() {
    if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);

    setPolling(false);
    pollingRef.current = false; 
    setLog((p) => [...p.slice(-99), "⏹ Kayıt durduruldu"]);
    setStep("confirmed");
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="p-4 space-y-6 border rounded bg-gray-50 mt-6">
      <h2 className="text-xl font-bold">🌐 Modbus TCP/IP Terminal</h2>

      {!connected ? (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Connection Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>IP Address</label>
              <input
                type="text"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                className="border rounded px-2 py-1 w-full"
              />
            </div>
            <div>
              <label>Port</label>
              <input
                type="number"
                value={port}
                onChange={(e) => setPort(Number(e.target.value))}
                className="border rounded px-2 py-1 w-full"
              />
            </div>
          </div>
          <button
            onClick={connectTCP}
            className="px-3 py-2 rounded bg-brand-navy text-white hover:bg-brand-navy/90"
          >
            Cihaza Bağlan
          </button>

	  {/* 🆕 BAĞLANTI DURUM MESAJI BURADA GÖRÜNÜR */}
	  {connectionStatus === "error" && (
 	   <div className="text-red-600 text-sm font-medium mt-1">
 	     ❌ {connectionMessage}
 	   </div>
	  )}

	  {connectionStatus === "success" && (
 	   <div className="text-green-600 text-sm font-medium mt-1">
 	     ✅ {connectionMessage}
 	   </div>
	  )}
        </div>
      ) : (
        <div className="space-y-4 relative">
          <button
            onClick={disconnectTCP}
            title="Bağlantıyı kes"
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
                min={1}
                max={247}
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
                <option value={3}>03 - Read Holding Registers</option>
                <option value={4}>04 - Read Input Registers</option>
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
              <option value="unsigned">Signed (16-bit)</option>
              <option value="signed">Unsigned (16-bit)</option>
              <option value="hex">Hex (16-bit)</option>

              <option value="float">Float Inverse (32-bit)</option>
              <option value="floatInverse">Float (32-bit)</option>

              <option value="double">Double Inverse (64-bit)</option>
              <option value="doubleInverse">Double (64-bit)</option>

              <option value="long">Long Inverse (32-bit Int)</option>
              <option value="longInverse">Long (32-bit Int)</option>
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

          <div className="space-x-2">
            <button
              onClick={onaylaAyarlar}
              disabled={polling}
              className={`px-3 py-2 rounded text-white ${
                polling ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              Onayla
            </button>
            {!polling ? (
              <button
                onClick={startPolling}
                className="px-3 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
              >
                Kayıt Başlat
              </button>
            ) : (
              <button
                onClick={stopPolling}
                className="px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Durdur
              </button>
            )}
          </div>

          {/* LOG ALANI */}
          <div className="relative">
            <button
              onClick={() => setLog([])}
              className="absolute top-2 right-5 px-2 py-1 text-xs bg-white text-gray-600 border rounded hover:bg-gray-100"
            >
              Temizle
            </button>
            <div className="bg-black text-green-400 font-mono text-sm p-2 rounded h-40 overflow-y-auto">
              {log.map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          </div>

          {/* Register Tablosu */}
          {registers.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border text-sm mt-4">
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
                      <td className="border text-center">
                        <input
                          type="radio"
                          name="selectedRegister"
                          checked={selectedIndex === idx}
                          onChange={() => setSelectedIndex(idx)}
                        />
                      </td>
                      <td className="border text-center">{r.index}</td>
                      <td className="border text-center">
                        {typeof r.decimal === "number"
                          ? r.decimal.toFixed(2)
                          : r.decimal}
                      </td>
                      {Array.from({ length: 11 }).map((_, col) => (
                        <td key={col} className="border text-center text-[12px]">
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

          {/* TREND */}
          <div className="mt-6 space-y-6">
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
              <div>
                <div className="flex justify-between mb-2">
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
                  scanRate={scanRate}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
