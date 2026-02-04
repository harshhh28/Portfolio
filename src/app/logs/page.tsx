import { getAllPosts } from "@/lib/mdx";
import { ResearchLog } from "@/components/blog/ResearchLog";

export const metadata = {
  title: "Research Log | Harsh Gajjar",
  description: "Engineering notes, tutorials, and documentation.",
  openGraph: {
    title: "Research Log | Harsh Gajjar",
    description: "Engineering notes, tutorials, and documentation.",
    url: "https://harshgajjar.dev/logs",
    siteName: "Harsh Gajjar",
    images: [
      {
        url: "https://harshgajjar.dev/assets/images/og/logs.webp",
        width: 1200,
        height: 630,
        alt: "Research Log | Harsh Gajjar",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Research Log | Harsh Gajjar",
    description: "Engineering notes, tutorials, and documentation.",
    images: ["https://harshgajjar.dev/assets/images/og/logs.webp"],
    creator: "@harshgajjar_28",
  },
};

export default function LogsPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-16">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Research Log Grid */}
        <div className="mb-8 border-b border-border pb-4">
            <h1 className="text-2xl font-mono font-bold">/logs</h1>
            <p className="text-sm text-muted-foreground font-mono mt-1">
              Engineering notes, tutorials, and documentation.
            </p>
        </div>

        {posts.length > 0 ? (
          <ResearchLog posts={posts} />
        ) : (
          <div className="border border-dashed border-border/40 rounded-lg p-8 text-center bg-muted/30">
            <p className="text-sm text-muted-foreground font-mono">
              Directory is empty.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
