import { SystemLoader } from "@/components/ui/SystemLoader";

export default function Loading() {
  return (
    <div className="min-h-screen pt-24 px-4 flex items-center justify-center">
      <SystemLoader />
    </div>
  );
}
