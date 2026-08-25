"use client";
import { useState, useEffect, useRef } from "react";
import TrendChart from "./TrendChart";
import type { Locale } from "@/lib/i18n";

interface RegisterRow {
  index: number;
  decimal: number | string;
}

type DataType =
  | "signed"
  | "unsigned"
  | "hex"
  | "float"
  | "floatInverse"
  | "double"
  | "doubleInverse"
  | "long"
  | "longInverse";

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

type ReadRequestResult =
  | "success"
  | "modbus_error"
  | "connection_error"
  | "stale"
  | "skipped";

export default function ModbusTCP({ locale = "tr" }: { locale?: Locale }) {
  const en = locale === "en";
  const tx = (tr: string, english: string) => (en ? english : tr);
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
  const [dataType, setDataType] = useState<DataType>("signed");

  const logContainerRef = useRef<HTMLDivElement | null>(null);
  const autoScrollLogRef = useRef(true);
  const dataTypeRef = useRef(dataType);
  useEffect(() => {
    dataTypeRef.current = dataType;
  }, [dataType]);

  useEffect(() => {
    const el = logContainerRef.current;

    if (!el || !autoScrollLogRef.current) return;

    el.scrollTop = el.scrollHeight;
  }, [log]);

  function handleLogScroll() {
    const el = logContainerRef.current;
    if (!el) return;

    const distanceFromBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight;

    autoScrollLogRef.current = distanceFromBottom < 30;
  }

  const [polling, setPolling] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<null | "success" | "error">(null);
  const [connectionMessage, setConnectionMessage] = useState("");
  const [step, setStep] = useState<"idle" | "confirmed" | "recording">("idle");
  const [hasError, setHasError] = useState(false);
  const isBitFunction = func === 1 || func === 2;
  const settingsLocked = step !== "idle";
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const requestInFlightRef = useRef(false);
  const requestAbortRef = useRef<AbortController | null>(null);
  const requestVersionRef = useRef(0);
  const lastErrorRef = useRef<string | null>(null);
  const pollingRef = useRef(false);
  useEffect(() => { pollingRef.current = polling; }, [polling]);
  const wasDisconnectedRef = useRef(false);

  useEffect(() => {
    return () => {
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
        scanIntervalRef.current = null;
      }

      requestAbortRef.current?.abort();
      requestAbortRef.current = null;
      requestVersionRef.current += 1;
      pollingRef.current = false;
    };
  }, []);


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
        setLog((p) => [...p, `${tx("❌ Bağlantı kurulamadı: ", "❌ Connection failed: ")}${en ? "Device did not respond." : json.error}`]);
        setConnectionStatus("error");
        setConnectionMessage(tx("Bağlantı yok. Cihaz yanıt vermedi.", "No connection. The device did not respond."));
        return;
      }

      setConnected(true);
      setLog((p) => [...p, `✅ ${tx("Modbus TCP bağlantısı kuruldu", "Modbus TCP connection established")} (${ipAddress}:${port})`]);

      setConnectionStatus("success");
      setConnectionMessage(tx("Bağlantı başarılı!", "Connection successful!"));

    } catch (err: unknown) {
      setLog((p) => [...p, tx("❌ Bağlantı hatası: ", "❌ Connection error: ") + getErrorMessage(err)]);
      setConnectionStatus("error");
      setConnectionMessage(tx("Bağlantı hatası oluştu.", "A connection error occurred."));
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

function parseBits(
  bits: Array<number | boolean>,
  address: number,
  quantity: number
): RegisterRow[] {
  return bits.slice(0, quantity).map((bit, index) => ({
    index: address + index,
    decimal: bit === true || Number(bit) !== 0 ? 1 : 0,
  }));
}

  function disconnectTCP() {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }

    requestAbortRef.current?.abort();
    requestAbortRef.current = null;
    requestVersionRef.current += 1;

    setConnected(false);
    setPolling(false);
    pollingRef.current = false;

    setConnectionStatus(null);
    setConnectionMessage("");

    setHasError(false);
    setRegisters([]);
    setHistory([]);
    setSelectedIndex(null);
    setStep("idle");

    lastErrorRef.current = null;
    wasDisconnectedRef.current = false;

    setLog((p) => [...p.slice(-99), tx("🔴 Bağlantı sonlandırıldı", "🔴 Connection closed")]);
  }

  /* ---------------- OKUMA GÖNDERİMİ ---------------- */

  async function sendReadRequest(
    version = requestVersionRef.current
  ): Promise<ReadRequestResult> {

    // Önceki sorgu henüz bitmediyse yeni sorgu gönderme
    if (requestInFlightRef.current) {
      return "skipped";
    }

    requestInFlightRef.current = true;
    const controller = new AbortController();
    requestAbortRef.current = controller;

    try {
      const res = await fetch("/api/modbus/read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
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

      // Bu cevap eski ayarlara aitse artık işleme
      if (version !== requestVersionRef.current) {
        return "stale";
      }

      /* ---------- BAŞARILI MODBUS CEVABI ---------- */
      if (json.success) {

        if (wasDisconnectedRef.current) {
          setLog((p) => [
            ...p.slice(-99),
            tx("🔄 Bağlantı yeniden sağlandı.", "🔄 Connection restored.")
          ]);

          wasDisconnectedRef.current = false;
        }

        let regs: RegisterRow[] = [];

        if (func === 1 || func === 2) {
          if (!Array.isArray(json.bits)) {
            throw new Error(tx("Geçersiz bit cevabı alındı.", "Invalid bit response received."));
          }

          regs = parseBits(json.bits, address, quantity);
        } else {
          if (!Array.isArray(json.raw)) {
            throw new Error(tx("Geçersiz register cevabı alındı.", "Invalid register response received."));
          }

          regs = parseRegisters(json.raw, address);
        }

        setRegisters(regs);
        setHasError(false);

        lastErrorRef.current = null;

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

        return "success";
      }

      /* ---------- MODBUS EXCEPTION ---------- */
      const errorCode = Number(json.code ?? 0);

      if (errorCode > 0) {
        const errorMap: Record<number, string> = {
          1: "Illegal Function",
          2: "Illegal Data Address",
          3: "Illegal Data Value",
          4: "Slave Device Failure",
        };

        const desc = en
          ? `Modbus Exception (Code ${errorCode}) - ${errorMap[errorCode] || "Unknown Exception"}`
          : json.error ||
            `Modbus Exception (Code ${errorCode}) - ${errorMap[errorCode] || "Unknown Exception"}`;

        if (lastErrorRef.current !== desc) {
          setLog((p) => [
            ...p.slice(-99),
            `❌ ${desc}`
          ]);

          lastErrorRef.current = desc;
        }

        // Hatalı Function/Address gibi bir Modbus Exception oluştuğunda
        // aynı hatalı sorguyu otomatik olarak tekrar tekrar göndermeyelim.
        setHasError(true);
        setPolling(false);
        pollingRef.current = false;
        setStep("idle");

        if (scanIntervalRef.current) {
          clearInterval(scanIntervalRef.current);
          scanIntervalRef.current = null;
        }

        return "modbus_error";
      }

      /* ---------- GERÇEK TCP / TIMEOUT HATASI ---------- */

      if (!wasDisconnectedRef.current) {
        setLog((p) => [
          ...p.slice(-99),
          tx("⛔ Bağlantı koptu: Cihazdan veri alınamadı. Ağ bağlantısını ve cihazı kontrol edin.", "⛔ Connection lost: No data received from the device. Check the network connection and device.")
        ]);

        wasDisconnectedRef.current = true;
      }

      setHasError(true);

      setPolling(false);
      pollingRef.current = false;
      setStep("idle");

      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
        scanIntervalRef.current = null;
      }

      return "connection_error";

    } catch (error: unknown) {

      if (
        controller.signal.aborted ||
        (error instanceof DOMException && error.name === "AbortError")
      ) {
        return "stale";
      }

      if (version !== requestVersionRef.current) {
        return "stale";
      }

      if (!wasDisconnectedRef.current) {
        setLog((p) => [
          ...p.slice(-99),
          tx("⛔ Bağlantı koptu: Cihazdan veri alınamadı. Ağ bağlantısını ve cihazı kontrol edin.", "⛔ Connection lost: No data received from the device. Check the network connection and device.")
        ]);

        wasDisconnectedRef.current = true;
      }

      setHasError(true);

      setPolling(false);
      pollingRef.current = false;
      setStep("idle");

      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
        scanIntervalRef.current = null;
      }

      return "connection_error";

    } finally {
      if (requestAbortRef.current === controller) {
        requestAbortRef.current = null;
      }
      requestInFlightRef.current = false;
    }
  }

  /* ---------------- OKUMAYI BAŞLAT / KAYIT / DURDUR ---------------- */

  function validateReadSettings(): string | null {
    if (!Number.isInteger(slaveId) || slaveId < 1 || slaveId > 247) {
      return tx(
        "Slave ID 1-247 arasında olmalıdır.",
        "Slave ID must be between 1 and 247."
      );
    }

    if (!Number.isInteger(address) || address < 0 || address > 65535) {
      return tx(
        "Adres 0-65535 arasında tam sayı olmalıdır.",
        "Address must be an integer between 0 and 65535."
      );
    }

    const maxQuantity = isBitFunction ? 2000 : 125;
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > maxQuantity) {
      return tx(
        `Miktar bu fonksiyon için 1-${maxQuantity} arasında olmalıdır.`,
        `Quantity must be between 1 and ${maxQuantity} for this function.`
      );
    }

    if (address + quantity - 1 > 65535) {
      return tx(
        "Adres + miktar Modbus adres alanını aşıyor.",
        "Address + quantity exceeds the Modbus address range."
      );
    }

    return null;
  }

  async function startReading() {
    try {
      const validationError = validateReadSettings();
      if (validationError) {
        setLog((p) => [...p.slice(-99), `❌ ${validationError}`]);
        setHasError(true);
        setStep("idle");
        return;
      }

      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
        scanIntervalRef.current = null;
      }

      requestVersionRef.current += 1;
      const version = requestVersionRef.current;

      setRegisters([]);
      setHistory([]);
      setSelectedIndex(null);
      setHasError(false);
      setPolling(false);
      pollingRef.current = false;

      lastErrorRef.current = null;

      const typeLabelMap: Record<DataType, string> = {
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

      const safeScanRate = Math.max(scanRate, 500);

      if (scanRate < 500) {
        setScanRate(500);
        setLog((p) => [
          ...p.slice(-99),
          tx("⚠️ Güvenlik ve sunucu yükü nedeniyle minimum scan rate 500 ms olarak uygulanır.", "⚠️ The minimum scan rate is limited to 500 ms for security and server load protection.")
        ]);
      }

      setLog((p) => [
        ...p.slice(-99),
        `▶️ Canlı okuma başlatılıyor (ID:${slaveId}, F:${func}, A:${address}, Q:${quantity}, ${
          isBitFunction
            ? "BIT (0/1)"
            : typeLabelMap[dataType] || dataType.toUpperCase()
        }, Scan:${safeScanRate}ms)`,
      ]);

      const result = await sendReadRequest(version);

      if (result !== "success") {
        setStep("idle");
        return;
      }

      setStep("confirmed");

      scanIntervalRef.current = setInterval(() => {
        void sendReadRequest(version);
      }, safeScanRate);

    } catch (err: unknown) {
      setStep("idle");
      setLog((p) => [
        ...p.slice(-99),
        tx("❌ Okuma başlatma hatası: ", "❌ Failed to start reading: ") + getErrorMessage(err)
      ]);
    }
  }

  function startPolling() {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }

    setPolling(true);
    pollingRef.current = true;
    setHistory([]);

    setLog((p) => [
      ...p.slice(-99),
      tx("▶️ Kayıt başladı", "▶️ Recording started")
    ]);

    const version = requestVersionRef.current;
    const safeScanRate = Math.max(scanRate, 500);

    scanIntervalRef.current = setInterval(() => {
      void sendReadRequest(version);
    }, safeScanRate);

    setStep("recording");
  }

  function stopPolling() {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }

    setPolling(false);
    pollingRef.current = false;

    setLog((p) => [
      ...p.slice(-99),
      tx("⏹ Kayıt durduruldu; canlı okuma devam ediyor.", "⏹ Recording stopped; live reading continues.")
    ]);

    setStep("confirmed");

    const version = requestVersionRef.current;
    const safeScanRate = Math.max(scanRate, 500);

    scanIntervalRef.current = setInterval(() => {
      void sendReadRequest(version);
    }, safeScanRate);
  }

  function stopReading() {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }

    requestAbortRef.current?.abort();
    requestAbortRef.current = null;
    requestVersionRef.current += 1;

    setPolling(false);
    pollingRef.current = false;
    setStep("idle");

    setLog((p) => [
      ...p.slice(-99),
      tx("⏹ Canlı okuma durduruldu.", "⏹ Live reading stopped.")
    ]);
  }

  const selectedRegister =
    selectedIndex !== null ? registers[selectedIndex] : undefined;

  /* ---------------- UI ---------------- */
  return (
    <div className="p-4 space-y-6 border rounded bg-gray-50 mt-6">
      <h2 className="text-xl font-bold">🌐 Modbus TCP/IP Terminal</h2>

      {!connected ? (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{en ? "Connection Settings" : "Bağlantı Ayarları"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>{en ? "IP Address" : "IP Adresi"}</label>
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
            {en ? "Connect to Device" : "Cihaza Bağlan"}
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
            title={en ? "Disconnect" : "Bağlantıyı kes"}
            className="absolute top-0 right-0 m-2 px-2 py-1 text-sm text-gray-500 hover:text-red-600 border rounded hover:bg-red-50"
          >
            ✕
          </button>

          <h3 className="text-lg font-semibold">{en ? "Read Definition" : "Okuma Tanımı"}</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            <div>
              <label>Slave ID</label>
              <input
                type="number"
                value={slaveId}
                onChange={(e) => setSlaveId(Number(e.target.value))}
                disabled={settingsLocked}
                className={`border p-1 rounded w-full ${settingsLocked ? "bg-gray-100 text-gray-500" : ""}`}
                min={1}
                max={247}
              />
            </div>
            <div>
              <label>{en ? "Function" : "Fonksiyon"}</label>
              <select
                value={func}
                onChange={(e) => setFunc(Number(e.target.value))}
                disabled={settingsLocked}
                className={`border p-1 rounded w-full ${settingsLocked ? "bg-gray-100 text-gray-500" : ""}`}
              >
                <option value={1}>01 - Read Coils</option>
                <option value={2}>02 - Read Discrete Inputs</option>
                <option value={3}>03 - Read Holding Registers</option>
                <option value={4}>04 - Read Input Registers</option>
              </select>
            </div>
            <div>
              <label>{en ? "Address" : "Adres"}</label>
              <input
                type="number"
                value={address}
                onChange={(e) => setAddress(Number(e.target.value))}
                disabled={settingsLocked}
                className={`border p-1 rounded w-full ${settingsLocked ? "bg-gray-100 text-gray-500" : ""}`}
              />
            </div>
            <div>
              <label>{en ? "Quantity" : "Miktar"}</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                disabled={settingsLocked}
                className={`border p-1 rounded w-full ${settingsLocked ? "bg-gray-100 text-gray-500" : ""}`}
              />
            </div>
            <div>
              <label>{en ? "Data Type" : "Veri Tipi"}</label>
              <select
                value={dataType}
                onChange={(e) => setDataType(e.target.value as DataType)}
                disabled={isBitFunction || settingsLocked}
                className={`border p-1 rounded w-full ${
                  isBitFunction || settingsLocked ? "bg-gray-100 text-gray-500" : ""
                }`}
              >
                {isBitFunction ? (
                  <option value={dataType}>Bit (0/1)</option>
                ) : (
                  <>
                    <option value="signed">Signed (16-bit)</option>
                    <option value="unsigned">Unsigned (16-bit)</option>
                    <option value="hex">Hex (16-bit)</option>

                    <option value="float">Float Inverse (32-bit)</option>
                    <option value="floatInverse">Float (32-bit)</option>

                    <option value="double">Double Inverse (64-bit)</option>
                    <option value="doubleInverse">Double (64-bit)</option>

                    <option value="long">Long Inverse (32-bit Int)</option>
                    <option value="longInverse">Long (32-bit Int)</option>
                  </>
                )}
              </select>
            </div>
            <div>
              <label>Scan Rate (ms)</label>
              <input
                type="number"
                value={scanRate}
                onChange={(e) => setScanRate(Number(e.target.value))}
                disabled={settingsLocked}
                className={`border p-1 rounded w-full ${settingsLocked ? "bg-gray-100 text-gray-500" : ""}`}
                min={500}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {step === "idle" && (
              <button
                onClick={startReading}
                className="px-3 py-2 rounded text-white transition bg-green-600 hover:bg-green-700"
              >
                {en ? "Start Reading" : "Okumayı Başlat"}
              </button>
            )}

            {step === "confirmed" && !hasError && (
              <>
                <span className="px-3 py-2 rounded bg-green-50 text-green-700 border border-green-200 text-sm font-medium">
                  🟢 {en ? "Live Reading Active" : "Canlı Okuma Aktif"}
                </span>

                <button
                  onClick={startPolling}
                  className="px-3 py-2 rounded text-white bg-purple-600 hover:bg-purple-700"
                >
                  {en ? "Start Recording" : "Kayıt Başlat"}
                </button>

                <button
                  onClick={stopReading}
                  className="px-3 py-2 rounded border border-gray-300 text-gray-700 bg-white hover:bg-gray-100"
                >
                  {en ? "Stop Reading" : "Okumayı Durdur"}
                </button>
              </>
            )}

            {step === "recording" && (
              <>
                <span className="px-3 py-2 rounded bg-red-50 text-red-700 border border-red-200 text-sm font-medium">
                  🔴 {en ? "Recording" : "Kayıt Yapılıyor"}
                </span>

                <button
                  onClick={stopPolling}
                  className="px-3 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                >
                  {en ? "Stop Recording" : "Kaydı Durdur"}
                </button>
              </>
            )}
          </div>

          {/* LOG ALANI */}
          <div className="relative">
            <button
              onClick={() => setLog([])}
              className="absolute top-2 right-5 px-2 py-1 text-xs bg-white text-gray-600 border rounded hover:bg-gray-100"
            >
              {en ? "Clear" : "Temizle"}
            </button>
            <div
              ref={logContainerRef}
              onScroll={handleLogScroll}
              className="bg-black text-green-400 font-mono text-sm p-2 rounded h-40 overflow-y-auto"
            >
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
                    <th className="border px-2 py-1">
                      {func === 1
                        ? "Coil"
                        : func === 2
                        ? "Discrete Input"
                        : "Register"}
                    </th>
                    <th className="border px-2 py-1">
                      {(() => {
                        if (isBitFunction) {
                          return "State (0/1)";
                        }

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
                        {i === 0 ? (en ? "Start" : "Başlangıç") : `${en ? "Query" : "Sorgu"} ${i}`}
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
                        {isBitFunction
                          ? String(r.decimal)
                          : typeof r.decimal === "number"
                          ? r.decimal.toFixed(2)
                          : r.decimal}
                      </td>
                      {Array.from({ length: 11 }).map((_, col) => (
                        <td key={col} className="border text-center text-[12px]">
                        {isBitFunction
                          ? history[idx]?.[col] ?? "-"
                          : typeof history[idx]?.[col] === "number"
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
            {!selectedRegister ? (
              <div>
                <h3 className="text-lg font-semibold text-brand-navy mb-2">
                  📊 {func === 1
                    ? (en ? "All Coil Trends" : "Tüm Coil Trendleri")
                    : func === 2
                    ? (en ? "All Discrete Input Trends" : "Tüm Discrete Input Trendleri")
                    : (en ? "All Register Trends" : "Tüm Register Trendleri")}
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
                        locale={locale}
                      />
                    ) : null
                  )}
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between mb-2">
                  <h3 className="text-lg font-semibold text-brand-navy">
                    {func === 1
                      ? `Coil ${selectedRegister.index} Trend`
                      : func === 2
                      ? `Discrete Input ${selectedRegister.index} Trend`
                      : `Register ${selectedRegister.index} Trend`}
                  </h3>
                  <button
                    onClick={() => setSelectedIndex(null)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    ← {en ? "Show All" : "Hepsini Göster"}
                  </button>
                </div>
                <TrendChart
                  label={selectedRegister.index}
                  data={history[selectedIndex ?? 0]}
                  polling={polling}
                  scanRate={scanRate}
                  locale={locale}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
