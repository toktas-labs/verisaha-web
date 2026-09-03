import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ModbusDemoCTA from "@/components/modbus-demo-cta";
import { ThemeProvider } from "@/components/theme-provider";
import HtmlLangSync from "@/components/html-lang-sync";

export const metadata: Metadata = {
  metadataBase: new URL("https://verisaha.com"),
  title: "VeriSaha Teknoloji",
  description: "Endüstriyel Verinin Adresi",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className="min-h-dvh bg-background text-foreground font-sans">
        <ThemeProvider>
          <HtmlLangSync />
          <div className="flex min-h-dvh flex-col">
            <Navbar />
            <div className="flex-1">{children}</div>
            <ModbusDemoCTA />
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
