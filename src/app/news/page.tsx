"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { enIN } from "date-fns/locale";

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
}

// Separate component for the live time display
const LiveTime = () => {
  const [currentTime, setCurrentTime] = useState<string>(
    format(new Date(), "EEEE, MMM d • h:mm a", { locale: enIN })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        format(new Date(), "EEEE, MMM d • h:mm:ss a", { locale: enIN })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <p className="text-base sm:text-lg text-white/60 font-medium group-hover:text-white/80 transition-colors">
      {currentTime}
    </p>
  );
};

export default function RecentNews() {
  const [todayNews, setTodayNews] = useState<NewsArticle[]>([]);
  const [yesterdayNews, setYesterdayNews] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/news", { cache: "no-store" });
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setTodayNews(data.today);
        setYesterdayNews(data.yesterday);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  const NewsSection = ({
    title,
    articles,
  }: {
    title: string;
    articles: NewsArticle[];
  }) => (
    <div className="mb-12">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 pl-4 sm:pl-6">
        {title}
      </h2>
      {articles && articles.length > 0 ? (
        <div className="space-y-8">
          {articles.map((article, index) => (
            <div
              key={index}
              className="group/card relative backdrop-blur-lg bg-gradient-to-br from-black/50 to-black/30 
                rounded-3xl border border-white/10 overflow-hidden 
                transition-all duration-500 hover:border-white/20
                animate-in slide-in-from-bottom hover:scale-[1.02]"
              style={{ animationDelay: `${index * 200}ms` }}>
              <div
                className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent 
                  opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
              />
              <div className="p-4 sm:p-6">
                <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                  {article.urlToImage && (
                    <div className="md:w-1/3 w-full overflow-hidden rounded-lg">
                      <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="w-full h-48 sm:h-56 md:h-48 object-cover transform group-hover/card:scale-110 
                          transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.src =
                            "/images/news/news-placeholder.png";
                        }}
                      />
                    </div>
                  )}
                  <div className="md:w-2/3 w-full flex flex-col">
                    <h2
                      className="text-xl sm:text-2xl font-bold mb-2 bg-clip-text text-transparent 
                      bg-gradient-to-r from-white to-white/70 
                      group-hover/card:to-white transition-all duration-500">
                      {article.title}
                    </h2>
                    <p
                      className="text-sm sm:text-base text-white/70 mb-4 group-hover/card:text-white/90 
                      transition-colors duration-300 flex-grow">
                      {article.description}
                    </p>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 
                        rounded-lg transition-all duration-300
                        bg-white/5 border border-white/10
                        hover:bg-white/10 hover:border-white/20
                        group-hover/card:translate-x-2">
                      Read more
                      <span className="text-lg">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="backdrop-blur-lg bg-gradient-to-br from-black/50 to-black/30 
          rounded-3xl border border-white/10 p-6 
          transition-all duration-500 hover:border-white/20">
          <p className="text-white/60 text-center text-lg">
            News will be available soon...
          </p>
        </div>
      )}
    </div>
  );

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
        <NewsSection title="Yesterday's Top Stories" articles={yesterdayNews} />
      </div>
    </div>
  );
}
