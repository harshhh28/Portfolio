import Link from "next/link";
import { format } from "date-fns";
import type { BlogPost } from "@/types";

interface PostListProps {
  posts: BlogPost[];
}

export const PostList = ({ posts }: PostListProps) => {
  return (
    <ul>
      {posts.map((post) => (
        <li
          key={post.slug}
          className="border-t border-border first:border-t-0 [&:first-child>a]:pt-0 [&:last-child>a]:pb-0"
        >
          <Link
            href={`/writing/${post.slug}`}
            className="group flex flex-col justify-between gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-4"
          >
            <span className="text-[15px] text-foreground transition-colors group-hover:text-primary">
              <span className="border-b border-transparent transition-colors group-hover:border-primary">
                {post.title}
              </span>
            </span>
            <time
              dateTime={post.dateAdded}
              className="shrink-0 whitespace-nowrap font-mono text-xs text-faint"
            >
              {format(new Date(post.dateAdded), "MMM yyyy")}
            </time>
          </Link>
        </li>
      ))}
    </ul>
  );
};
