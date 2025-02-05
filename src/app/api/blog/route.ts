import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://gql.hashnode.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.HASHNODE_TOKEN}`
      },
      body: JSON.stringify({
        query: `
          {
            publication(host: "blog.harshgajjar.xyz") {
              posts(first: 10) {
                edges {
                  node {
                    title
                    brief
                    slug
                    publishedAt
                    coverImage {
                      url
                    }
                  }
                }
              }
            }
          }
        `
      }),
    });

    const data = await response.json();
    console.log('API Response:', data); // For debugging
    
    if (!data.data?.publication?.posts?.edges) {
      throw new Error('Invalid response format');
    }
    
    const posts = data.data.publication.posts.edges.map(({ node }: any) => ({
      title: node.title,
      brief: node.brief,
      slug: node.slug,
      dateAdded: node.publishedAt,
      coverImage: node.coverImage?.url || ''
    }));
    
    return NextResponse.json(posts, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
      }
    });
  } catch (error) {
    console.error('Blog fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
} 