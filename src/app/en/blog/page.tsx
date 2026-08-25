import type { Metadata } from "next";
import Link from "next/link";
import { getBlogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog | VeriSaha Teknoloji",
  description:
    "Articles on industrial data monitoring, flowmeters, remote automation and related technologies.",
};

export default function EnglishBlogPage() {
  const posts = getBlogPosts("en");

  return (
    <main className="bg-white">
      <section className="border-b bg-brand-off">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center md:py-24">
          <h1 className="text-3xl font-bold text-brand-navy md:text-5xl">Blog</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-600">
            Explore technical articles, practical insights and developments in
            industrial measurement, monitoring and automation.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="flex flex-col rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <h2 className="mb-3 text-xl font-bold text-brand-navy">{post.title}</h2>
            <p className="mb-5 flex-1 text-slate-600">{post.excerpt}</p>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-slate-400">{post.readTime}</span>
              <Link
                href={`/en/blog/${post.slug}`}
                className="font-semibold text-brand-teal hover:underline"
              >
                Read More →
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
