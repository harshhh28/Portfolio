import type { ReactNode } from "react";

export function TimelineRow({
  date,
  title,
  org,
  orgUrl,
  children,
}: {
  date: string;
  title: string;
  org: string;
  orgUrl?: string | null;
  children?: ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-2 border-t border-border py-5 first:border-t-0 first:pt-0 last:pb-0 sm:grid-cols-[152px_1fr] sm:gap-5">
      <div className="pt-0.5 font-mono text-xs text-faint">{date}</div>
      <div>
        <h3 className="text-[15px] font-semibold leading-snug">{title}</h3>
        <p className="text-sm font-medium text-muted-foreground">
          {orgUrl ? (
            <a
              href={orgUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-primary"
            >
              {org}
            </a>
          ) : (
            org
          )}
        </p>
        {children}
      </div>
    </div>
  );
}
