// src/app/blog/page.tsx

import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | VeriSaha Teknoloji",
  description:
    "Endüstriyel veri izleme, debimetreler, uzaktan otomasyon ve daha fazlası hakkında güncel içerikler.",
};

const posts = [
  {
    title: "Endüstriyel Veri İzlemenin Önemi",
    excerpt:
      "Üretim süreçlerinde akış, sıcaklık, seviye ve basınç gibi parametrelerin sürekli izlenmesi, işletmelerin güvenliği ve verimliliği için kritik öneme sahiptir. Peki neden bu kadar önemli?",
    slug: "endustriyel-veri-izlemenin-onemi",
  },
  {
    title: "Debimetre Çeşitleri ve Uygulama Alanları",
    excerpt:
      "Manyetik, ultrasonik ve Coriolis debimetreler hangi sektörlerde tercih edilir? Doğru seçim üretim hattınızda nasıl fark yaratır?",
    slug: "debimetre-cesitleri-ve-uygulama-alanlari",
  },
  {
    title: "Uzaktan İzleme ve Otomasyonun Geleceği",
    excerpt:
      "IoT, bulut ve mobil çözümler sayesinde endüstriyel otomasyon gelecekte nasıl şekillenecek? İşletmeler için fırsatlar neler?",
    slug: "uzaktan-izleme-ve-otomasyonun-gelecegi",
  },
];

export default function BlogPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="border-b bg-brand-off">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-brand-navy">
            Blog
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            Endüstriyel ölçüm, izleme ve otomasyon dünyasındaki son gelişmeleri, 
            ipuçlarını ve teknik yazıları burada bulabilirsiniz.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="mx-auto max-w-6xl px-4 py-16 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="p-6 bg-white rounded-2xl shadow-sm border hover:shadow-md transition"
          >
            <h2 className="text-xl font-bold text-brand-navy mb-3">
              {post.title}
            </h2>
            <p className="text-slate-600 mb-4">{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="text-brand-teal font-semibold hover:underline"
            >
              Devamını Oku →
            </Link>
          </div>
        ))}
      </section>
    </main>
  );
}
