import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 pb-16 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center space-y-6">
        <h1 className="text-6xl font-bold text-foreground font-mono">404</h1>
        <h2 className="text-2xl font-semibold text-foreground font-mono">
          Log Entry Not Found
        </h2>
        <p className="text-muted-foreground font-mono text-sm">
          The research log you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/logs"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline font-mono"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Logs
        </Link>
      </div>
    </div>
  );
}
