"use client";

import type { NewsArticle } from "@/types";

export default function NewsSection({
  title,
  articles,
}: {
  title: string;
  articles: NewsArticle[];
}) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-6 text-foreground">
        {title}
      </h2>
      {articles && articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article, index) => (
            <div
              key={index}
              className="flex flex-col bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-bold mb-3 text-foreground leading-snug">
                {article.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 flex-grow leading-relaxed">
                {article.description}
              </p>
              
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium text-primary hover:underline mt-auto"
              >
                Read more <span className="ml-1" aria-hidden="true">&rarr;</span>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-border rounded-lg p-12 text-center">
            <p className="text-muted-foreground">
                No news available at the moment.
            </p>
        </div>
      )}
    </div>
  );
}
