"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function PublicUserReviewsSkeleton() {
  return (
    <div className="space-y-4">
      {/* Header skeleton */}
      <div className="bg-white rounded-2xl shadow-lg p-4 flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-6 w-40 rounded-md" /> {/* username */}
          <Skeleton className="h-4 w-20 rounded-md" />{" "}
          {/* zweryfikowany badge */}
          <div className="flex gap-1 mt-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-5 rounded" />
            ))}
          </div>
        </div>
        <div className="text-right space-y-2">
          <Skeleton className="h-6 w-12 rounded-md" /> {/* average */}
          <Skeleton className="h-4 w-28 rounded-md" /> {/* label */}
        </div>
      </div>

      {/* Opinie skeleton */}
      <div className="bg-white rounded-2xl shadow-lg p-4 lg:p-4">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-5 w-40 rounded-md" />
          <Skeleton className="h-8 w-24 rounded-full" /> {/* button */}
        </div>

        <ul className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <li
              key={i}
              className="bg-zinc-100 rounded-xl border border-gray-200 p-4 space-y-2"
            >
              <Skeleton className="h-4 w-32 rounded-md" /> {/* stars + user */}
              <Skeleton className="h-3 w-full rounded-md" />{" "}
              {/* comment line 1 */}
              <Skeleton className="h-3 w-3/4 rounded-md" />{" "}
              {/* comment line 2 */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
