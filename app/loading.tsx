import { Loader2Icon } from "lucide-react";

export default function LoadingPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center bg-white/50">
        <Loader2Icon className="animate-spin" size="64" />
      </div>
    </div>
  );
}
