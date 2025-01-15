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
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    const todayResponse = await newsapi.v2.topHeadlines({
      category: "technology",
      language: "en", 
      pageSize: 10,
      from: todayStr,
      to: todayStr
    });

    const responseData = {
      today: todayResponse.articles.filter((article: { title: string; description: string; urlToImage: string; }) => 
        article.title && article.description && article.urlToImage
      )
    };

    return new Response(JSON.stringify(responseData), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch news" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}