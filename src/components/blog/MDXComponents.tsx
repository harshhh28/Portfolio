import Link from 'next/link';
import { cn } from '@/lib/utils';

export const MDXComponents = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        'text-4xl font-bold tracking-tight text-foreground mt-8 mb-4',
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        'text-3xl font-semibold tracking-tight text-foreground mt-8 mb-4',
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        'text-2xl font-semibold tracking-tight text-foreground mt-6 mb-3',
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        'text-xl font-semibold tracking-tight text-foreground mt-4 mb-2',
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn('text-base leading-7 text-foreground mb-4', className)}
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
    <li className={cn('text-base leading-7', className)} {...props} />
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
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm text-foreground',
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={cn(
        'overflow-x-auto rounded-lg bg-muted p-4 mb-4 border border-border',
        className
      )}
      {...props}
    />
  ),
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-border" {...props} />
  ),
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    if (!src) return null;
    
    return (
      <div className="my-8 rounded-lg overflow-hidden border border-border">
        <img src={src} alt={alt || ''} className="w-full h-auto" {...props} />
      </div>
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
