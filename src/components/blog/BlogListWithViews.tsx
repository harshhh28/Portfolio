"use client";

import { useEffect, useState } from "react";
import { BlogPostCard } from "./BlogPostCard";
import type { BlogPost } from "@/types";

interface BlogListWithViewsProps {
  posts: BlogPost[];
}

export function BlogListWithViews({ posts }: BlogListWithViewsProps) {
  const [viewsMap, setViewsMap] = useState<Record<string, number> | null>(null);

  useEffect(() => {
    let cancelled = false;

    // Defer so React Strict Mode's double-mount doesn't run this twice (cleanup cancels before this runs)
    const timeoutId = setTimeout(() => {
      fetch("/api/blog/views", { cache: "no-store" })
        .then((res) => (res.ok ? res.json() : {}))
        .then((data: Record<string, number>) => {
          if (!cancelled) setViewsMap(data);
        })
        .catch(() => {
          if (!cancelled) setViewsMap({});
        });
    }, 0);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      {posts.map((post) => (
        <BlogPostCard
          key={post.slug}
          post={post}
          views={viewsMap ? viewsMap[post.slug] ?? 0 : null}
        />
      ))}
    </div>
  );
}
