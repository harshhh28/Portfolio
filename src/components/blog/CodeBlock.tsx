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
          'absolute top-1.5 right-2 z-10 p-1 rounded-sm transition-all',
          'bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground',
          'border border-border/50 opacity-100'
        )}
        aria-label={copied ? 'Copied' : 'Copy code'}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>
      <pre
        ref={preRef}
        className={cn(
          'overflow-x-auto rounded-lg bg-muted mb-3 border border-border py-1.5 px-3 text-xs leading-relaxed pr-10',
          className
        )}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
