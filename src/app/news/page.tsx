"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import LiveTime from "@/components/LiveTime";
import NewsSection from "@/components/NewsSection";
import { TypeAnimation } from "react-type-animation";

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
    const timestamp = new Date().toISOString();
    console.log(`🔄 Starting news fetch at ${timestamp}`);

    try {
      const response = await fetch("/api/news", {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
        },
        next: { revalidate: 0 },
      });

      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();

      // Validate data structure
      if (!data?.today || !Array.isArray(data.today)) {
        throw new Error("Invalid data format received");
      }

      // Safe array shuffle with fallback
      const shuffledNews =
        data.today.length > 0
          ? [...data.today].sort(() => Math.random() - 0.5)
          : [];

      setTodayNews(shuffledNews);
      console.log(
        `✅ Fetch successful at ${timestamp} - ${shuffledNews.length} articles`
      );
      setError(null);
    } catch (error) {
      console.error("❌ Error fetching news:", error);
      setError(error instanceof Error ? error.message : "Failed to fetch news");
      setTodayNews([]); // Fallback to empty array
    } finally {
      setIsLoading(false);
    }
  };

  // Check for date/hour changes
  useEffect(() => {
    const checkDateTime = () => {
      const now = new Date();
      const newDate = now.toISOString().split("T")[0];
      const newHour = now.getHours();

      if (newDate !== currentDate) {
        console.log("📅 Date changed, refreshing news...");
        setCurrentDate(newDate);
        setCurrentHour(newHour);
        setTodayNews([]); // Clear existing news
        fetchNews();
      } else if (newHour !== currentHour) {
        console.log("🕒 Hour changed, refreshing news...");
        setCurrentHour(newHour);
        fetchNews();
      }
    };

    // Initial fetch
    fetchNews();

    // Check every minute for date/hour changes
    const dateCheckInterval = setInterval(checkDateTime, 60000);

    // Hourly refresh for fresh news
    const newsRefreshInterval = setInterval(fetchNews, 3600000);

    return () => {
      console.log("🛑 Clearing intervals");
      clearInterval(dateCheckInterval);
      clearInterval(newsRefreshInterval);
    };
  }, [currentDate, currentHour]);

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

        {isLoading ? (
          <div
            className="backdrop-blur-lg bg-gradient-to-br from-black/50 to-black/30 
              rounded-3xl border border-white/10 p-6 
              transition-all duration-500 hover:border-white/20">
            <div className="flex flex-col justify-center items-center min-h-[200px] gap-4">
              <TypeAnimation
                sequence={["please wait :)", 1000, ""]}
                wrapper="p"
                speed={50}
                repeat={Infinity}
                className="text-white/60 text-lg"
                cursor={false}
              />
              <div className="loader"></div>
            </div>
          </div>
        ) : (
          <NewsSection title="Today's Headlines" articles={todayNews} />
        )}
      </div>
    </div>
  );
}
