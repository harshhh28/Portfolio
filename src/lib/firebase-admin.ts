import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getFirestore, type Firestore, FieldValue } from "firebase-admin/firestore";
import type { ServiceAccount } from "firebase-admin/app";

const BLOG_VIEWS_COLLECTION = "blogViews";

let firestore: Firestore | null = null;

function getFirebaseFirestore(): Firestore | null {
  if (firestore !== null) return firestore;
  if (typeof window !== "undefined") return null;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    return null;
  }

  const privateKeyParsed = privateKey.replace(/\\n/g, "\n");

  if (getApps().length === 0) {
    initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey: privateKeyParsed,
      } as ServiceAccount),
    });
  }

  firestore = getFirestore();
  return firestore;
}

export function isFirebaseConfigured(): boolean {
  return !!(
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
  );
}

export async function getViewsFromFirestore(slug: string): Promise<number> {
  const db = getFirebaseFirestore();
  if (!db) return 0;

  const doc = await db.collection(BLOG_VIEWS_COLLECTION).doc(slug).get();
  const data = doc.data();
  return typeof data?.views === "number" ? data.views : 0;
}

export async function incrementViewsInFirestore(slug: string): Promise<number> {
  const db = getFirebaseFirestore();
  if (!db) return 0;

  const ref = db.collection(BLOG_VIEWS_COLLECTION).doc(slug);
  await ref.set({ views: FieldValue.increment(1) }, { merge: true });
  const doc = await ref.get();
  return typeof doc.data()?.views === "number" ? doc.data()!.views : 1;
}

export async function getAllViewsFromFirestore(): Promise<Record<string, number>> {
  const db = getFirebaseFirestore();
  if (!db) return {};

  const snapshot = await db.collection(BLOG_VIEWS_COLLECTION).get();
  const result: Record<string, number> = {};
  snapshot.docs.forEach((doc) => {
    const views = doc.data().views;
    if (typeof views === "number") result[doc.id] = views;
  });
  return result;
}
