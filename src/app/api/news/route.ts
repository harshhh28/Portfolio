import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser({
  timeout: 5000,  // 5 second timeout
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  }
});

const techKeywords = [
  'artificial intelligence',
  'machine learning',
  'blockchain',
  'web development',
  'cloud computing',
  'app development',
];

const techNewsFeeds = [
  'https://feeds.feedburner.com/TechCrunch/',
  'https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml',
  'https://feeds.arstechnica.com/arstechnica/technology-lab',
  'https://feeds.feedburner.com/venturebeat/SZYF',
  'https://www.theguardian.com/world/rss',
  'https://www.wired.com/feed/rss',
  'https://feeds.feedburner.com/TheNextWeb',
  'https://www.engadget.com/rss.xml',
  'https://rss.slashdot.org/Slashdot/slashdotMain',
  'https://www.techmeme.com/feed.xml',
];

// Helper function to delay execution
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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

function isRelevantToKeywords(article: any, keywords: string[]): boolean {
  const text = `${article.title} ${article.description}`.toLowerCase();
  return keywords.some(keyword => text.includes(keyword.toLowerCase()));
}

export async function GET() {
  try {
    const headers = {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    };

    // Add timeout promise
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Timeout')), 9000); // 9 second timeout
    });

    // Fetch articles with timeout
    const fetchPromise = Promise.race([
      Promise.all(
        techNewsFeeds.slice(0, 2).map(async (feedUrl) => { // Only fetch 2 feeds at a time
          try {
            const articles = await fetchRSSFeed(feedUrl);
            await delay(500); // Reduce delay between feeds
            return articles;
          } catch (error) {
            console.error(`Error fetching ${feedUrl}:`, error);
            return [];
          }
        })
      ),
      timeoutPromise
    ]) as Promise<Array<Array<any>>>;

    const feedResults = await fetchPromise;
    const allArticles = feedResults.flat();

    // Return results even if partial
    return NextResponse.json({
      today: allArticles.slice(0, 10).map(article => ({
        title: article.title,
        description: article.description,
        url: article.url
      }))
    }, { headers });

  } catch (error) {
    console.error('Error in news route:', error);
    return NextResponse.json({ today: [] });
  }
}