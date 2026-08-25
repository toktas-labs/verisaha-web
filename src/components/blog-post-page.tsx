import Link from "next/link";
import type { BlogPost } from "@/lib/blog-posts";

type Props = {
  post: BlogPost;
};

export default function BlogPostPage({ post }: Props) {
  const en = post.locale === "en";
  const blogHref = en ? "/en/blog" : "/blog";
  const contactHref = en ? "/en/contact" : "/iletisim";

  return (
    <main className="bg-white">
      <article>
        <header className="border-b bg-brand-off">
          <div className="mx-auto max-w-4xl px-4 py-14 md:py-20">
            <Link
              href={blogHref}
              className="text-sm font-semibold text-brand-teal hover:underline"
            >
              {en ? "← Back to Blog" : "← Blog'a Dön"}
            </Link>

            <h1 className="mt-5 text-3xl font-bold leading-tight text-brand-navy md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              {post.excerpt}
            </p>
            <p className="mt-4 text-sm text-slate-500">{post.readTime}</p>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
          <div className="space-y-12">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-bold text-brand-navy md:text-3xl">
                  {section.heading}
                </h2>

                <div className="mt-4 space-y-4 text-base leading-8 text-slate-700 md:text-lg">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                {section.bullets && (
                  <ul className="mt-5 space-y-3 pl-6 text-base leading-7 text-slate-700 md:text-lg">
                    {section.bullets.map((item) => (
                      <li key={item} className="list-disc pl-1">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div className="mt-14 rounded-2xl border bg-brand-off p-6 md:p-8">
            <h2 className="text-xl font-bold text-brand-navy">
              {en ? "Need support for your project?" : "Projeniz için desteğe mi ihtiyacınız var?"}
            </h2>
            <p className="mt-2 max-w-2xl text-slate-600">
              {en
                ? "Contact VeriSaha for industrial measurement, monitoring, automation and data integration projects."
                : "Endüstriyel ölçüm, izleme, otomasyon ve veri entegrasyonu projeleriniz için VeriSaha ile iletişime geçebilirsiniz."}
            </p>
            <Link
              href={contactHref}
              className="mt-5 inline-flex rounded-full border border-brand-teal px-5 py-2.5 text-sm font-semibold text-brand-navy transition hover:bg-brand-teal hover:text-white"
            >
              {en ? "Contact Us →" : "İletişim Kur →"}
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
