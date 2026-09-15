import { renderOgImage, ogSize } from "@/lib/og";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";

export const alt = "Article by Harsh Gajjar";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return renderOgImage({
    eyebrow: "Writing",
    title: post?.title ?? "Writing",
    subtitle: post?.subtitle || undefined,
  });
}
