// @ts-ignore
import NewsAPI from 'newsapi';

if (!process.env.NEXT_PUBLIC_NEWS_API_KEY) {
  throw new Error('NEXT_PUBLIC_NEWS_API_KEY environment variable is not set');
}

const newsapi = new NewsAPI(process.env.NEXT_PUBLIC_NEWS_API_KEY);

const techKeywords = [
  'web development',
  'app development',
  'blockchain',
  'cryptocurrency',
  'web3',
  'cloud computing',
  'artificial intelligence',
  'machine learning',
].join(' OR ');

export async function GET() {
  try {
    // Get today's tech news
    const todayResponse = await newsapi.v2.topHeadlines({
      category: "technology",
      language: "en",
      pageSize: 10
    });

    // Get yesterday's tech news
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    const yesterdayResponse = await newsapi.v2.everything({
      q: techKeywords,
      language: 'en',
      from: yesterdayStr,
      to: yesterdayStr,
      sortBy: 'relevancy',
      domains: 'techcrunch.com,thenextweb.com,theverge.com,wired.com,venturebeat.com,dev.to,medium.com'
    });
    return Response.json({
      today: todayResponse.articles.filter((article: { title: string; description: string; urlToImage: string; }) => 
        article.title && article.description && article.urlToImage
      ),
      yesterday: yesterdayResponse.articles
        .filter((article: { title: string; description: string; urlToImage: string; }) => 
          article.title && article.description && article.urlToImage
        )
        .slice(0, 5)
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    return Response.json({ error: "Failed to fetch news" }, { status: 500 });
  }
} 