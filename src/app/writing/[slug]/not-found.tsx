import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen pt-14 px-6 pb-16 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center space-y-4">
        <p className="font-mono text-sm text-primary">404</p>
        <h1 className="text-2xl font-semibold tracking-tight">
          Post not found
        </h1>
        <p className="text-muted-foreground text-sm">
          The post you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/writing"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to writing
        </Link>
      </div>
    </div>
  );
}
