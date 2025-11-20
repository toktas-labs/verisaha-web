"use client";
import { useState } from "react";
import ModbusRTU from "./ModbusRTU";
import ModbusTCP from "./ModbusTCP";

export default function ModbusDemo() {
  const [selectedMode, setSelectedMode] = useState<"rtu" | "tcp" | null>(null);

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Üst Başlık */}
      <h1 className="text-3xl font-bold text-brand-navy text-center">
        Modbus Web Demo
      </h1>
      <p className="text-gray-600 text-center">
        Cihazınızın bağlantı tipine göre uygun seçeneği seçin.
      </p>

      {/* RTU / TCP Seçim Kartları */}
      <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {/* RTU Kartı */}
        <div
          onClick={() => setSelectedMode("rtu")}
          className={`cursor-pointer border rounded-lg p-6 transition h-56 ${
            selectedMode === "rtu"
              ? "border-blue-600 bg-blue-50 shadow-md"
              : "border-gray-200 hover:shadow-md hover:border-blue-300"
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 text-xl">
              🔌
            </div>
            <h2 className="text-lg md:text-xl font-semibold">Modbus RTU</h2>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed mt-6">
            RS-485/RS-232 üzerinden fiziksel kablo ile haberleşme. USB-RS485
            dönüştürücü kullanılır.
          </p>
        </div>

        {/* TCP/IP Kartı */}
        <div
          onClick={() => setSelectedMode("tcp")}
          className={`cursor-pointer border rounded-lg p-6 transition h-56 ${
            selectedMode === "tcp"
              ? "border-blue-600 bg-blue-50 shadow-md"
              : "border-gray-200 hover:shadow-md hover:border-blue-300"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 text-xl">
              🌐
            </div>
            <h2 className="text-lg md:text-xl font-semibold">Modbus TCP/IP</h2>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed mt-6">
            Ethernet veya SIM kart üzerinden IP tabanlı haberleşme. Statik IP
            veya VPN gerektirir.
          </p>
        </div>
      </div>

      {/* Seçilen Modun İçeriği */}
      {selectedMode === "rtu" && (
        <div className="animate-fadeIn">
          <ModbusRTU />
        </div>
      )}

      {selectedMode === "tcp" && (
        <div className="animate-fadeIn">
          <ModbusTCP />
        </div>
      )}
    </div>
  );
}
