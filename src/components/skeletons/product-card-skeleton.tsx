import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="gb-card p-3 animate-pulse">
      <div className="relative w-full h-44 bg-gray-200 rounded-md mb-3"></div>
      <div className="h-4 w-3/5 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 w-2/5 bg-gray-300 rounded mb-3"></div>
      <div className="h-9 w-full bg-gray-200 rounded-sm"></div>
    </div>
  );
}