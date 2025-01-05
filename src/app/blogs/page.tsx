import { Calendar } from "lucide-react";
import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";

export default async function Blog() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 p-4">
          Blogs
        </h1>

        {posts && posts.length > 0 ? (
          <div className="space-y-8">
            {posts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className="block">
                <article
                  className="backdrop-blur-lg bg-black/40 rounded-3xl border border-white/10 p-6 hover:scale-[1.02] transition-transform duration-300 cursor-pointer animate-in slide-in-from-bottom"
                  style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="flex items-center gap-4 text-white/60 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{post.frontmatter?.date}</span>
                    </div>
                    <span>•</span>
                    <span>{post.frontmatter?.readTime}</span>
                  </div>

                  <h2 className="text-2xl font-bold mb-3">
                    {post.frontmatter?.title}
                  </h2>
                  <p className="text-white/80 mb-6">
                    {post.frontmatter?.excerpt}
                  </p>

                  {post.frontmatter?.tags &&
                    post.frontmatter.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.frontmatter?.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-white/10 rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-white/60">No blog posts found.</p>
        )}
      </div>
    </div>
  );
}
