"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import LiveTime from "@/components/LiveTime";
import NewsSection from "@/components/NewsSection";

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
}

export default function RecentNews() {
  const [todayNews, setTodayNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [currentHour, setCurrentHour] = useState<number>(new Date().getHours());

  const fetchNews = async () => {
    const newDate = new Date().toISOString().split("T")[0];
    const newHour = new Date().getHours();
    const timestamp = new Date().toISOString();

    // Check if date or hour has changed
    if (newDate !== currentDate || newHour !== currentHour) {
      setCurrentDate(newDate);
      setCurrentHour(newHour);
      setTodayNews([]); // This clears existing news before new fetch
    }

    console.log(`🔄 Starting news fetch at ${timestamp}`);
    try {
      const response = await fetch("/api/news", {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();

      const shuffledNews = data.today.sort(() => Math.random() - 0.5);

      setTodayNews(shuffledNews);
      console.log(
        `✅ Fetch successful at ${timestamp} - ${data.today.length} articles`
      );
      setError(null);
    } catch (error) {
      console.error("❌ Error fetching news:", error);
      setError("Failed to fetch news");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();

    const intervalId = setInterval(() => {
      fetchNews();
    }, 3600000);

    return () => {
      console.log("🛑 Clearing news fetch interval");
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array means this runs once on mount

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen pt-16 sm:pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div
          className="backdrop-blur-lg bg-gradient-to-br from-black/50 to-black/30 
              rounded-3xl border border-white/10 p-6 sm:p-8 
              mb-8 sm:mb-12 mt-8 sm:mt-0
              animate-in slide-in-from-bottom
              group relative overflow-hidden
              hover:border-white/20 transition-all duration-500">
          <div
            className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent 
                opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />

          <div className="relative">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
              Latest Tech Headlines
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-emerald-500 text-sm sm:text-base font-medium">
                  LIVE
                </span>
              </div>
              <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-white/20" />
              <LiveTime />
            </div>
          </div>
        </div>

        <NewsSection title="Today's Headlines" articles={todayNews} />
      </div>
    </div>
  );
}
