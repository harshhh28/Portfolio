"use client";

import Link from "next/link";
import { format } from "date-fns";
import { Calendar, Clock, Tag, ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/types";

interface BlogPostCardProps {
  post: BlogPost;
  views: number | null;
}

export function BlogPostCard({ post, views }: BlogPostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors border-b border-border/40 last:border-0"
    >
      <div className="space-y-1.5 flex-1">
        <h2 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
          {post.title}
        </h2>
        {post.subtitle && (
          <p className="text-sm text-muted-foreground line-clamp-1">
            {post.subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3 text-xs text-muted-foreground whitespace-nowrap sm:text-right">
        <div className="flex items-center gap-1.5">
          <time dateTime={post.dateAdded}>
            {format(new Date(post.dateAdded), "MMM d, yyyy")}
          </time>
        </div>
        <span>•</span>
        <div className="flex items-center gap-1.5">
          <span>{post.readTimeInMinutes} min</span>
        </div>
        <span>•</span>
        <div className="flex items-center gap-1.5">
          <span>{views !== null ? views.toLocaleString() : "—"} views</span>
        </div>
      </div>
    </Link>
  );
}
