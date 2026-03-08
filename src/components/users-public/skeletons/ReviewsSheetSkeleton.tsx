"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function ReviewsSheetSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="bg-white rounded-xl shadow-lg p-4 flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-32 rounded-md" /> {/* button / info */}
        </div>
        <div className="text-right space-y-2">
          <Skeleton className="h-6 w-28 rounded-md" /> {/* average */}
          <Skeleton className="h-4 w-36 rounded-md" /> {/* label */}
          <div className="flex gap-1 justify-end">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-5 rounded" />
            ))}
          </div>
        </div>
      </div>

      {/* Oceny użytkownika */}
      <div className="space-y-3">
        <Skeleton className="h-5 w-48 rounded-md" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-4 w-20 rounded-md" />
            <Skeleton className="h-2 w-full rounded-md" />
            <Skeleton className="h-4 w-8 rounded-md" />
          </div>
        ))}
      </div>

      {/* Lista opinii */}
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-zinc-100 rounded-xl border border-gray-200 p-4 space-y-2"
          >
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="h-3 w-full rounded-md" />
            <Skeleton className="h-3 w-3/4 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}
