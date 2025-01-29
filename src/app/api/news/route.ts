// @ts-ignore
if (!process.env.NEXT_PUBLIC_NEWS_API_KEY) {
  throw new Error('NEXT_PUBLIC_NEWS_API_KEY environment variable is not set');
}

interface NewsArticle {
  title?: string;
  description?: string;
  link?: string;
  image_url?: string;
}

const techKeywords = [
  'ai agents',
  'web development',
  'cloud computing',
  'blockchain',
  'cryptocurrency',
  'machine learning',
  'web3',
  'artificial intelligence',
  'app development',
];

const searchQuery = techKeywords.map(keyword => `"${keyword}"`).join(' OR ');

export async function GET() {
  try {
    const response = await fetch(
      `https://newsdata.io/api/1/news?apikey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}&language=en&category=technology&size=10&q=${encodeURIComponent(searchQuery)}`,
      {
        headers: {
          'Accept': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`API returned status: ${response.status}`);
    }

    const data = await response.json();

    interface TransformedData {
      today: Array<{
        title: string;
        description: string;
        url: string;
        urlToImage: string;
      }>;
    }

    if (!data?.results || !Array.isArray(data.results)) {
      throw new Error('Invalid API response format');
    }

    // Transform API data to match frontend interface
    const transformedData: TransformedData = {
      today: data.results.map((article: NewsArticle) => ({
        title: article.title || 'Breaking Tech News',
        description: article.description || 'Click below to read more!',
        url: article.link || 'https://www.bbc.com/',
        urlToImage: article.image_url || '/images/news/news-placeholder.png'
      })).filter((article: { title: string; url: string }) => article.title && article.url)
    };

    return new Response(JSON.stringify(transformedData), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error fetching news:', error);
    return new Response(JSON.stringify({
      today: []
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}