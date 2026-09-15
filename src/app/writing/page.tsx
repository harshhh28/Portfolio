import type { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import { PostList } from "@/components/blog/PostList";
import { baseOpenGraph } from "@/lib/site";

const description = "Engineering notes, tutorials, and deep dives.";

export const metadata: Metadata = {
  title: "Writing",
  description,
  alternates: { canonical: "/writing" },
  openGraph: { ...baseOpenGraph, url: "/writing", title: "Writing | Harsh Gajjar", description },
};

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-6 pb-20">
      <header className="pb-8 pt-14">
        <h1 className="text-[17px] font-semibold">Writing</h1>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </header>

      {posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <p className="py-10 text-sm text-muted-foreground">
          Nothing published yet. Check back soon.
        </p>
      )}
    </div>
  );
}
