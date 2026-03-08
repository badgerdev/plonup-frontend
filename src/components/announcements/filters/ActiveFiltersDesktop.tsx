"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { X, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ActiveFiltersDesktop() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryList = (searchParams.get("category") || "")
    .split(",")
    .filter(Boolean);

  const locationList = (searchParams.get("location") || "")
    .split(",")
    .filter(Boolean);

  const [showAll, setShowAll] = useState(false);

  const allFilters = [...locationList, ...categoryList];
  const hasFilters = allFilters.length > 0;
  const visibleFilters = showAll ? allFilters : allFilters.slice(0, 4);

  const removeCategory = (cat: string) => {
    const newCats = categoryList.filter((c) => c !== cat);
    const params = new URLSearchParams(searchParams.toString());

    if (newCats.length) {
      params.set("category", newCats.join(","));
    } else {
      params.delete("category");
    }

    router.push(`/ogloszenia?${params.toString()}`);
  };

  const removeLocation = (loc: string) => {
    const newLocs = locationList.filter((l) => l !== loc);
    const params = new URLSearchParams(searchParams.toString());

    if (newLocs.length) {
      params.set("location", newLocs.join(","));
    } else {
      params.delete("location");
    }

    router.push(`/ogloszenia?${params.toString()}`);
  };

  const clearAll = () => {
    router.push("/ogloszenia");
  };

  return (
    <div className="flex flex-col gap-2 pr-1 min-h-[80px]">
      <div className="flex items-center justify-between">
        <h3 className="pl-4 border-l border-orange-500 text-base font-semibold mb-1">
          Aktywne filtry
        </h3>
        {hasFilters && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={clearAll}
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-[var(--accent-dark)] hover:bg-muted rounded-full"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Wyczyść filtry</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      {hasFilters ? (
        <>
          {visibleFilters.map((filter, i) => {
            const isCategory = categoryList.includes(filter);
            const onRemove = isCategory
              ? () => removeCategory(filter)
              : () => removeLocation(filter);

            return (
              <div
                key={`${filter}-${i}`}
                className={`text-sm px-2 py-1 rounded-full ${
                  isCategory
                    ? "bg-green-100 text-zinc-700"
                    : "bg-[var(--accent-light)] text-[var(--accent-dark)]"
                } flex items-center justify-between`}
              >
                <span className="truncate">{filter}</span>
                <button
                  onClick={onRemove}
                  className="ml-2 p-1 hover:cursor-pointer bg-destructive/90 hover:bg-destructive rounded-full text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}

          {allFilters.length > 4 && (
            <Button
              onClick={() => setShowAll((prev) => !prev)}
              variant="ghost"
              className="text-xs px-1 mt-1 flex items-center gap-1 text-[var(--accent-dark)] hover:underline"
            >
              {showAll ? (
                <>
                  Pokaż mniej <ChevronUp className="w-3 h-3" />
                </>
              ) : (
                <>
                  Pokaż więcej <ChevronDown className="w-3 h-3" />
                </>
              )}
            </Button>
          )}
        </>
      ) : (
        <div className="text-muted-foreground text-xs italic">
          Aktualnie brak...
        </div>
      )}
    </div>
  );
}
