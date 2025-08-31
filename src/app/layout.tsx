import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "VeriSaha Teknoloji",
  description: "Endüstriyel Verinin Adresi",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className="min-h-dvh bg-background text-foreground font-sans">
        <ThemeProvider>
          <Navbar />
          {children}
          <Separator className="my-10 bg-gray-300/30 dark:bg-gray-600/30" /> {/* ✅ Footer öncesi */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

