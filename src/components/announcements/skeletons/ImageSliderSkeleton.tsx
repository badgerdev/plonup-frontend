import { Skeleton } from "@/components/ui/skeleton";

export const ImageSliderSkeleton = () => {
  return (
    <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[450px] rounded-[16px] overflow-hidden border border-[var(--border)] shadow-sm">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
