import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { getPost, getAllPosts } from "@/lib/mdx";
import { MDXContent } from "@/components/MDXContent";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white/90 
            transition-colors duration-300 mb-6 group">
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform duration-300"
          />
          Back to Blogs
        </Link>

        <article
          className="relative backdrop-blur-lg bg-gradient-to-br from-black/50 to-black/30 
          rounded-3xl border border-white/10 p-8 animate-in slide-in-from-bottom
          group overflow-hidden">
          {/* Gradient overlay effect */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent 
            opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />

          <div className="relative">
            {/* Meta information */}
            <div className="flex flex-wrap items-center gap-4 text-white/60 mb-8">
              <div className="flex items-center gap-2 hover:text-white/80 transition-colors">
                <Calendar size={16} className="group-hover:text-white/80" />
                <span className="text-sm font-medium">
                  {post.frontmatter?.date}
                </span>
              </div>
              <span className="text-white/30">•</span>
              <div className="flex items-center gap-2 hover:text-white/80 transition-colors">
                <Clock size={16} className="group-hover:text-white/80" />
                <span className="text-sm font-medium">
                  {post.frontmatter?.readTime}
                </span>
              </div>
            </div>

            {/* Title with enhanced gradient */}
            <h1
              className="text-4xl font-bold mb-8 bg-clip-text text-transparent 
              bg-gradient-to-r from-white via-white to-gray-500
              group-hover:to-white transition-all duration-500">
              {post.frontmatter?.title}
            </h1>

            {/* Tags with hover effects */}
            {post.frontmatter?.tags && post.frontmatter.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.frontmatter.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm
                      hover:bg-white/10 hover:border-white/20 hover:scale-105 
                      transition-all duration-300">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Content with improved typography */}
            <div
              className="prose prose-invert prose-lg max-w-none
              prose-headings:text-white/90 prose-p:text-white/70 
              prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300
              prose-strong:text-white/90 prose-code:text-blue-300
              prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10
              prose-img:rounded-xl prose-img:shadow-lg">
              <MDXContent>{post.content}</MDXContent>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
