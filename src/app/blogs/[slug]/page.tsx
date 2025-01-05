import { notFound } from "next/navigation";
import { Calendar } from "lucide-react";
import { getPost, getAllPosts } from "@/lib/mdx";
import { MDXContent } from "@/components/MDXContent";

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
        <article className="backdrop-blur-lg bg-black/40 rounded-3xl border border-white/10 p-8 animate-in slide-in-from-bottom">
          <div className="flex items-center gap-4 text-white/60 mb-6">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{post.frontmatter?.date}</span>
            </div>
            <span>•</span>
            <span>{post.frontmatter?.readTime}</span>
          </div>

          <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            {post.frontmatter?.title}
          </h1>

          {post.frontmatter?.tags && post.frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.frontmatter.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/10 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="prose prose-invert prose-lg max-w-none">
            <MDXContent>{post.content}</MDXContent>
          </div>
        </article>
      </div>
    </div>
  );
}
