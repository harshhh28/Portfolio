import { compile, run } from "@mdx-js/mdx";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { MDXComponents } from "./MDXComponents";
import { cache } from "react";

interface MDXContentProps {
  source: string;
}

const getCompiledMDX = cache(async (source: string) => {
  const compiled = await compile(source, {
    outputFormat: "function-body",
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      // Highlight only when language is provided; avoid expensive auto-detect.
      [rehypeHighlight, { detect: false, ignoreMissing: true }],
    ],
  });

  const runtime = (await import("react/jsx-runtime")) as unknown as Record<string, unknown>;
  const { default: Content } = await run(String(compiled), {
    ...(runtime as any),
    // Required by MDX v3 runtime for ESM features.
    baseUrl: import.meta.url,
  } as any);

  return Content as React.ComponentType<{ components?: typeof MDXComponents }>;
});

export async function MDXContent({ source }: MDXContentProps) {
  const Content = await getCompiledMDX(source);
  return <Content components={MDXComponents} />;
}
