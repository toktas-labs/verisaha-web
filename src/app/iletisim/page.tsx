import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, Linkedin, Instagram, Youtube } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ContactForm from "@/components/contact-form";

export const metadata: Metadata = {
  title: "İletişim | VeriSaha Teknoloji",
  description: "VeriSaha Teknoloji ile iletişime geçin. Ölçüm izleme, otomasyon ve raporlama çözümleri.",
};

export default function Page() {
  return (
    <main className="bg-white">
      {/* Üst başlık */}
      <section className="border-b bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-navy">İletişim</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Sizi dinlemek için buradayız. Ölçüm izleme, otomasyon ve raporlama çözümleri hakkında sorularınızı iletin;
            ekibimiz en kısa sürede dönüş yapsın.
          </p>
        </div>
      </section>

      {/* İçerik */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14 grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sol panel */}
          <div className="lg:col-span-2">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>VeriSaha Merkez</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
	<div className="flex items-start gap-3">
	  <MapPin className="mt-1 h-5 w-5 text-brand-navy" />
	  <div>
	    <p className="font-semibold">VeriSaha Teknoloji San. ve Tic. Ltd. Şti</p>
	    <p className="text-slate-600">
	      Yeniköy Mh. 658 Sk. Sanayi Sitesi H Blok No:3 Dükkan 12 <br />
	      Döşemealtı - Antalya / TÜRKİYE
	    </p>
	    <Link
	      href="https://www.google.com/maps?q=Yeniköy+Mah.+658+Sk.+Sanayi+Sitesi+H+Blok+No:3+Dükkan+12,+Döşemealtı,+Antalya"
	      target="_blank"
	      rel="noopener noreferrer"
	      className="text-brand-teal hover:underline text-sm font-medium"
	    >
	      📍 Google Maps’te Görüntüle
	    </Link>
	  </div>
	</div>

                <div className="flex items-start gap-3">
                  <Mail className="mt-1 h-5 w-5 text-brand-navy" />
                  <div>
                    <Link href="mailto:info@verisaha.com" className="font-medium hover:underline">
                      info@verisaha.com
                    </Link>
                    <p className="text-slate-600">Teklif talebi & genel sorular</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="mt-1 h-5 w-5 text-brand-navy" />
                  <div>
                    <Link href="tel:+905446614303" className="font-medium hover:underline">
                      +90 544 661 43 03
                    </Link>
                    <p className="text-slate-600">7/24 canlı veri takibi için destek</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="mt-1 h-5 w-5 text-brand-navy" />
                  <div>
                    <p className="font-medium">Çalışma Saatleri</p>
                    <p className="text-slate-600">Hafta içi 09:00–18:00</p>
                  </div>
                </div>

                <div className="pt-1">
                  <p className="text-sm text-slate-500 mb-2">Bizi takip edin</p>
                  <div className="flex items-center gap-3">
                    <Link href="https://www.linkedin.com" className="inline-flex rounded-full p-2 hover:bg-slate-100" aria-label="LinkedIn">
                      <Linkedin className="h-5 w-5" />
                    </Link>
                    <Link href="https://www.instagram.com" className="inline-flex rounded-full p-2 hover:bg-slate-100" aria-label="Instagram">
                      <Instagram className="h-5 w-5" />
                    </Link>
                    <Link href="https://www.youtube.com" className="inline-flex rounded-full p-2 hover:bg-slate-100" aria-label="YouTube">
                      <Youtube className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sağ form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
