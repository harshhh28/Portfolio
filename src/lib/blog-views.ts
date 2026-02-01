import {
  isFirebaseConfigured,
  getViewsFromFirestore,
  incrementViewsInFirestore,
  getAllViewsFromFirestore,
} from "./firebase-admin";

// In-memory fallback when Firebase env vars are not set (e.g. local dev)
const viewCounts = new Map<string, number>();

export async function getViews(slug: string): Promise<number> {
  if (isFirebaseConfigured()) {
    return getViewsFromFirestore(slug);
  }
  return viewCounts.get(slug) ?? 0;
}

export async function incrementViews(slug: string): Promise<number> {
  if (isFirebaseConfigured()) {
    return incrementViewsInFirestore(slug);
  }
  const current = viewCounts.get(slug) ?? 0;
  const next = current + 1;
  viewCounts.set(slug, next);
  return next;
}

export async function getAllViews(): Promise<Record<string, number>> {
  if (isFirebaseConfigured()) {
    return getAllViewsFromFirestore();
  }
  const obj: Record<string, number> = {};
  viewCounts.forEach((count, slug) => {
    obj[slug] = count;
  });
  return obj;
}
