"use client";

import { useEffect, useState } from "react";
import LiveTime from "@/components/LiveTime";
import NewsSection from "@/components/NewsSection";
import { cn } from "@/lib/utils";
import type { NewsArticle } from "@/types";

export default function RecentNews() {
  const [todayNews, setTodayNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<string>("");
  const [currentHour, setCurrentHour] = useState<number>(0);

  // Initialize client-side
  useEffect(() => {
    setCurrentDate(new Date().toISOString().split("T")[0]);
    setCurrentHour(new Date().getHours());
  }, []);

  const fetchNews = async (retryCount = 0): Promise<void> => {
    try {
      const response = await fetch("/api/news", {
        cache: "no-store",
        next: { revalidate: 0 },
      });

      if (!response.ok) {
        if (response.status === 504 && retryCount < 2) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          return fetchNews(retryCount + 1);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data?.today || !Array.isArray(data.today)) {
        throw new Error("Invalid data format received");
      }

      const shuffledNews =
        data.today.length > 0
          ? [...data.today].sort(() => Math.random() - 0.5)
          : [];

      setTodayNews(shuffledNews);
      setError(null);
    } catch (error) {
      console.error("Error fetching news:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch news";
      setError("News service is temporarily unavailable.");
      setTodayNews([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!currentDate) return; 

    // Initial fetch
    fetchNews();

    const checkDateTime = () => {
      const now = new Date();
      const newDate = now.toISOString().split("T")[0];
      const newHour = now.getHours();

      if (newDate !== currentDate) {
        setCurrentDate(newDate);
        setCurrentHour(newHour);
        setTodayNews([]); 
        fetchNews();
      } else if (newHour !== currentHour) {
        setCurrentHour(newHour);
        fetchNews();
      }
    };

    const dateCheckInterval = setInterval(checkDateTime, 60000);
    const newsRefreshInterval = setInterval(fetchNews, 3600000);

    return () => {
      clearInterval(dateCheckInterval);
      clearInterval(newsRefreshInterval);
    };
  }, [currentDate, currentHour]);

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-16">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col gap-4 border-b border-border pb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Latest Tech Headlines
          </h1>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-medium text-emerald-600 dark:text-emerald-500">
                LIVE
              </span>
            </div>
            <span className="bg-border w-px h-4" />
            <LiveTime />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20 text-muted-foreground">
            Loading headlines...
          </div>
        ) : error ? (
            <div className="text-destructive text-center py-10">{error}</div>
        ) : (
          <NewsSection title="This Week's Headlines" articles={todayNews} />
        )}
      </div>
    </div>
  );
}
