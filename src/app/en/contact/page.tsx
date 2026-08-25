import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, Linkedin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ContactForm from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact | VeriSaha Teknoloji",
  description: "Contact VeriSaha Teknoloji for industrial monitoring, automation and reporting solutions.",
};

export default function EnglishContactPage() {
  return (
    <main className="bg-white">
      <section className="border-b bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-navy">Contact</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Tell us about your measurement monitoring, automation or reporting requirements. Our team will get back to you as soon as possible.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14 grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>VeriSaha Head Office</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 text-brand-navy" />
                  <div>
                    <p className="font-semibold">VeriSaha Teknoloji San. ve Tic. Ltd. Şti</p>
                    <p className="text-slate-600">
                      Yeniköy Mh. 658 Sk. H Blok No:3 Dükkan 12 <br />
                      Döşemealtı - Antalya / TÜRKİYE
                    </p>
                    <p className="mt-2">
                      <Link
                        href="https://maps.app.goo.gl/G3wzLjZ9jQ2hFFsr7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-teal hover:underline text-sm font-medium"
                      >
                        📍 View on Google Maps
                      </Link>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="mt-3 h-5 w-5 text-brand-navy" />
                  <div>
                    <p className="mt-2">
                      <Link href="mailto:info@verisaha.com" className="font-medium hover:underline">
                        info@verisaha.com
                      </Link>
                    </p>
                    <p className="text-slate-600">Quotations & general inquiries</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="mt-3 h-5 w-5 text-brand-navy" />
                  <div>
                    <p className="mt-2">
                      <Link href="tel:+905446614303" className="font-medium hover:underline">
                        +90 544 661 43 03
                      </Link>
                    </p>
                    <p className="text-slate-600">Support for 24/7 live data monitoring systems</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="mt-3 h-5 w-5 text-brand-navy" />
                  <div>
                    <p className="mt-2 font-medium">Business Hours</p>
                    <p className="text-slate-600">Weekdays 09:00–18:00 (Türkiye time)</p>
                  </div>
                </div>

                <div className="pt-6">
                  <p className="text-sm text-slate-500 mb-2">Follow us</p>
                  <div className="flex items-center gap-3">
                    <Link
                      href="https://www.linkedin.com/company/verisaha-teknoloji/"
                      className="inline-flex rounded-full p-2 hover:bg-slate-100"
                      aria-label="LinkedIn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <ContactForm locale="en" />
          </div>
        </div>
      </section>
    </main>
  );
}
