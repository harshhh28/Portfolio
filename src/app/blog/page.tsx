"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

interface BlogPost {
  title: string;
  subtitle: string;
  slug: string;
  dateAdded: string;
  readTime: number;
  coverImage: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/blog");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch blog posts");
        }

        setPosts(data);
      } catch (err) {
        setError("Failed to fetch blog posts");
        console.error("Error fetching blog posts:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-lg bg-black/40 rounded-3xl border border-white/10 p-6">
            <p className="text-red-400">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div
          className="backdrop-blur-lg bg-gradient-to-br from-black/50 to-black/30 
            rounded-3xl border border-white/10 p-6 sm:p-8 
            mb-8 animate-in slide-in-from-bottom
            group relative overflow-hidden
            hover:border-white/20 transition-all duration-500">
          <div
            className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent 
              opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
          <div className="relative">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
              My Blog Posts
            </h1>
            <p className="text-sm sm:text-base text-white/60">
              Thoughts, tutorials, and tech insights
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {posts.map((post, index) => (
            <a
              key={post.slug}
              href={`https://blog.harshgajjar.xyz/${post.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group/card relative backdrop-blur-lg bg-gradient-to-br from-black/50 to-black/30 
                rounded-3xl border border-white/10 overflow-hidden
                hover:border-white/20 hover:scale-[1.01] transition-all duration-500
                animate-in slide-in-from-bottom"
              style={{ animationDelay: `${index * 100}ms` }}>
              <div
                className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent 
                  opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
              />

              <div className="relative p-4 sm:p-6">
                {post.coverImage && (
                  <div className="w-full h-48 mb-4 overflow-hidden rounded-xl">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transform group-hover/card:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div>
                  <h2
                    className="text-lg sm:text-xl font-bold mb-2 bg-clip-text text-transparent 
                    bg-gradient-to-r from-white to-white/70 
                    group-hover/card:to-white transition-all duration-500">
                    {post.title}
                  </h2>
                  <p
                    className="text-sm text-white/60 mb-3
                    group-hover/card:text-white/90 transition-colors duration-300">
                    {post.subtitle}
                  </p>
                  <div className="text-xs text-white/40">
                    {new Date(post.dateAdded).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
        <div
          className="mt-8 backdrop-blur-lg bg-gradient-to-br from-black/50 to-black/30 
          rounded-3xl border border-white/10 p-6 
          group relative overflow-hidden text-center
          hover:border-white/20 transition-all duration-500">
          <div
            className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent 
            opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
          <div className="relative">
            <p className="text-white/60 mb-4">
              Follow me on Hashnode for more updates!
            </p>
            <a
              href="https://hashnode.com/@harshgajjar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 
                bg-white/5 rounded-lg border border-white/10
                hover:bg-white/10 hover:border-white/20 hover:translate-x-2
                transition-all duration-300">
              <span className="text-white/80">@harshgajjar</span>
              <span className="text-lg">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
