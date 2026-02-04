import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from '@/types';
import { cache } from 'react';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs.readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

export const getPost = cache((slug: string) => {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Parse date: support DD-MM-YYYY or standard YYYY-MM-DD
    let dateAddedStr = data.date || new Date().toISOString();
    
    // Check if date is in DD-MM-YYYY format (e.g. 01-02-2026)
    const ddmmyyyyRegex = /^(\d{2})-(\d{2})-(\d{4})$/;
    const match = dateAddedStr.match(ddmmyyyyRegex);
    if (match) {
      // Convert to YYYY-MM-DD for Date parsing
      const [, day, month, year] = match;
      dateAddedStr = `${year}-${month}-${day}`;
    }

    // Calculate read time (average reading speed: 200 words per minute)
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    
    const post: BlogPost = {
      slug,
      title: data.title || '',
      subtitle: data.subtitle || '',
      dateAdded: dateAddedStr,
      readTimeInMinutes: readTime,
      views: typeof data.views === 'number' ? data.views : (data.views ? Number(data.views) : 0),
      tags: data.tags || [],
      author: data.author || 'Harsh Gajjar',
    };

    return { post, content };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
});

// Wrapper for backward compatibility and specific use cases
export function getPostBySlug(slug: string): BlogPost | null {
  const result = getPost(slug);
  return result ? result.post : null;
}

export function getAllPosts(): BlogPost[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => {
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    });
  
  return posts;
}

export function getPostContent(slug: string): string | null {
  const result = getPost(slug);
  return result ? result.content : null;
}
