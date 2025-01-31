import { NextResponse } from 'next/server';

const techKeywords = [
  'artificial intelligence',
  'machine learning',
  'blockchain',
  'web development',
  'cloud computing',
  'app development',
];

// Helper function to delay execution
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchGNews(keyword: string) {
  try {
    const response = await fetch(
      `https://gnews.io/api/v4/search?` +
      `q=${encodeURIComponent(keyword)}` +
      `&lang=en` +
      `&country=us` +
      `&max=3` +
      `&apikey=${process.env.GNEWS_API_KEY}`,
      { 
        next: { revalidate: 7200 }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return data.articles.map((item: any) => ({
      title: item.title || '',
      description: item.description || '',
      url: item.url || '',
      urlToImage: item.image || '/images/news/news-placeholder.png',
      pubDate: item.publishedAt || new Date().toISOString()
    }));

  } catch (error) {
    console.error(`Error fetching news for ${keyword}:`, error);
    return [];
  }
}

export async function GET() {
  if (!process.env.GNEWS_API_KEY) {
    console.error('GNEWS_API_KEY is not set');
    return NextResponse.json({ today: [] });
  }

  try {
    // Stronger caching headers for production
    const headers = {
      'Cache-Control': 'public, s-maxage=7200, stale-while-revalidate=86400'
    };

    // Fetch articles sequentially to avoid rate limits
    const allArticles = [];
    for (const keyword of techKeywords) {
      const articles = await fetchGNews(keyword);
      allArticles.push(...articles);
      await delay(1000); // Wait 1 second between keywords
    }

    const uniqueArticles = Array.from(new Map(allArticles.map(article => 
      [article.url, article]
    )).values());

    const sortedArticles = uniqueArticles
      .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
      .slice(0, 10);

    return NextResponse.json({
      today: sortedArticles.map(article => ({
        title: article.title,
        description: article.description,
        url: article.url,
        urlToImage: article.urlToImage
      }))
    }, { headers });

  } catch (error) {
    console.error('Error in news route:', error);
    return NextResponse.json({ today: [] });
  }
}