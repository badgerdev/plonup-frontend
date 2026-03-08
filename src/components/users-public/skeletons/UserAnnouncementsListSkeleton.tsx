"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function UserAnnouncementsListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between border border-gray-200 rounded-lg px-2 md:px-4 py-3 bg-zinc-50 shadow-sm"
        >
          <div className="flex flex-col gap-4 flex-1">
            <Skeleton className="h-5 w-40 rounded-md" />
            <Skeleton className="h-4 w-28 rounded-md" />
          </div>
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      ))}
    </div>
  );
}
