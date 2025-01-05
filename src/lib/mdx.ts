import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compile } from '@mdx-js/mdx';

const postsDirectory = path.join(process.cwd(), 'src/content/blogs');

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

  return posts.sort((a, b) => {
    if (a.frontmatter?.date && b.frontmatter?.date && a.frontmatter.date < b.frontmatter.date) {
      return 1;
    } else {
      return -1;
    }
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