import { LoaderCircle } from "lucide-react";

export const LoaderSpinner = () => {
  return (
    <div className="flex h-[calc(100vh-117px)] w-full items-center justify-center bg-white/10 sm:h-[calc(100vh-100px)]">
      <LoaderCircle className="animate-spin" size={64} />
    </div>
  );
};
