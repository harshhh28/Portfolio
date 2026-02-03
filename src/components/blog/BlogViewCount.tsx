"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, runTransaction, type Transaction } from "firebase/firestore";
import { getFirestoreDb } from "@/lib/firebase-client";

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
      const db = getFirestoreDb();
      if (!db) {
        if (!cancelled) setViews(0);
        return;
      }

      const viewedThisSession = getViewedSet().has(slug);
      const ref = doc(db, "blogViews", slug);

      // 1) First render: show current count
      try {
        const snap = await getDoc(ref);
        const current = snap.exists() && typeof snap.data()?.views === "number" ? (snap.data()!.views as number) : 0;
        if (!cancelled) setViews(current);
      } catch {
        if (!cancelled) setViews(0);
      }

      // 2) Increment only once per session
      if (!viewedThisSession) {
        try {
          const next = await runTransaction(db, async (tx: Transaction) => {
            const snap = await tx.get(ref);
            const current = snap.exists() && typeof snap.data()?.views === "number" ? (snap.data()!.views as number) : 0;
            const updated = current + 1;
            tx.set(ref, { views: updated }, { merge: true });
            return updated;
          });

          if (!cancelled) {
            setViews(next);
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

  if (views === null) {
    return (
      <span className="inline-flex items-center">
        <span className="animate-pulse">...</span>
        <span className="ml-1">views</span>
      </span>
    );
  }
  return <span>{views.toLocaleString()} views</span>;
}
