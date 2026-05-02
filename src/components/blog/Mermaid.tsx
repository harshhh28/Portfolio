'use client';

import React, { useEffect, useMemo, useState } from 'react';
import mermaid from 'mermaid';
import hljs from 'highlight.js/lib/core';
import graphql from 'highlight.js/lib/languages/graphql';
import plaintext from 'highlight.js/lib/languages/plaintext';
import { Workflow, Download, Copy, Check, Play, Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';

if (!hljs.getLanguage('graphql')) hljs.registerLanguage('graphql', graphql);
if (!hljs.getLanguage('plaintext')) hljs.registerLanguage('plaintext', plaintext);

function highlightMermaidSource(code: string): string {
  try {
    return hljs.highlight(code, { language: 'graphql', ignoreIllegals: true }).value;
  } catch {
    try {
      return hljs.highlight(code, { language: 'plaintext', ignoreIllegals: true }).value;
    } catch {
      return code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }
  }
}

/** Zinc-aligned palette (matches site dark theme / globals.css) */
const initMermaid = () => {
  if (typeof window !== 'undefined') {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      themeVariables: {
        darkMode: true,
        background: '#09090b',
        mainBkg: '#27272a',
        secondBkg: '#18181b',
        tertiaryBkg: '#09090b',
        primaryColor: '#3f3f46',
        secondaryColor: '#27272a',
        tertiaryColor: '#18181b',
        primaryTextColor: '#e4e4e7',
        secondaryTextColor: '#d4d4d8',
        tertiaryTextColor: '#a1a1aa',
        primaryBorderColor: '#52525b',
        secondaryBorderColor: '#3f3f46',
        tertiaryBorderColor: '#27272a',
        lineColor: '#a1a1aa',
        textColor: '#e4e4e7',
        titleColor: '#fafafa',
        clusterBkg: 'rgba(39, 39, 42, 0.72)',
        clusterBorder: '#52525b',
        defaultLinkColor: '#a1a1aa',
        edgeLabelBackground: '#27272a',
        actorBkg: '#27272a',
        actorBorder: '#52525b',
        actorTextColor: '#e4e4e7',
        signalColor: '#a1a1aa',
        labelBoxBkgColor: '#27272a',
        labelTextColor: '#e4e4e7',
        loopTextColor: '#a1a1aa',
        activationBorderColor: '#71717a',
        activationBkgColor: '#3f3f46',
        sequenceNumberColor: '#a1a1aa',
        sectionBkgColor: '#27272a',
        altSectionBkgColor: '#18181b',
        gridColor: '#3f3f46',
        arrowheadColor: '#a1a1aa',
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
        fontSize: '13px',
      },
      securityLevel: 'loose',
    });
  }
};

interface MermaidProps {
  chart: string;
}

export function Mermaid({ chart }: MermaidProps) {
  const [svg, setSvg] = useState<string>('');
  const [view, setView] = useState<'diagram' | 'code'>('diagram');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    initMermaid();
    const renderChart = async () => {
      if (chart) {
        try {
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
          const { svg: svgContent } = await mermaid.render(id, chart);
          setSvg(svgContent);
        } catch (error) {
          console.error('Mermaid rendering failed:', error);
          setSvg(`<div class="text-red-500 p-4 border border-red-500/20 rounded bg-red-500/5 text-xs font-mono">
            Error rendering diagram: ${error instanceof Error ? error.message : String(error)}
          </div>`);
        }
      }
    };

    renderChart();
  }, [chart]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(chart);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleDownload = () => {
    if (!svg) return;
    const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'diagram.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const highlightedSource = useMemo(() => highlightMermaidSource(chart), [chart]);

  return (
    <div className="my-8 rounded-lg overflow-hidden border border-border bg-zinc-950/90 shadow-2xl">
      <div className="flex items-center justify-between gap-2 px-2 py-1 bg-zinc-900/95 border-b border-border/60">
        <div className="flex items-center gap-1.5 min-w-0">
          <Workflow className="w-3.5 h-3.5 shrink-0 text-muted-foreground" aria-hidden />
          <span className="text-xs font-medium text-foreground truncate leading-none">Mermaid</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={view === 'diagram' ? handleDownload : handleCopy}
            disabled={view === 'diagram' && !svg}
            className={cn(
              'p-1 rounded-md text-muted-foreground transition-colors',
              'hover:text-foreground hover:bg-zinc-800',
              'disabled:opacity-35 disabled:pointer-events-none'
            )}
            title={view === 'diagram' ? 'Download SVG' : 'Copy Mermaid source'}
          >
            {view === 'diagram' ? (
              <Download className="w-3.5 h-3.5" />
            ) : copied ? (
              <Check className="w-3.5 h-3.5 text-primary" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>

          <div
            className="border-l border-zinc-700/80 pl-1.5"
            role="radiogroup"
            aria-label="Diagram preview or source code"
          >
            <div className="relative flex h-7 w-[4.5rem] shrink-0 rounded-full bg-black p-0.5">
              <span
                aria-hidden
                className={cn(
                  'pointer-events-none absolute top-1/2 h-5 w-6 -translate-y-1/2 rounded-full bg-zinc-600/55',
                  'transition-[left] duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]',
                  view === 'code' ? 'left-0.5' : 'left-[2.625rem]'
                )}
              />
              <button
                type="button"
                role="radio"
                aria-checked={view === 'code'}
                onClick={() => setView('code')}
                className={cn(
                  'relative z-10 flex flex-1 items-center justify-center rounded-full',
                  'text-foreground transition-colors focus-visible:outline-none',
                  view !== 'code' && 'text-zinc-500 hover:text-zinc-300'
                )}
                title="Source code"
              >
                <Code2 className="h-3.5 w-3.5" strokeWidth={view === 'code' ? 2.25 : 2} aria-hidden />
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={view === 'diagram'}
                onClick={() => setView('diagram')}
                className={cn(
                  'relative z-10 flex flex-1 items-center justify-center rounded-full',
                  'text-foreground transition-colors focus-visible:outline-none',
                  view !== 'diagram' && 'text-zinc-500 hover:text-zinc-300'
                )}
                title="Diagram preview"
              >
                <Play className="h-3 w-3 translate-x-px" strokeWidth={2} aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>

      {view === 'diagram' ? (
        <div className="overflow-auto bg-zinc-950 min-h-[160px] max-h-[min(75vh,800px)] px-6 py-6">
          <div
            className="w-full min-w-0 transition-opacity duration-200 [&>svg]:mx-auto [&>svg]:block [&>svg]:max-w-full [&>svg]:h-auto"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        </div>
      ) : (
        <pre
          className={cn(
            'm-0 max-h-[min(75vh,800px)] overflow-x-auto overflow-y-auto rounded-none rounded-b-lg',
            'border-0 border-t border-border/50 bg-muted',
            'py-1.5 px-3 text-xs leading-relaxed font-mono',
            '[&_.hljs]:bg-transparent'
          )}
        >
          <code
            className="hljs language-graphql block whitespace-pre bg-transparent p-0 font-mono text-xs leading-relaxed"
            dangerouslySetInnerHTML={{ __html: highlightedSource }}
          />
        </pre>
      )}
    </div>
  );
}
