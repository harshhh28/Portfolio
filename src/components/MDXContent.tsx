"use client";

import { useMemo, Fragment } from "react";
import * as runtime from "react/jsx-runtime";
import { runSync } from "@mdx-js/mdx";
import { MDXProvider } from "@mdx-js/react";

const components = {
  h1: (props: any) => (
    <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />
  ),
  h3: (props: any) => <h3 className="text-xl font-bold mt-4 mb-2" {...props} />,
  p: (props: any) => (
    <p className="mb-4 text-white/80 leading-relaxed" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc list-inside mb-4 space-y-2" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />
  ),
  li: (props: any) => <li className="text-white/80" {...props} />,
  code: (props: any) => (
    <code className="bg-white/10 rounded px-1.5 py-0.5 text-sm" {...props} />
  ),
};

export function MDXContent({ children }: { children: string }) {
  const Content = useMemo(() => {
    const { default: Content } = runSync(children, { ...runtime, Fragment });
    return Content;
  }, [children]);

  return (
    <MDXProvider components={components}>
      <Content />
    </MDXProvider>
  );
}
