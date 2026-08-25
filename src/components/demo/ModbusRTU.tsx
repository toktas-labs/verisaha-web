"use client";
import { useState, useRef, useEffect } from "react";
import { flushSync } from "react-dom";
import TrendChart from "./TrendChart";
import type { Locale } from "@/lib/i18n";

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

type SerialParity = "none" | "even" | "odd";

interface VeriSahaSerialPort {
  readonly readable: ReadableStream<Uint8Array> | null;
  readonly writable: WritableStream<Uint8Array> | null;
  open(options: {
    baudRate: number;
    dataBits: number;
    parity: SerialParity;
    stopBits: number;
  }): Promise<void>;
  close(): Promise<void>;
}

interface VeriSahaSerialApi {
  requestPort(): Promise<VeriSahaSerialPort>;
}

declare global {
  interface Navigator {
    serial?: VeriSahaSerialApi;
  }
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}


interface RegisterRow {
  index: number;
  decimal: number | string;
}

export default function ModbusRTU({ locale = "tr" }: { locale?: Locale }) {
  const en = locale === "en";
  const tx = (tr: string, english: string) => (en ? english : tr);
  const [port, setPort] = useState<VeriSahaSerialPort | null>(null);
  const portRef = useRef<VeriSahaSerialPort | null>(null);
  const [log, setLog] = useState<string[]>([]);
  const [registers, setRegisters] = useState<RegisterRow[]>([]);
  const [history, setHistory] = useState<(number | string)[][]>([]);
  const [polling, setPolling] = useState(false);
  const [step, setStep] = useState<"idle" | "confirmed" | "recording">("idle");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const logContainerRef = useRef<HTMLDivElement | null>(null);
  const autoScrollLogRef = useRef(true);
  const pollingIntervalRef = useRef<number | null>(null);
  const bufferRef = useRef<Uint8Array>(new Uint8Array());
  const readerRef = useRef<ReadableStreamDefaultReader<Uint8Array> | null>(null);
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastErrorRef = useRef<string | null>(null);
  const crcErrorLoggedRef = useRef(false);
  const addressRef = useRef(0);
  const pollingRef = useRef(false);
  useEffect(() => { pollingRef.current = polling; }, [polling]);

  const firstResponseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastAutoReadErrorRef = useRef<string | null>(null);
  const wasDisconnectedRef = useRef(false);

  useEffect(() => {
    return () => {
      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
      if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
      if (firstResponseTimerRef.current) clearTimeout(firstResponseTimerRef.current);

      scanIntervalRef.current = null;
      pollingIntervalRef.current = null;
      firstResponseTimerRef.current = null;
      pollingRef.current = false;

      const activeReader = readerRef.current;
      const activePort = portRef.current;

      void (async () => {
        if (activeReader) {
          try {
            await activeReader.cancel();
          } catch {}
          try {
            activeReader.releaseLock();
          } catch {}
        }

        if (activePort) {
          try {
            await activePort.close();
          } catch {}
        }
      })();
    };
  }, []);


  // connection settings
  const [baudRate, setBaudRate] = useState(38400);
  const [dataBits, setDataBits] = useState(8);
  const [parity, setParity] = useState<SerialParity>("even");
  const [stopBits, setStopBits] = useState(1);

  // read/write settings
  const [hasError, setHasError] = useState(false);
  const [slaveId, setSlaveId] = useState(1);
  const [func, setFunc] = useState(3);
  const [address, setAddress] = useState(0);
  const [quantity, setQuantity] = useState(10);
  const [scanRate, setScanRate] = useState(1000);
  const [dataType, setDataType] = useState<DataType>("signed");

  const isBitFunction = func === 1 || func === 2;
  const settingsLocked = step !== "idle";

  const funcRef = useRef(func);
  useEffect(() => {
    funcRef.current = func;
  }, [func]);

  const slaveIdRef = useRef(slaveId);
  useEffect(() => {
    slaveIdRef.current = slaveId;
  }, [slaveId]);

  const quantityRef = useRef(quantity);
  useEffect(() => {
    quantityRef.current = quantity;
  }, [quantity]);

  const dataTypeRef = useRef(dataType);
  useEffect(() => {
    dataTypeRef.current = dataType;
  }, [dataType]);

  useEffect(() => {
    addressRef.current = address;
  }, [address]);


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

  /* ---------------- PORT İŞLEMLERİ ---------------- */
  async function releasePortResources(
    activePort: VeriSahaSerialPort | null = portRef.current
  ) {
    const activeReader = readerRef.current;
    readerRef.current = null;

    if (activeReader) {
      try {
        await activeReader.cancel();
      } catch {}
      try {
        activeReader.releaseLock();
      } catch {}
    }

    if (activePort) {
      try {
        await activePort.close();
      } catch {}
    }

    if (!activePort || portRef.current === activePort) {
      portRef.current = null;
    }
    bufferRef.current = new Uint8Array();
  }

  async function connectPort() {
    const serial = navigator.serial;

    if (!serial) {
      const msg = tx(
        "❌ Web Serial desteklenmiyor. Modbus RTU için masaüstü Chrome veya Edge kullanın.",
        "❌ Web Serial is not supported. Use desktop Chrome or Edge for Modbus RTU."
      );
      setLog((p) => [...p.slice(-99), msg]);
      alert(msg);
      return;
    }

    try {
      const selectedPort = await serial.requestPort();
      await selectedPort.open({ baudRate, dataBits, parity, stopBits });
      portRef.current = selectedPort;
      setPort(selectedPort);
      setLog((p) => [
        ...p,
        `✅ ${tx("Modbus RTU bağlantısı kuruldu", "Modbus RTU connection established")} (${baudRate}, ${dataBits}${parity}, ${stopBits} stop)`,
      ]);
      startReader(selectedPort);
    } catch (err: unknown) {
      const errorMessage = getErrorMessage(err);
      const msg =
        errorMessage.includes("open")
          ? tx("❌ Port zaten kullanımda veya uygun değil.", "❌ The port is already in use or unavailable.")
          : errorMessage.includes("NetworkError")
          ? tx("❌ Port bağlantısı reddedildi veya kullanımda.", "❌ Port access was denied or the port is already in use.")
          : tx("❌ Port açılamadı: ", "❌ Could not open port: ") + errorMessage;
      setLog((p) => [...p, msg]);
      alert(msg);
    }
  }

  async function closePort() {
    try {
      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
      if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
      if (firstResponseTimerRef.current) clearTimeout(firstResponseTimerRef.current);

      scanIntervalRef.current = null;
      pollingIntervalRef.current = null;
      firstResponseTimerRef.current = null;

      await releasePortResources(portRef.current ?? port);
      setPort(null);
      setRegisters([]);
      setHistory([]);
      setSelectedIndex(null);
      setStep("idle");
      setPolling(false);
      pollingRef.current = false;
      setHasError(false);
      setLog((p) => [...p.slice(-99), tx("🔌 Port kapatıldı", "🔌 Port closed")]);
    } catch (err: unknown) {
      setLog((p) => [
        ...p.slice(-99),
        tx("⚠️ Port kapatılamadı: ", "⚠️ Could not close port: ") +
          getErrorMessage(err),
      ]);
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

  function hasValidCRC(frame: Uint8Array): boolean {
    if (frame.length < 4) return false;

    const payload = Array.from(frame.slice(0, -2));
    const [crcLo, crcHi] = calcCRC(payload);

    return (
      frame[frame.length - 2] === crcLo &&
      frame[frame.length - 1] === crcHi
    );
  }



  async function startReader(selectedPort: VeriSahaSerialPort) {
    const reader = selectedPort.readable?.getReader();
    if (!reader) return;
    readerRef.current = reader;

    try {
      while (selectedPort.readable) {
        const { value, done } = await reader.read();
        if (done || !value) break;

        const currentBuffer = bufferRef.current;
        const newBuffer = new Uint8Array(currentBuffer.length + value.length);
        newBuffer.set(currentBuffer);
        newBuffer.set(value, currentBuffer.length);
        bufferRef.current =
          newBuffer.length > 4096 ? newBuffer.slice(-4096) : newBuffer;

        processBuffer();
      }
    } catch (err: unknown) {
      const message = getErrorMessage(err) || tx("Cihaz yanıt vermiyor", "Device is not responding");

      if (lastAutoReadErrorRef.current !== message) {
        setLog((p) => [
          ...p.slice(-99),
          tx("⛔ Bağlantı koptu: Cihazdan veri alınamadı. Kabloyu kontrol edin.", "⛔ Connection lost: No data received from the device. Check the cable and serial connection.")
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

      await releasePortResources(selectedPort);
      setPort(null);

    } finally {
      try { reader.releaseLock(); } catch {}
      readerRef.current = null;
    }
  }

  function processBuffer() {
    while (bufferRef.current.length >= 5) {
      let buf = bufferRef.current;
      const slaveIndex = buf.indexOf(slaveIdRef.current);

      if (slaveIndex < 0) {
        bufferRef.current = new Uint8Array();
        return;
      }

      if (slaveIndex > 0) {
        bufferRef.current = buf.slice(slaveIndex);
        buf = bufferRef.current;
      }

      if (buf.length < 5) return;

      const funcCode = buf[1];
      const expectedFunc = funcRef.current;
      const isException = funcCode === (expectedFunc | 0x80);

      if (funcCode !== expectedFunc && !isException) {
        bufferRef.current = buf.slice(1);
        continue;
      }

      const expectedLength = isException ? 5 : 3 + buf[2] + 2;

      if (!isException) {
        const expectedByteCount =
          expectedFunc === 1 || expectedFunc === 2
            ? Math.ceil(quantityRef.current / 8)
            : quantityRef.current * 2;

        if (buf[2] !== expectedByteCount) {
          bufferRef.current = buf.slice(1);
          continue;
        }
      }

      if (buf.length < expectedLength) return;

      const fullPacket = buf.slice(0, expectedLength);

      if (!hasValidCRC(fullPacket)) {
        if (!crcErrorLoggedRef.current) {
          setLog((p) => [
            ...p.slice(-99),
            tx(
              "⚠️ Geçersiz CRC'li Modbus cevabı yok sayıldı.",
              "⚠️ A Modbus response with an invalid CRC was ignored."
            ),
          ]);
          crcErrorLoggedRef.current = true;
        }

        bufferRef.current = buf.slice(1);
        continue;
      }

      crcErrorLoggedRef.current = false;
      bufferRef.current = buf.slice(expectedLength);

      if (firstResponseTimerRef.current) {
        clearTimeout(firstResponseTimerRef.current);
        firstResponseTimerRef.current = null;
      }

      if (isException) {
        const errorCode = fullPacket[2];
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
          setLog((p) => [...p.slice(-99), `❌ ${desc}`]);
          lastErrorRef.current = desc;
        }

        setHasError(true);
        setPolling(false);
        pollingRef.current = false;
        setStep("idle");

        if (scanIntervalRef.current) {
          clearInterval(scanIntervalRef.current);
          scanIntervalRef.current = null;
        }

        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current);
          pollingIntervalRef.current = null;
        }

        return;
      }

      handleResponse(fullPacket);
    }
  }

  /* ---------------- VERİ AYRIŞTIRMA ---------------- */
  function handleResponse(value: Uint8Array) {

    if (wasDisconnectedRef.current) {
      setLog((p) => [
        ...p.slice(-99),
        tx("🔄 Bağlantı yeniden sağlandı.", "🔄 Connection restored.")
      ]);

      wasDisconnectedRef.current = false;
      lastAutoReadErrorRef.current = null; // Hata flag reset
    }
    if (firstResponseTimerRef.current) {
      clearTimeout(firstResponseTimerRef.current);
      firstResponseTimerRef.current = null;
    }

    if (value[1] !== funcRef.current) return;
    const byteCount = value[2];
    const dataBytes = value.slice(3, 3 + byteCount);
    const regs: RegisterRow[] = [];

    // FC01 Read Coils / FC02 Read Discrete Inputs
    if (funcRef.current === 1 || funcRef.current === 2) {
      const bitCount = Math.min(
        quantityRef.current,
        dataBytes.length * 8
      );

      for (let bitIndex = 0; bitIndex < bitCount; bitIndex++) {
        const byteIndex = Math.floor(bitIndex / 8);
        const bitPosition = bitIndex % 8;

        const bitValue =
          (dataBytes[byteIndex] >> bitPosition) & 0x01;

        regs.push({
          index: addressRef.current + bitIndex,
          decimal: bitValue,
        });
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

      return;
    }

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
  }

  /* ---------------- FRAME GÖNDERME ---------------- */
  async function sendFrame() {
    if (!port) throw new Error(tx("Port bağlı değil", "Port is not connected"));

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

    let writer: WritableStreamDefaultWriter<Uint8Array> | null = null;

    try {
      if (!port.writable) {
        throw new Error("Cannot create writer");
      }

      writer = port.writable.getWriter();

      await writer.write(request);

    } catch (err: unknown) {
       const message = getErrorMessage(err) || "Unknown write error";

      if (lastAutoReadErrorRef.current !== message) {
        setLog((p) => [
          ...p.slice(-99),
          tx("⛔ Bağlantı koptu: Cihazdan veri alınamadı. Kabloyu kontrol edin.", "⛔ Connection lost: No data received from the device. Check the cable and serial connection.")
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

      try {
        writer?.releaseLock();
      } catch {}
      writer = null;

      await releasePortResources(portRef.current ?? port);
      setPort(null);

    } finally {
      try { writer?.releaseLock(); } catch {}
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

  function startReading() {
    try {
      const validationError = validateReadSettings();
      if (validationError) {
        setLog((p) => [...p.slice(-99), `❌ ${validationError}`]);
        setHasError(true);
        setStep("idle");
        return;
      }

      setRegisters([]);
      setHistory([]);
      setSelectedIndex(null);
      setPolling(false);
      pollingRef.current = false;
      setHasError(false);

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

      const safeScanRate = Math.max(scanRate, 200);

      if (scanRate < 200) {
        setScanRate(200);
        setLog((p) => [
          ...p.slice(-99),
          tx(
            "⚠️ Kararlı RTU haberleşmesi için minimum scan rate 200 ms olarak uygulanır.",
            "⚠️ The minimum scan rate is limited to 200 ms for stable RTU communication."
          ),
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

      lastErrorRef.current = null;
      lastAutoReadErrorRef.current = null;

      sendFrame().catch((err: unknown) =>
        setLog((p) => [...p.slice(-99), tx("❌ İlk okuma hatası: ", "❌ Initial read error: ") + getErrorMessage(err)])
      );

      if (firstResponseTimerRef.current) clearTimeout(firstResponseTimerRef.current);

      firstResponseTimerRef.current = setTimeout(() => {
        setHasError(true);
        setStep("idle");
        if (scanIntervalRef.current) {
          clearInterval(scanIntervalRef.current);
          scanIntervalRef.current = null;
        }
        setLog((p) => [
          ...p.slice(-99),
          tx("⛔ Timeout: Cihazdan cevap alınamadı. Bağlantı ayarlarını kontrol edin.", "⛔ Timeout: No response received from the device. Check the connection settings.")
        ]);
      }, 2000);

      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = setInterval(() => {
        sendFrame().catch((err: unknown) =>
          setLog((p) => [...p.slice(-99), tx("⚠️ Otomatik okuma hatası: ", "⚠️ Automatic read error: ") + getErrorMessage(err)])
        );
      }, safeScanRate);

      setStep("confirmed");
    } catch (err: unknown) {
      setStep("idle");
      setLog((p) => [...p.slice(-99), tx("❌ Okuma başlatma hatası: ", "❌ Failed to start reading: ") + getErrorMessage(err)]);
    }
  }

  function startPolling() {
    if (!port) return;
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }

    setPolling(true);
    pollingRef.current = true;
    setHistory([]);
    setLog((p) => [...p.slice(-99), tx("▶️ Kayıt başladı", "▶️ Recording started")]);

    pollingIntervalRef.current = window.setInterval(async () => {
      try {
        await sendFrame();
      } catch (err: unknown) {
        setLog((p) => [...p.slice(-99), tx("⚠️ Sorgu hatası: ", "⚠️ Query error: ") + getErrorMessage(err)]);
      }
    }, scanRate);

    setStep("recording");
  }

  function stopPolling() {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }

    setPolling(false);
    pollingRef.current = false;
    setLog((p) => [
      ...p.slice(-99),
      tx("⏹ Kayıt durduruldu; canlı okuma devam ediyor.", "⏹ Recording stopped; live reading continues.")
    ]);

    setStep("confirmed");

    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }

    scanIntervalRef.current = setInterval(() => {
      sendFrame().catch((err: unknown) =>
        setLog((p) => [...p.slice(-99), tx("⚠️ Otomatik okuma hatası (yeniden): ", "⚠️ Automatic read error (retry): ") + getErrorMessage(err)])
      );
    }, scanRate);
  }

  function stopReading() {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }

    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }

    if (firstResponseTimerRef.current) {
      clearTimeout(firstResponseTimerRef.current);
      firstResponseTimerRef.current = null;
    }

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
      <h2 className="text-xl font-bold">🔌 Modbus RTU Terminal</h2>

      {!port ? (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{en ? "Connection Settings" : "Bağlantı Ayarları"}</h3>
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
              <label>{en ? "Data Bits" : "Veri Bitleri"}</label>
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
              <label>{en ? "Parity" : "Parite"}</label>
              <select
                value={parity}
                onChange={(e) => setParity(e.target.value as SerialParity)}
                className="border rounded px-2 py-1 w-full"
              >
                <option value="none">None</option>
  		<option value="even">Even</option>
                <option value="odd">Odd</option>
              </select>
            </div>
            <div>
              <label>{en ? "Stop Bits" : "Stop Bitleri"}</label>
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
            {en ? "Connect to Port" : "Porta Bağlan"}
          </button>
        </div>
      ) : (
        <div className="space-y-4 relative">
          {/* Port açıkken kapatma butonu */}
          <button
            onClick={closePort}
            title={en ? "Close port" : "Portu kapat"}
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
                <option value={3}>03 - Read Holding</option>
                <option value={4}>04 - Read Input</option>
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

                    <option value="floatInverse">Float (32-bit)</option>
                    <option value="float">Float Inverse (32-bit)</option>

                    <option value="doubleInverse">Double (64-bit)</option>
                    <option value="double">Double Inverse (64-bit)</option>

                    <option value="longInverse">Long (32-bit Int)</option>
                    <option value="long">Long Inverse (32-bit Int)</option>
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
                min={200}
              />
            </div>
          </div>

          {/* Kontrol Butonları */}
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

          {/* Log Alanı */}
          <div className="relative">
            <button
              onClick={() => setLog([])}
              className="absolute top-2 right-5 px-2 py-1 text-xs bg-white text-gray-600 border border-gray-300 rounded hover:bg-gray-100"
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
        </div>
      )}

      {/* Register Tablosu */}
      {registers.length > 0 && (
	<div className="overflow-x-auto">
         <table className="w-full border-collapse border text-sm">
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
                  {isBitFunction
                    ? String(r.decimal)
                    : typeof r.decimal === "number"
                    ? r.decimal.toFixed(2)
                    : r.decimal}
                </td>
                {Array.from({ length: 11 }).map((_, col) => (
                  <td key={col} className="border px-1 py-0.5 text-center text-[12px] whitespace-nowrap">
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

	{/* Trend Alanı */}
       <div className="mt-6 space-y-6">
 	 {/* Eğer hiçbir satır seçilmediyse: tüm register'ların trendini göster */}
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
    /* Eğer bir satır seçildiyse: sadece o grafiği göster */
    <div>
      <div className="flex items-center justify-between mb-2">
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
       scanRate={scanRate} // 🔹 buradan doğru aktarılıyor
       locale={locale}
      />
    </div>
  )}
</div>

    </div>
  );
}


