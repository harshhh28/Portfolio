import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/blog/CodeBlock";

const bodyText = "text-[15px] leading-7 text-foreground/85";

export const MDXComponents = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn("mb-4 mt-10 text-2xl font-semibold tracking-tight text-foreground", className)}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "mb-4 mt-12 border-b border-border pb-2 text-xl font-semibold tracking-tight text-foreground first:mt-0",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn("mb-2 mt-8 text-base font-semibold text-foreground", className)}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn("mb-2 mt-6 text-[15px] font-semibold text-foreground", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn("mb-5", bodyText, className)} {...props} />
  ),
  strong: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className={cn("font-semibold text-foreground", className)} {...props} />
  ),
  a: ({ className, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const linkClass = cn(
      "text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary",
      className
    );
    const isExternal = href?.startsWith("http");
    if (isExternal || !href) {
      return (
        <a
          href={href || "#"}
          className={linkClass}
          {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
          {...props}
        />
      );
    }
    return <Link href={href} className={linkClass} {...props} />;
  },
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={cn("mb-5 list-disc space-y-1.5 pl-5 marker:text-faint", className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn("mb-5 list-decimal space-y-1.5 pl-5 marker:text-muted-foreground", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn("pl-1", bodyText, className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn("my-6 border-l-2 border-primary pl-4 italic text-muted-foreground", className)}
      {...props}
    />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const isBlock = className?.includes("language-");
    const hasHljs = className?.includes("hljs");
    return (
      <code
        className={cn(
          "font-mono",
          isBlock
            ? "block bg-transparent p-0 text-xs"
            : "rounded-sm bg-muted px-1.5 py-0.5 text-[0.875em] text-foreground",
          isBlock && !hasHljs && "text-foreground",
          className
        )}
        {...props}
      />
    );
  },
  pre: ({ className, children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <CodeBlock className={className} {...props}>
      {children}
    </CodeBlock>
  ),
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-10 border-border" {...props} />
  ),
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    if (!src) return null;
    // span (not div) so MDX wrapping the image in <p> doesn't produce invalid <p><div>
    return (
      <span className="my-8 block overflow-hidden rounded-sm border border-border">
        {/* eslint-disable-next-line @next/next/no-img-element -- MDX images have author-supplied, unknown dimensions */}
        <img
          src={src}
          alt={alt || ""}
          loading="lazy"
          decoding="async"
          className="h-auto w-full"
          {...props}
        />
      </span>
    );
  },
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-x-auto">
      <table className={cn("w-full border-collapse text-sm", className)} {...props} />
    </div>
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn("border-b border-border px-3 py-2 text-left font-semibold text-foreground", className)}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn("border-b border-border px-3 py-2 text-muted-foreground", className)}
      {...props}
    />
  ),
};
