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

  const cityName = searchParams.get("city") ?? "";

  const [showAll, setShowAll] = useState(false);

  const allFilters = [
    ...(cityName ? [{ type: "city", value: cityName }] : []),
    ...categoryList.map((c) => ({ type: "category", value: c })),
  ];
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

  const removeCity = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("lat");
    params.delete("lng");
    params.delete("city");
    params.delete("admin1");
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
          {visibleFilters.map((filter, i) => (
            <div
              key={`${filter.value}-${i}`}
              className={`text-sm px-2 py-1 rounded-full ${
                filter.type === "category"
                  ? "bg-green-100 text-zinc-700"
                  : "bg-[var(--accent-light)] text-[var(--accent-dark)]"
              } flex items-center justify-between`}
            >
              <span className="truncate">{filter.value}</span>
              <button
                onClick={filter.type === "category" ? () => removeCategory(filter.value) : removeCity}
                className="ml-2 p-1 hover:cursor-pointer bg-destructive/90 hover:bg-destructive rounded-full text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {allFilters.length > 4 && (
            <Button
              onClick={() => setShowAll((prev) => !prev)}
              variant="ghost"
              className="text-xs px-1 mt-1 flex items-center gap-1 text-[var(--accent-dark)] hover:underline"
            >
              {showAll ? (
                <>Pokaż mniej <ChevronUp className="w-3 h-3" /></>
              ) : (
                <>Pokaż więcej <ChevronDown className="w-3 h-3" /></>
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
