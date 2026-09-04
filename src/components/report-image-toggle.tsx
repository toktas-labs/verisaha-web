"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Search, X } from "lucide-react";

export default function ReportImageToggle() {
  const [showExcel, setShowExcel] = useState(false);

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setShowExcel(false);
        }
      }}
    >
      {/* Kart içindeki standart küçük görsel */}
      <DialogTrigger asChild>
        <div className="relative mt-4 aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-lg border">
          <Image
            src="/olcum/raporlar1.png"
            alt="Raporlama"
            fill
            className="object-cover"
          />

          <div className="absolute bottom-2 right-2 rounded-full bg-white/80 p-2 shadow">
            <Search className="h-5 w-5 text-brand-navy" />
          </div>
        </div>
      </DialogTrigger>

      {/* Büyük görünüm */}
      <DialogContent className="w-[95vw] max-w-6xl p-3 md:p-4 [&>button:not(.custom-close)]:hidden">
        <DialogTitle className="sr-only">
          Raporlama Görselleri
        </DialogTitle>

        <DialogClose className="custom-close absolute right-3 top-3 z-30 rounded-full bg-white/95 p-2 shadow hover:bg-white">
          <X className="h-5 w-5 text-brand-navy" />
        </DialogClose>

        <div
          role="button"
          tabIndex={0}
          onClick={() => setShowExcel((prev) => !prev)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setShowExcel((prev) => !prev);
            }
          }}
          className="group relative w-full cursor-pointer overflow-hidden rounded-lg bg-white"
          title={
            showExcel
              ? "Raporlama ekranına dönmek için tıklayın"
              : "Excel çıktısını görmek için tıklayın"
          }
        >
          <Image
            src={showExcel ? "/olcum/excel.png" : "/olcum/raporlar1.png"}
            alt={
              showExcel
                ? "Excel rapor çıktısı"
                : "Web tabanlı raporlama ekranı"
            }
            width={1800}
            height={1100}
            className="max-h-[82vh] w-full object-contain"
            priority
          />

          <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-navy/90 px-4 py-2 text-xs font-medium text-white opacity-0 shadow transition-opacity group-hover:opacity-100">
            {showExcel
              ? "Raporlama ekranına dönmek için tıklayın"
              : "Excel çıktısını görmek için tıklayın"}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
