import type { Metadata } from "next";
import ModbusDemo from "@/components/demo/ModbusDemo";

export const metadata: Metadata = {
  title: "Online Modbus RTU & TCP Web Demo | VeriSaha Teknoloji",
  description:
    "Test and monitor Modbus RTU and Modbus TCP devices directly from the browser with VeriSaha Modbus Web Demo.",
};

export default function EnglishDemoPage() {
  return (
    <main className="p-6">
      <ModbusDemo locale="en" />
    </main>
  );
}
