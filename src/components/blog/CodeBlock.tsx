'use client';

import { useRef, useState, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type CodeBlockProps = {
  className?: string;
  children?: React.ReactNode;
};

export function CodeBlock({ className, children, ...props }: CodeBlockProps & React.HTMLAttributes<HTMLPreElement>) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const pre = preRef.current;
    const code = pre?.querySelector('code');
    const text = (code?.textContent ?? pre?.textContent) ?? '';
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="relative group">
      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          'absolute top-1 right-2 z-10 p-2 rounded-md transition-colors',
          'bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground',
          'border border-border opacity-70 hover:opacity-100 focus:opacity-100 focus:outline-none'
        )}
        aria-label={copied ? 'Copied' : 'Copy code'}
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
      <pre
        ref={preRef}
        className={cn(
          'overflow-x-auto rounded-lg bg-muted mb-4 border border-border py-2 px-4 text-sm leading-relaxed pr-12',
          className
        )}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
