import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | VeriSaha Teknoloji",
  description:
    "VeriSaha Teknoloji provides reliable industrial measurement, monitoring and automation solutions.",
};

export default function AboutPage() {
  return (
    <main className="bg-white">
      <section className="border-b bg-brand-off">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-brand-navy">About Us</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            VeriSaha Teknoloji was founded to deliver reliable and innovative solutions in industrial measurement, monitoring and automation.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative w-full h-80 md:h-[420px]">
          <Image
            src="/hakkimizda-photo.jpg"
            alt="VeriSaha Teknoloji founder"
            fill
            className="object-cover rounded-2xl shadow"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-brand-navy mb-4">Our Story</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Our Antalya-born founder graduated from <strong>Yıldız Technical University, Mechatronics Engineering</strong>. After graduation, he worked at <strong>Sesinoks</strong> and <strong>KROHNE</strong>, taking an active role in industrial measurement instruments, system design and automation projects.
          </p>
          <p className="text-slate-600 leading-relaxed">
            In 2025, he brought his field experience and software development expertise together under <strong>VeriSaha Teknoloji</strong>. Today, our goal is to help businesses manage their data accurately, reliably and clearly.
          </p>
        </div>
      </section>

      <section className="bg-brand-off py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-brand-navy text-center mb-12">Our Areas of Expertise</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "C# & MySQL Data Monitoring Software",
              "PLC & SCADA Integration",
              "Flowmeters & Flow Measurement Systems",
              "Batch Control and Reporting",
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

      <section className="mx-auto max-w-6xl px-4 py-16 grid md:grid-cols-3 gap-8">
        <div className="bg-white shadow-sm rounded-2xl p-6 border">
          <h3 className="text-xl font-bold text-brand-navy mb-3">Our Mission</h3>
          <p className="text-slate-600 leading-relaxed">
            To make industrial data clear, reliable and accessible, helping businesses advance their digital transformation.
          </p>
        </div>
        <div className="bg-white shadow-sm rounded-2xl p-6 border">
          <h3 className="text-xl font-bold text-brand-navy mb-3">Our Vision</h3>
          <p className="text-slate-600 leading-relaxed">
            To become a trusted solution partner and a leading brand in industrial data monitoring and automation in Türkiye.
          </p>
        </div>
        <div className="bg-white shadow-sm rounded-2xl p-6 border">
          <h3 className="text-xl font-bold text-brand-navy mb-3">Our Values</h3>
          <ul className="list-disc pl-5 text-slate-600 space-y-2">
            <li>Reliability: Field-tested solutions</li>
            <li>Transparency: Open and honest communication</li>
            <li>Innovation: Modern software and hardware integration</li>
            <li>Flexibility: Solutions tailored to each requirement</li>
          </ul>
        </div>
      </section>

      <section className="bg-brand-navy text-white py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            We are here to add value to your digital transformation
          </h2>
          <p className="mb-6 text-slate-100">
            VeriSaha Teknoloji combines field experience with modern software and hardware.
          </p>
          <Link
            href="/en/contact"
            className="inline-block bg-white text-brand-navy font-semibold px-6 py-3 rounded-xl shadow hover:bg-slate-100 transition"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
