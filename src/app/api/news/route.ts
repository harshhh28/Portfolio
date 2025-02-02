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
  'https://www.wired.com/feed/rss',
  'https://www.theverge.com/rss/index.xml',
  'https://www.engadget.com/rss.xml',
  'https://www.zdnet.com/news/rss.xml',
  'https://www.techradar.com/rss/news/latest-news',
  'https://techcrunch.com/feed/',
  'https://mashable.com/feeds/rss/all',
  'https://gizmodo.com/feed',
  'https://www.cnet.com/rss/news/',
  'https://feeds.feedburner.com/venturebeat/SZYF',
  'https://technosdata.com/feed/',
  'https://tecuy.com/feed/',
  'https://www.techwrix.com/feed/',
  'https://www.businesstechworld.com/feeds/posts/default',
  'https://ciente.io/feed/',
];

// Helper function to delay execution
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchRSSFeed(feedUrl: string) {
  try {
    const feed = await parser.parseURL(feedUrl);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    return feed.items
      .filter(item => {
        const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();
        return pubDate >= oneWeekAgo;
      })
      .map(item => ({
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
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200' // Cache for 1 hour, stale for 2 hours
    };

    // Fetch articles from all feeds with proper error handling
    const allArticles = [];
    for (const feedUrl of techNewsFeeds) {
      try {
        const articles = await fetchRSSFeed(feedUrl);
        if (articles.length > 0) {
          // Group articles by keyword
          for (const keyword of techKeywords) {
            const keywordArticles = articles
              .filter(article => isRelevantToKeywords(article, [keyword]))
              .slice(0, 3); // Get top 3 articles for this keyword
            
            allArticles.push(...keywordArticles);
          }
        }
      } catch (feedError) {
        console.error(`Failed to process feed ${feedUrl}:`, feedError);
        // Continue with other feeds even if one fails
        continue;
      }
      
      await delay(1000); // Polite delay between feeds
    }

    // Handle case when no articles are found
    if (allArticles.length === 0) {
      console.log('No articles found from any feed');
      return NextResponse.json({ today: [] });
    }

    // Remove duplicates and sort by date
    const uniqueArticles = Array.from(
      new Map(allArticles.map(article => [article.url, article])).values()
    );

    const sortedArticles = uniqueArticles
      .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

    return NextResponse.json({
      today: sortedArticles.map(article => ({
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