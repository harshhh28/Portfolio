import { MDXComponents } from "./MDXComponents";
import { compileMDX } from "@/lib/mdx-compiler";

interface MDXContentProps {
  source: string;
}

export async function MDXContent({ source }: MDXContentProps) {
  const Content = await compileMDX(source);
  return <Content components={MDXComponents} />;
}
