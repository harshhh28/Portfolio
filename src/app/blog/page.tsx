import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/mdx";
import { format } from "date-fns";
import { Calendar, Clock, Tag } from "lucide-react";

export const metadata = {
  title: "Blog | Harsh Gajjar",
  description: "Thoughts, tutorials, and insights on software development, architecture, and technology.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-16">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-border pb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Thoughts, tutorials, and insights on software development, architecture, and technology.
          </p>
        </div>

        {/* Blog Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/50"
              >
                {/* Cover Image */}
                {post.coverImage && (
                  <div className="relative h-48 w-full overflow-hidden bg-muted">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="flex flex-col flex-1 p-6 space-y-4">
                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-secondary text-secondary-foreground text-xs font-medium rounded-md"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title and Subtitle */}
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    {post.subtitle && (
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                        {post.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 mt-auto">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={post.dateAdded}>
                        {format(new Date(post.dateAdded), "MMM d, yyyy")}
                      </time>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTimeInMinutes} min read</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-border rounded-lg p-12 text-center">
            <p className="text-muted-foreground">
              No blog posts available yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
