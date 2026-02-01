"use client";

import Link from "next/link";
import { format } from "date-fns";
import { BlogPost } from "@/types";

interface ResearchLogProps {
  posts: BlogPost[];
}

export const ResearchLog = ({ posts }: ResearchLogProps) => {
  return (
    <div className="font-mono text-sm">
      {/* Table Header */}
      <div className="hidden md:grid grid-cols-12 gap-4 border-b border-border pb-2 mb-4 text-muted-foreground text-xs uppercase tracking-wider">
        <div className="col-span-2">Permissions</div>
        <div className="col-span-2">Date</div>
        <div className="col-span-1">User</div>
        <div className="col-span-5">Title / Subject</div>
        <div className="col-span-2 text-right">Size</div>
      </div>

      {/* Directory Listing */}
      <div className="space-y-1">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/logs/${post.slug}`}
            className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 py-2 px-2 -mx-2 hover:bg-secondary/50 rounded-sm transition-colors group items-center"
          >
            {/* Mobile View: Stacked */}
            <div className="md:hidden flex flex-col gap-1 w-full">
               <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{format(new Date(post.dateAdded), "MMM dd")}</span>
                  <span>{post.readTimeInMinutes} KB</span>
               </div>
               <span className="text-foreground font-medium group-hover:text-primary transition-colors">
                  {post.title}
               </span>
            </div>

            {/* Desktop View: Table */}
            <div className="hidden md:block col-span-2 text-muted-foreground text-xs">
              -rw-r--r--
            </div>
            <div className="hidden md:block col-span-2 text-muted-foreground text-xs">
              {format(new Date(post.dateAdded), "MMM dd HH:mm")}
            </div>
            <div className="hidden md:block col-span-1 text-yellow-500/80 text-xs">
              root
            </div>
            <div className="hidden md:block col-span-5 text-foreground group-hover:text-primary transition-colors truncate">
              {post.title}
            </div>
            <div className="hidden md:block col-span-2 text-right text-muted-foreground text-xs">
              {post.readTimeInMinutes} KB
            </div>
          </Link>
        ))}
        
        {/* Footer info line */}
        <div className="pt-4 text-xs text-muted-foreground border-t border-border mt-4">
           Total {posts.length} files
        </div>
      </div>
    </div>
  );
};
