"use client";

import { Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { TagFilter } from "@/components/TagFilter";
import Loader from "@/components/Loader";

// Type for the post
interface Post {
  slug: string;
  frontmatter: {
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    tags: string[];
  };
}

export default function Blog() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setPosts(data.posts);
        const tags = Array.from(
          new Set(data.posts.flatMap((post: Post) => post.frontmatter.tags))
        ) as string[];
        setAllTags(tags);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch posts");
        console.error("Error fetching posts:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();

    // Cleanup function
    return () => {
      // Cancel any pending operations if needed
    };
  }, []);

  const handleTagSelect = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredPosts = posts.filter((post) =>
    selectedTags.length === 0
      ? true
      : post.frontmatter.tags.some((tag) => selectedTags.includes(tag))
  );

  if (error) {
    return (
      <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-lg bg-black/40 rounded-3xl border border-red-500/10 p-6 sm:p-8 text-center">
            <p className="text-sm sm:text-base text-red-400">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div
          className="backdrop-blur-lg bg-gradient-to-br from-black/50 to-black/30 
            rounded-3xl border border-white/10 p-6 sm:p-8 mb-8 sm:mb-12
            animate-in slide-in-from-bottom hover:border-white/20 
            transition-all duration-500 group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500">
            My Blogs
          </h1>
          <p className="text-sm sm:text-base text-white/60 mt-3 sm:mt-4 max-w-xl">
            Thoughts, learnings, and experiences shared through words. Dive into
            a collection of insights about technology, development, and
            innovation.
          </p>
        </div>

        <TagFilter
          tags={allTags}
          selectedTags={selectedTags}
          onTagSelect={handleTagSelect}
        />

        {filteredPosts && filteredPosts.length > 0 ? (
          <div className="space-y-4 sm:space-y-8">
            {filteredPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className="block group">
                <article
                  className="relative backdrop-blur-lg bg-gradient-to-br from-black/50 to-black/30 
                    rounded-3xl border border-white/10 p-6 sm:p-8 
                    transition-all duration-500 
                    hover:bg-black/50 hover:border-white/20 hover:scale-[1.02]
                    animate-in slide-in-from-bottom
                    group/card overflow-hidden"
                  style={{ animationDelay: `${index * 200}ms` }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

                  <div className="relative">
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-white/60 mb-4 sm:mb-6">
                      <div className="flex items-center gap-1.5 sm:gap-2 hover:text-white/80 transition-colors">
                        <Calendar
                          size={14}
                          className="sm:w-4 sm:h-4 group-hover/card:text-white/80"
                        />
                        <span className="text-xs sm:text-sm font-medium">
                          {post.frontmatter?.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 hover:text-white/80 transition-colors">
                        <Clock
                          size={14}
                          className="sm:w-4 sm:h-4 group-hover/card:text-white/80"
                        />
                        <span className="text-xs sm:text-sm font-medium">
                          {post.frontmatter?.readTime}
                        </span>
                      </div>
                    </div>

                    <h2
                      className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r 
                      from-white to-white/70 group-hover/card:to-white transition-all duration-500">
                      {post.frontmatter?.title}
                    </h2>

                    <p className="text-sm sm:text-base text-white/70 mb-4 sm:mb-6 line-clamp-2 group-hover/card:text-white/90 transition-colors duration-500">
                      {post.frontmatter?.excerpt}
                    </p>

                    {post.frontmatter?.tags &&
                      post.frontmatter.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {post.frontmatter?.tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white/5 border border-white/10 rounded-full text-xs sm:text-sm
                              group-hover/card:bg-white/10 group-hover/card:border-white/20 
                              transition-all duration-300 hover:scale-105">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="backdrop-blur-lg bg-black/40 rounded-3xl border border-white/10 p-6 sm:p-8 text-center">
            <p className="text-sm sm:text-base text-white/60">
              No blog posts found :(
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
