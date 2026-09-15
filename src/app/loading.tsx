import { Spinner } from "@/components/ui/Spinner";

export default function Loading() {
  return (
    <div className="min-h-screen pt-14 px-6 flex items-center justify-center">
      <Spinner />
    </div>
  );
}
