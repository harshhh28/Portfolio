import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser({
  timeout: 3000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  }
});

const techNewsFeeds = [
  'https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml'
];

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  pubDate: string;
}

async function fetchRSSFeed(feedUrl: string) {
  try {
    const feed = await parser.parseURL(feedUrl);
    return feed.items.map(item => ({
      title: item.title || '',
      description: item.contentSnippet?.slice(0, 200) || '',
      url: item.link || '',
      pubDate: item.pubDate || new Date().toISOString()
    }));
  } catch (error) {
    console.error(`Error fetching RSS feed ${feedUrl}:`, error);
    return [];
  }
}

export async function GET() {
  try {
    const headers = {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
    };

    const articles = await fetchRSSFeed(techNewsFeeds[0]);
    
    if (articles.length === 0) {
      return NextResponse.json({ today: [] });
    }

    const sortedArticles = articles
      .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
      .slice(0, 10);

    return NextResponse.json({
      today: sortedArticles.map(article => ({
        title: article.title,
        description: article.description,
        url: article.url
      }))
    }, { headers });

  } catch (error) {
    console.error('Critical error in news route:', error);
    return new NextResponse(
      JSON.stringify({ 
        error: 'Failed to fetch news',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}