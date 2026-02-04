import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { getPostBySlug, getPost, getAllPosts } from "@/lib/mdx";
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

  const customOgImageName = `${slug}.webp`;
  const publicOgPath = path.join(process.cwd(), "public", "assets", "images", "og", customOgImageName);
  
  const siteUrl = "https://harshgajjar.dev";
  let ogImageUrl = `${siteUrl}/assets/images/og/logs.webp`;

  if (fs.existsSync(publicOgPath)) {
    ogImageUrl = `${siteUrl}/assets/images/og/${slug}.webp?ts=${post.dateAdded}`;
  }

  return {
    title: `${post.title} | Harsh Gajjar`,
    description: post.subtitle || post.title,
    keywords: post.tags ? `Harsh Gajjar, software engineer, ${post.tags.join(", ")}` : "Harsh Gajjar, software engineer, blog",
    openGraph: {
      title: `${post.title} | Harsh Gajjar`,
      description: post.subtitle || post.title,
      url: `https://harshgajjar.dev/logs/${slug}`,
      siteName: "Harsh Gajjar",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
      publishedTime: post.dateAdded,
      authors: ["Harsh Gajjar"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Harsh Gajjar`,
      description: post.subtitle || post.title,
      images: [ogImageUrl],
      creator: "@harshgajjar_28",
    },
  };
}

export default async function LogEntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = getPost(slug);

  if (!result) {
    notFound();
  }

  const { post, content } = result;

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-32">
      <article className="max-w-3xl mx-auto">
        {/* Navigation / Context */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-muted-foreground mb-8 sm:mb-12 border-b border-border pb-4 gap-4 sm:gap-0">
            <Link href="/logs" className="hover:text-foreground transition-colors flex items-center gap-2">
                <span>←</span>
                <span>/logs</span>
            </Link>
            <div className="flex gap-2 sm:gap-4 overflow-x-auto max-w-full">
                <span className="truncate max-w-[200px]">{slug}.md</span>
                <span className="opacity-50">|</span>
                <span className="whitespace-nowrap">{format(new Date(post.dateAdded), "dd-MM-yyyy")}</span>
            </div>
        </div>

        {/* Minimal Header */}
        <header className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-sans mb-4">
            {post.title}
          </h1>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-xs font-mono text-muted-foreground">
             <div className="w-fit">
                <span className="px-1.5 py-0.5 bg-secondary rounded-sm text-secondary-foreground whitespace-nowrap">
                    {post.readTimeInMinutes} min read
                </span>
             </div>
             
             {post.tags && post.tags.length > 0 && (
                 <div className="flex flex-wrap gap-2">
                     {post.tags.map(tag => (
                         <span key={tag} className="whitespace-nowrap">#{tag}</span>
                     ))}
                 </div>
             )}
             
             <div className="sm:ml-auto w-fit">
                <BlogViewCount slug={post.slug} />
             </div>
          </div>
        </header>

        {/* Content - "Clean Documentation" Style */}
        <div className="prose prose-sm dark:prose-invert max-w-none 
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
            prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
            prose-p:text-[0.875rem] prose-p:leading-relaxed prose-p:my-3 text-muted-foreground/90
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:underline-offset-2
            prose-li:text-muted-foreground prose-li:my-1
            prose-code:font-mono prose-code:text-xs prose-code:bg-secondary/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-sm prose-code:before:content-none prose-code:after:content-none prose-code:text-foreground
            prose-pre:bg-secondary/10 prose-pre:border prose-pre:border-border/50 prose-pre:p-4 prose-pre:rounded-sm prose-pre:my-6
            prose-blockquote:border-l-2 prose-blockquote:border-primary/40 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground/80
            ">
          <MDXContent source={content} />
        </div>

        {/* Footer / EOF */}
        <div className="mt-20 border-t border-border pt-8 text-center">
           <p className="text-xs font-mono text-muted-foreground">
             End of file.
           </p>
        </div>
      </article>
    </div>
  );
}
