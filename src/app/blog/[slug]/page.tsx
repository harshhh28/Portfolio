import { notFound } from "next/navigation";

import Link from "next/link";
import { format } from "date-fns";
import { Calendar, Clock, Tag, ArrowLeft } from "lucide-react";
import { getPostBySlug, getPostContent, getAllPosts } from "@/lib/mdx";
import { MDXContent } from "@/components/blog/MDXContent";
import { BlogViewCount } from "@/components/blog/BlogViewCount";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Harsh Gajjar's Blog`,
    description: post.subtitle || post.title,
    openGraph: {
      title: post.title,
      description: post.subtitle || post.title,

    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const content = post ? getPostContent(slug) : null;

  if (!post || !content) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-16">
      <article className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="space-y-4 mb-8">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-secondary/50 text-secondary-foreground text-[10px] font-medium rounded-md border border-transparent"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
            {post.title}
          </h1>

          {/* Subtitle */}
          {post.subtitle && (
            <p className="text-lg text-muted-foreground leading-relaxed">
              {post.subtitle}
            </p>
          )}

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border/40">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime={post.dateAdded}>
                {format(new Date(post.dateAdded), "MMMM d, yyyy")}
              </time>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTimeInMinutes} min read</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BlogViewCount slug={post.slug} />
            </div>
            {post.author && (
              <div className="flex items-center gap-1.5">
                <span>By {post.author}</span>
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-base dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-xl prose-h3:text-lg prose-p:text-foreground/90 prose-p:leading-7 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border/40">
          <MDXContent source={content} />
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-border/40 space-y-4">
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground italic">Have a good day :)</p>
            <p className="text-xs text-muted-foreground">
              Follow my socials for more such articles:{" "}
              <a
                href="https://x.com/harshgajjar_28"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline font-medium transition-colors"
              >
                X
              </a>
              ,{" "}
              <a
                href="https://www.linkedin.com/in/harsh-gajjar-936536209"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline font-medium transition-colors"
              >
                LinkedIn
              </a>{" "}
              and{" "}
              <a
                href="https://github.com/harshhh28"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:underline font-medium transition-colors"
              >
                GitHub
              </a>
              .
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-medium text-primary hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to all posts
          </Link>
        </footer>
      </article>
    </div>
  );
}
