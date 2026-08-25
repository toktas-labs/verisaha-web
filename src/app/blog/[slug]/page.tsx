import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostPage from "@/components/blog-post-page";
import { getBlogPost, getBlogPosts } from "@/lib/blog-posts";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getBlogPosts("tr").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost("tr", slug);

  if (!post) return {};

  return {
    title: `${post.title} | VeriSaha Teknoloji`,
    description: post.description,
  };
}

export default async function TurkishBlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost("tr", slug);

  if (!post) notFound();

  return <BlogPostPage post={post} />;
}
