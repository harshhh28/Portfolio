import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compile } from '@mdx-js/mdx';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

// Helper function to parse date string in dd-mm-yyyy format
function parseDate(dateStr: string) {
  const [day, month, year] = dateStr.replace(/['"]/g, '').split('-');
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}

export async function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const post = await getPost(slug);
      return {
        slug,
        ...post,
      };
    })
  );

  return posts
    .filter((post): post is NonNullable<typeof post> => post !== null)
    .sort((a, b) => {
      const dateA = parseDate(a.frontmatter?.date);
      const dateB = parseDate(b.frontmatter?.date);
      return dateB.getTime() - dateA.getTime(); // Sort in descending order (newest first)
    });
}

export async function getPost(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data: frontmatter, content } = matter(fileContents);
    
    // Compile MDX to JSX
    const compiledContent = await compile(content, {
      outputFormat: 'function-body',
    });

    return {
      frontmatter,
      content: String(compiledContent),
      slug,
    };
  } catch (error) {
    return null;
  }
}