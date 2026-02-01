import { compile, run } from "@mdx-js/mdx";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { MDXComponents } from "./MDXComponents";

interface MDXContentProps {
  source: string;
}

export async function MDXContent({ source }: MDXContentProps) {
  const compiled = await compile(source, {
    outputFormat: "function-body",
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [rehypeHighlight, { detect: true, ignoreMissing: true }],
    ],
  });

  const runtime = (await import("react/jsx-runtime")) as unknown as Record<string, unknown>;
  const { default: Content } = await run(String(compiled), {
    ...(runtime as any),
    // Required by MDX v3 runtime for ESM features.
    baseUrl: import.meta.url,
  } as any);

  return <Content components={MDXComponents} />;
}
