import type { Metadata } from "next";
import ModbusDemo from "@/components/demo/ModbusDemo";

export const metadata: Metadata = {
  title: "Modbus RTU & TCP Web Demo | VeriSaha Teknoloji",
  description:
    "Modbus RTU ve Modbus TCP cihazlarını tarayıcı üzerinden test edin, register verilerini okuyun ve trendleri izleyin.",
};

export default function DemoPage() {
  return (
    <main className="p-6">
      <ModbusDemo />
    </main>
  );
}
