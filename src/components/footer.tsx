import Link from "next/link";
import { Mail, MapPin, Phone, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-brand-navy text-white/90">
      {/* ÜST: logo + CTA */}
      <div className="mx-auto max-w-7xl px-4 lg:px-6 py-12">
        <div className="flex items-center justify-between gap-4 pb-10 border-b border-white/15">
          <Link href="/" className="flex items-center gap-3">
            {/* İstersen buraya <Image src="/verisaha-logo.png" .../> koyabilirsin */}
            <div className="h-8 w-8 rounded-full bg-white/10 grid place-items-center font-bold">
              VST
            </div>
            <span className="text-xl font-semibold tracking-tight">
              VeriSaha Teknoloji
            </span>
          </Link>

          <Link
            href="/iletisim"
            className="inline-flex items-center rounded-full border px-5 py-2 text-sm font-medium
                       border-brand-teal text-white hover:bg-white/10 transition"
          >
            İletişim Kur
          </Link>
        </div>

        {/* ORTA: sütunlar */}
        <div className="grid gap-10 pt-10 lg:grid-cols-4">
          {/* Hizmetler */}
          <div>
            <h4 className="text-white font-semibold mb-3">Hizmetler</h4>
            <ul className="space-y-2 text-white/80">
   		<li><Link className="hover:underline" href="/#solutions">Tüm Hizmetler</Link></li>
    		<li><Link className="hover:underline" href="/cozumler//uzaktan-izleme">Uzaktan İzleme</Link></li>
    		<li><Link className="hover:underline" href="/cozumler/proje-bazli">Proje Bazlı Çözümler</Link></li>
    		<li><Link className="hover:underline" href="/cozumler/endustriyel-otomasyon">Endüstriyel Otomasyon</Link></li>
    		<li><Link className="hover:underline" href="/cozumler/raporlama">Raporlama</Link></li>
            </ul>
          </div>

          {/* Sektörler */}
	<div>
	  <h4 className="text-white font-semibold mb-3">Sektörler</h4>
	  <ul className="space-y-2 text-white/80">
	    <li>Tüm Sektörler</li>
	    <li>Gıda &amp; Süt</li>
	    <li>Kimya</li>
	    <li>Enerji</li>
	    <li>Su &amp; Atıksu</li>
	  </ul>
	</div>

          {/* Hakkımızda */}
	<div>
	  <h4 className="text-white font-semibold mb-3">Hakkımızda</h4>
	  <ul className="space-y-2 text-white/80">
	    <li>Kurumsal</li>
	    {/* Referanslar tamamen kaldırıldı */}
	    <li>Blog</li>
	    <li>Yasal Bilgiler</li>
	    <li>Gizlilik Politikası</li>
	  </ul>
	</div>

          {/* Headquarters (2 kolon genişlik) */}
          <div>
            <h4 className="text-white font-semibold mb-3">VeriSaha Merkez</h4>
            <ul className="space-y-3 text-white/85">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5" />
                <p>Antalya, Türkiye</p>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5" />
                <a className="underline underline-offset-4" href="mailto:info@verisaha.com">
                  info@verisaha.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5" />
                <a className="hover:underline" href="tel:+905446614303">+90 544 661 43 03</a>
              </li>
            </ul>
          </div>
        </div>

        {/* ALT: sosyal + telif + grup logoları */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3 border-t border-white/15 pt-6">
          {/* Sosyal */}
          <div className="flex items-center gap-3">
            <a
              aria-label="YouTube"
              href="#"
              className="size-9 rounded-full grid place-items-center border border-white/20 hover:bg-white/10"
            >
              <Youtube className="h-5 w-5" />
            </a>
            <a
              aria-label="LinkedIn"
              href="#"
              className="size-9 rounded-full grid place-items-center border border-white/20 hover:bg-white/10"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>

          {/* Telif */}
          <div className="text-center text-sm text-white/70">
            © {new Date().getFullYear()} VeriSaha Teknoloji — Tüm hakları saklıdır.
          </div>
        </div>
      </div>
    </footer>
  );
}
