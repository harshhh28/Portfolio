import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { CodeBlock } from '@/components/blog/CodeBlock';
import { Mermaid } from '@/components/blog/Mermaid';

export const MDXComponents = {
  // ... existing headers, p, a, ul, ol, li, blockquote ...
  // (I'll keep them as they are)
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        'text-2xl font-bold tracking-tight text-foreground mt-6 mb-3',
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        'text-xl font-semibold tracking-tight text-foreground mt-6 mb-3',
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        'text-lg font-semibold tracking-tight text-foreground mt-4 mb-2',
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        'text-base font-semibold tracking-tight text-foreground mt-4 mb-2',
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn('text-sm leading-6 text-foreground mb-4', className)}
      {...props}
    />
  ),
  a: ({ className, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith('http');
    if (isExternal || !href) {
      return (
        <a
          href={href || '#'}
          className={cn(
            'text-primary hover:underline font-medium',
            className
          )}
          {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
          {...props}
        />
      );
    }
    return (
      <Link
        href={href}
        className={cn(
          'text-primary hover:underline font-medium',
          className
        )}
        {...props}
      />
    );
  },
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={cn('list-disc list-inside mb-4 space-y-2 text-foreground', className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn('list-decimal list-inside mb-4 space-y-2 text-foreground', className)}
      {...props}
    />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn('text-sm leading-6', className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        'border-l-4 border-primary pl-4 italic my-6 text-muted-foreground',
        className
      )}
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
            ? "block py-0 px-0 text-xs rounded-lg [&.hljs]:bg-transparent"
            : "relative rounded bg-muted px-[0.3rem] py-[0.2rem] text-xs text-foreground",
          isBlock && !hasHljs && "text-foreground",
          className
        )}
        {...props}
      />
    );
  },
  pre: ({ className, children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
    // Helper to extract text content from nested React elements
    const extractText = (node: any): string => {
      if (typeof node === 'string') return node;
      if (typeof node === 'number') return String(node);
      if (Array.isArray(node)) return node.map(extractText).join('');
      if (React.isValidElement(node)) return extractText((node.props as any).children);
      return '';
    };

    // Recursive helper to find the fenced-code element. MDX passes our custom `code`
    // component (a function), not the intrinsic "code" string, so match language class too.
    const findCodeElement = (node: any): React.ReactElement | null => {
      if (React.isValidElement(node)) {
        const cls = String((node.props as any)?.className ?? '');
        if (cls.includes('language-mermaid')) {
          return node as React.ReactElement;
        }
        const type = node.type as any;
        if (type === 'code' || type?.displayName === 'code' || (node.props as any)?.originalType === 'code') {
          return node as React.ReactElement;
        }
        return findCodeElement((node.props as any).children);
      }
      if (Array.isArray(node)) {
        for (const child of node) {
          const found = findCodeElement(child);
          if (found) return found;
        }
      }
      return null;
    };

    const codeElement = findCodeElement(children);
    const codeClassName = (codeElement?.props?.className || '') as string;
    const preClassName = (className || '') as string;

    const isMermaid = 
      codeClassName.includes('language-mermaid') || 
      codeClassName.includes('mermaid') ||
      preClassName.includes('language-mermaid') ||
      preClassName.includes('mermaid');

    if (isMermaid) {
      const chartCode = extractText(codeElement?.props?.children || children).trim();
      if (chartCode) {
        return <Mermaid chart={chartCode} />;
      }
    }

    return (
      <CodeBlock className={className} {...props}>
        {children}
      </CodeBlock>
    );
  },
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-border" {...props} />
  ),
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    if (!src) return null;
    // Use span (not div) so when MDX wraps the image in a <p>, we don't get invalid <p><div></div></p>
    return (
      <span className="my-5 block max-w-5xl mx-auto rounded-lg overflow-hidden border border-border">
        <img src={src} alt={alt || ''} className="w-full h-auto" {...props} />
      </span>
    );
  },
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-auto">
      <table
        className={cn('w-full border-collapse border border-border', className)}
        {...props}
      />
    </div>
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        'border border-border px-4 py-2 text-left font-semibold bg-muted',
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn('border border-border px-4 py-2', className)}
      {...props}
    />
  ),
};
