"use client";

import { useState } from "react";
import ModbusRTU from "./ModbusRTU";
import ModbusTCP from "./ModbusTCP";
import type { Locale } from "@/lib/i18n";

export default function ModbusDemo({ locale = "tr" }: { locale?: Locale }) {
  const [selectedMode, setSelectedMode] = useState<"rtu" | "tcp" | null>(null);
  const en = locale === "en";

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-brand-navy text-center">Modbus Web Demo</h1>
      <p className="text-gray-600 text-center">
        {en ? "Select the connection type used by your Modbus device." : "Cihazınızın bağlantı tipine göre uygun seçeneği seçin."}
      </p>

      <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        <button
          type="button"
          onClick={() => setSelectedMode("rtu")}
          className={`cursor-pointer border rounded-lg p-6 transition h-56 text-left ${
            selectedMode === "rtu"
              ? "border-blue-600 bg-blue-50 shadow-md"
              : "border-gray-200 hover:shadow-md hover:border-blue-300"
          }`}
          aria-pressed={selectedMode === "rtu"}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 text-xl">🔌</div>
            <h2 className="text-lg md:text-xl font-semibold">Modbus RTU</h2>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed mt-6">
            {en
              ? "Communicate over a physical RS-485/RS-232 connection using a compatible USB-to-RS485 adapter."
              : "RS-485/RS-232 üzerinden fiziksel kablo ile haberleşme. USB-RS485 dönüştürücü kullanılır."}
          </p>
        </button>

        <button
          type="button"
          onClick={() => setSelectedMode("tcp")}
          className={`cursor-pointer border rounded-lg p-6 transition h-56 text-left ${
            selectedMode === "tcp"
              ? "border-blue-600 bg-blue-50 shadow-md"
              : "border-gray-200 hover:shadow-md hover:border-blue-300"
          }`}
          aria-pressed={selectedMode === "tcp"}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 text-xl">🌐</div>
            <h2 className="text-lg md:text-xl font-semibold">Modbus TCP/IP</h2>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed mt-6">
            {en
              ? "IP-based communication over Ethernet or cellular networks. A reachable public IP or VPN is required."
              : "Ethernet veya SIM kart üzerinden IP tabanlı haberleşme. Statik IP veya VPN gerektirir."}
          </p>
        </button>
      </div>

      {selectedMode === "rtu" && (
        <div className="animate-fadeIn">
          <ModbusRTU locale={locale} />
        </div>
      )}

      {selectedMode === "tcp" && (
        <div className="animate-fadeIn">
          <ModbusTCP locale={locale} />
        </div>
      )}
    </div>
  );
}
