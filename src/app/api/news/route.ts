import { NextResponse } from 'next/server';
import Parser from 'rss-parser';
import type { NewsArticle } from '@/types';

const parser = new Parser({
  timeout: 10000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/rss+xml, application/xml, application/atom+xml, text/xml;q=0.9, */*;q=0.8'
  }
});

const techNewsFeeds = [
  'https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml',
  'https://feeds.feedburner.com/TechCrunch/',
  'https://www.theverge.com/rss/index.xml'
];

async function fetchRSSFeed(feedUrl: string) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const feed = await parser.parseURL(feedUrl);
    clearTimeout(timeoutId);
    
    return feed.items.map(item => ({
      title: item.title || '',
      description: item.contentSnippet?.slice(0, 200) || '',
      url: item.link || '',
      pubDate: item.pubDate || new Date().toISOString()
    }));
  } catch (error) {
    console.error(`Error fetching RSS feed ${feedUrl}:`, error);
    return null;
  }
}

export async function GET() {
  try {
    const headers = {
      'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600'
    };

    for (const feedUrl of techNewsFeeds) {
      const articles = await fetchRSSFeed(feedUrl);
      if (articles && articles.length > 0) {
        const sortedArticles = articles
          .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
          .slice(0, 10);

        return NextResponse.json({ today: sortedArticles }, { headers });
      }
    }

    return NextResponse.json({ 
      today: [],
      error: 'Unable to fetch news at this time'
    }, { 
      status: 503,
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json'
      }
    });

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
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        }
      }
    );
  }
}