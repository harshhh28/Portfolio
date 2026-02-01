import { getAllPosts } from "@/lib/mdx";
import { BlogListWithViews } from "@/components/blog/BlogListWithViews";

export const metadata = {
  title: "Blog | Harsh Gajjar",
  description: "Thoughts, tutorials, and insights on software development, architecture, and technology.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-16">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header removed for minimalist view */}

        {/* Blog Posts Grid */}
        {posts.length > 0 ? (
          <BlogListWithViews posts={posts} />
        ) : (
          <div className="border border-dashed border-border/40 rounded-lg p-8 text-center bg-muted/30">
            <p className="text-sm text-muted-foreground">
              No blog posts available yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
