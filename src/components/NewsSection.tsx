"use client";

interface NewsArticle {
  title: string;
  description: string;
  url: string;
}

export default function NewsSection({
  title,
  articles,
}: {
  title: string;
  articles: NewsArticle[];
}) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 pl-4 sm:pl-6">
        {title}
      </h2>
      {articles && articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article, index) => (
            <div
              key={index}
              className="group/card relative backdrop-blur-lg bg-gradient-to-br from-black/50 to-black/30 
                rounded-3xl border border-white/10
                transition-all duration-500 hover:border-white/20
                animate-in slide-in-from-bottom hover:scale-[1.02]"
              style={{ animationDelay: `${index * 200}ms` }}>
              <div
                className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent 
                  opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
              />
              <div className="p-4 sm:p-6 h-full">
                <div className="flex flex-col gap-4 h-full">
                  <h2
                    className="text-xl sm:text-2xl font-bold mb-2 bg-clip-text text-transparent 
                    bg-gradient-to-r from-white to-white/70 
                    group-hover/card:to-white transition-all duration-500">
                    {article.title}
                  </h2>
                  <p
                    className="text-sm sm:text-base text-white/70 group-hover/card:text-white/90 
                    transition-colors duration-300 flex-grow">
                    {article.description}
                  </p>
                  <div className="relative mt-auto">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/button flex items-center justify-center gap-2 w-full px-3 sm:px-4 py-2 
                        rounded-lg transition-transform duration-300
                        bg-white/5 border border-white/10
                        hover:bg-white/10 hover:border-white/20 hover:translate-x-2">
                      Read more <span className="text-lg">→</span>
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
            News will be available soon
            <div className="flex gap-1 justify-center mt-2">
              <div
                className="w-2 h-2 bg-white/40 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}></div>
              <div
                className="w-2 h-2 bg-white/40 rounded-full animate-bounce"
                style={{ animationDelay: "200ms" }}></div>
              <div
                className="w-2 h-2 bg-white/40 rounded-full animate-bounce"
                style={{ animationDelay: "400ms" }}></div>
            </div>
          </p>
        </div>
      )}
    </div>
  );
}
