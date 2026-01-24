import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Calendar, Clock, Tag, ArrowLeft } from "lucide-react";
import { getPostBySlug, getPostContent, getAllPosts } from "@/lib/mdx";
import { MDXContent } from "@/components/blog/MDXContent";

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
      images: post.coverImage ? [post.coverImage] : [],
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
      <article className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="space-y-6 mb-12">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-secondary text-secondary-foreground text-sm font-medium rounded-md"
                >
                  <Tag className="w-3.5 h-3.5" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            {post.title}
          </h1>

          {/* Subtitle */}
          {post.subtitle && (
            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.subtitle}
            </p>
          )}

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.dateAdded}>
                {format(new Date(post.dateAdded), "MMMM d, yyyy")}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTimeInMinutes} min read</span>
            </div>
            {post.author && (
              <div className="flex items-center gap-2">
                <span>By {post.author}</span>
              </div>
            )}
          </div>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden border border-border mt-8">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </header>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <MDXContent source={content} />
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all posts
          </Link>
        </footer>
      </article>
    </div>
  );
}
