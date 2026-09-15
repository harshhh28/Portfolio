"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, runTransaction, type Transaction } from "firebase/firestore";
import { getFirestoreDb, isFirebaseConfigured } from "@/lib/firebase-client";

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
  // Render nothing when Firebase isn't configured instead of a misleading "0 views".
  if (!isFirebaseConfigured) return null;
  return <ViewCounter slug={slug} />;
}

function ViewCounter({ slug }: { slug: string }) {
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

      try {
        const snap = await getDoc(ref);
        const current = snap.exists() && typeof snap.data()?.views === "number" ? (snap.data()!.views as number) : 0;
        if (!cancelled) setViews(current);
      } catch {
        if (!cancelled) setViews(0);
      }

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
          // Count already shown from the read above
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

  return (
    <>
      <span aria-hidden="true">·</span>
      {views === null ? (
        <span className="animate-pulse">… views</span>
      ) : (
        <span>{views.toLocaleString()} views</span>
      )}
    </>
  );
}
