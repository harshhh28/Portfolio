import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getPostBySlug, getPost, getAllPosts } from "@/lib/mdx";
import { MDXContent } from "@/components/blog/MDXContent";
import { BlogViewCount } from "@/components/blog/BlogViewCount";
import { baseOpenGraph, SITE_NAME, TWITTER_HANDLE } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  const description = post.subtitle || post.title;
  const url = `/writing/${slug}`;

  return {
    title: post.title,
    description,
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      ...baseOpenGraph,
      type: "article",
      url,
      title: post.title,
      description,
      publishedTime: post.dateAdded,
      authors: [SITE_NAME],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      creator: TWITTER_HANDLE,
    },
  };
}

export default async function WritingEntryPage({ params }: Params) {
  const { slug } = await params;
  const result = getPost(slug);

  if (!result) {
    notFound();
  }

  const { post, content } = result;
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  const newer = index > 0 ? posts[index - 1] : undefined;
  const older = index >= 0 && index < posts.length - 1 ? posts[index + 1] : undefined;

  return (
    <div className="px-6 pb-24">
      <article className="mx-auto max-w-2xl pt-14">
        <Link
          href="/writing"
          className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft
            className="size-3.5 transition-transform group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
          Writing
        </Link>

        <header className="mt-8 border-b border-border pb-8">
          <h1 className="text-balance text-3xl font-bold tracking-tight">{post.title}</h1>
          {post.subtitle && (
            <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground">
              {post.subtitle}
            </p>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs text-muted-foreground">
            <time dateTime={post.dateAdded}>
              {format(new Date(post.dateAdded), "MMM d, yyyy")}
            </time>
            <span aria-hidden="true">·</span>
            <span>{post.readTimeInMinutes} min read</span>
            <BlogViewCount slug={post.slug} />
          </div>

          {post.tags && post.tags.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-faint">
              {post.tags.map((tag) => (
                <li key={tag}>#{tag}</li>
              ))}
            </ul>
          )}
        </header>

        <div className="mt-10">
          <MDXContent source={content} />
        </div>

        {(newer || older) && (
          <nav
            aria-label="More posts"
            className="mt-16 grid gap-6 border-t border-border pt-8 sm:grid-cols-2"
          >
            {older ? (
              <Link href={`/writing/${older.slug}`} className="group block">
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <ArrowLeft
                    className="size-3 transition-transform group-hover:-translate-x-0.5"
                    aria-hidden="true"
                  />
                  Previous
                </span>
                <span className="mt-1 block text-[15px] font-medium leading-snug transition-colors group-hover:text-primary">
                  {older.title}
                </span>
              </Link>
            ) : (
              <span className="hidden sm:block" />
            )}
            {newer && (
              <Link href={`/writing/${newer.slug}`} className="group block sm:text-right">
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  Next
                  <ArrowRight
                    className="size-3 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
                <span className="mt-1 block text-[15px] font-medium leading-snug transition-colors group-hover:text-primary">
                  {newer.title}
                </span>
              </Link>
            )}
          </nav>
        )}
      </article>
    </div>
  );
}
