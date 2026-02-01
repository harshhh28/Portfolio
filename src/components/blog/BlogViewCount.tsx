"use client";

import { useEffect, useState } from "react";

const VIEWED_KEY = "blog-viewed";

function getViewedSet(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = sessionStorage.getItem(VIEWED_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw));
  } catch {
    return new Set();
  }
}

function markViewed(slug: string) {
  const set = getViewedSet();
  set.add(slug);
  sessionStorage.setItem(VIEWED_KEY, JSON.stringify([...Array.from(set)]));
}

export function BlogViewCount({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const viewedThisSession = getViewedSet().has(slug);

      // Fetch current count first so we show something immediately (no cache)
      let currentViews = 0;
      try {
        const getRes = await fetch(`/api/blog/${slug}/views`, { cache: "no-store" });
        if (!getRes.ok) throw new Error("GET failed");
        const getData = await getRes.json();
        currentViews = getData.views ?? 0;
        if (!cancelled) setViews(currentViews);
      } catch {
        if (!cancelled) setViews(0);
      }

      // POST when: first view this session, OR server count is 0 (e.g. server restarted, so count again)
      const shouldIncrement = !viewedThisSession || currentViews === 0;
      if (shouldIncrement) {
        try {
          const postRes = await fetch(`/api/blog/${slug}/views`, { method: "POST", cache: "no-store" });
          if (!postRes.ok) return;
          const postData = await postRes.json();
          if (!cancelled) {
            setViews(postData.views);
            markViewed(slug);
          }
        } catch {
          // Count already shown from GET above
        }
      }
    }

    // Defer so React Strict Mode's double-mount doesn't run this twice (cleanup cancels before this runs)
    const timeoutId = setTimeout(() => {
      run();
    }, 0);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [slug]);

  if (views === null) return <span>— views</span>;
  return <span>{views.toLocaleString()} views</span>;
}
