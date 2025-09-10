import { Metadata } from "next";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hakkımızda | VeriSaha Teknoloji",
  description:
    "VeriSaha Teknoloji – Endüstriyel ölçüm, izleme ve otomasyon alanında güvenilir çözümler.",
};

export default function HakkimizdaPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="border-b bg-brand-off">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-brand-navy">
            Hakkımızda
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            VeriSaha Teknoloji, endüstriyel ölçüm, izleme ve otomasyon
            çözümlerinde güvenilir ve yenilikçi çözümler üretmek amacıyla
            kurulmuştur.
          </p>
        </div>
      </section>

      {/* Kuruluş hikayesi */}
      <section className="mx-auto max-w-6xl px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
        {/* Fotoğraf */}
        <div className="relative w-full h-80 md:h-[420px]">
          <Image
            src="/hakkimizda-photo.jpg" // public klasörüne ekleyebilirsin
            alt="Kurucu"
            fill
            className="object-cover rounded-2xl shadow"
          />
        </div>
        {/* Metin */}
        <div>
          <h2 className="text-3xl font-bold text-brand-navy mb-4">
            Hikayemiz
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Antalya doğumlu kurucumuz,{" "}
            <strong>Yıldız Teknik Üniversitesi Mekatronik Mühendisliği</strong>{" "}
            mezunudur. Eğitimini tamamladıktan sonra{" "}
            <strong>Sesinoks</strong> ve <strong>KROHNE</strong> firmalarında
            görev alarak, endüstriyel ölçüm cihazları, sistem tasarımı ve
            otomasyon projelerinde aktif rol aldı.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Edindiği saha deneyimleri ve yazılım geliştirme tecrübelerini 2025
            yılında <strong>VeriSaha Teknoloji</strong> çatısı altında
            topladı. Bugün hedefimiz, işletmelerin verilerini doğru, güvenilir
            ve anlaşılır şekilde yönetmelerine yardımcı olmaktır.
          </p>
        </div>
      </section>

      {/* Yetkinlikler */}
      <section className="bg-brand-off py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-brand-navy text-center mb-12">
            Uzmanlık Alanlarımız
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
	      "C# & MySQL Veri İzleme Yazılımları",
              "PLC & SCADA Entegrasyonu",
              "Debimetre & Akış Ölçüm Sistemleri",
              "Batch Kontrol ve Raporlama",
            ].map((item) => (
              <div
                key={item}
                className="p-6 bg-white rounded-2xl shadow-sm border flex flex-col items-center text-center"
              >
                <CheckCircle className="h-8 w-8 text-brand-teal mb-3" />
                <p className="font-medium text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Misyon / Vizyon / Değerler */}
      <section className="mx-auto max-w-6xl px-4 py-16 grid md:grid-cols-3 gap-8">
        <div className="bg-white shadow-sm rounded-2xl p-6 border">
          <h3 className="text-xl font-bold text-brand-navy mb-3">Misyonumuz</h3>
          <p className="text-slate-600 leading-relaxed">
            Endüstriyel veriyi anlaşılır, güvenilir ve erişilebilir hale
            getirerek işletmelerin dijital dönüşüm yolculuğuna katkı sağlamak.
          </p>
        </div>
        <div className="bg-white shadow-sm rounded-2xl p-6 border">
          <h3 className="text-xl font-bold text-brand-navy mb-3">Vizyonumuz</h3>
          <p className="text-slate-600 leading-relaxed">
            Türkiye’nin endüstriyel veri izleme ve otomasyon alanında güvenilir
            çözüm ortağı ve öncü markası olmak.
          </p>
        </div>
        <div className="bg-white shadow-sm rounded-2xl p-6 border">
          <h3 className="text-xl font-bold text-brand-navy mb-3">Değerlerimiz</h3>
          <ul className="list-disc pl-5 text-slate-600 space-y-2">
            <li>Güvenilirlik: Sahada test edilmiş çözümler</li>
            <li>Şeffaflık: Açık ve dürüst iletişim</li>
            <li>Yenilik: Modern yazılım ve donanım entegrasyonu</li>
            <li>Esneklik: Her ihtiyaca özel çözümler</li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-navy text-white py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            İşletmenizin dijital dönüşümüne değer katmak için buradayız
          </h2>
          <p className="mb-6 text-slate-100">
            VeriSaha Teknoloji, sahada edinilen deneyimi modern yazılım ve
            donanımla birleştirir.
          </p>
          <Link
            href="/iletisim"
            className="inline-block bg-white text-brand-navy font-semibold px-6 py-3 rounded-xl shadow hover:bg-slate-100 transition"
          >
            Bizimle İletişime Geçin
          </Link>
        </div>
      </section>
    </main>
  );
}
