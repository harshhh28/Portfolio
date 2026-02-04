import { compile, run } from "@mdx-js/mdx";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { cache } from "react";
import * as runtime from "react/jsx-runtime";

export const compileMDX = cache(async (source: string) => {
  const compiled = await compile(source, {
    outputFormat: "function-body",
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [rehypeHighlight, { detect: false, ignoreMissing: true }],
    ],
  });

  const { default: Content } = await run(String(compiled), {
    ...runtime,
    baseUrl: import.meta.url,
  } as any);

  return Content;
});
