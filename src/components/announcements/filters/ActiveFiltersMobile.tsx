"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { CATEGORIES } from "@/lib/constants/categories";
import { X, ChevronDown, ChevronUp, Trash2, MapPin } from "lucide-react";

const FILTERS_TO_SHOW = 3;

export function ActiveFiltersMobile() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryList = (searchParams.get("category") || "")
    .split(",")
    .filter(Boolean);

  const locationList = (searchParams.get("location") || "")
    .split(",")
    .filter(Boolean);

  const findCategoryByKey = (key: string) =>
    CATEGORIES.find((c) => c.key === key);

  const removeCategory = (cat: string) => {
    const newCats = categoryList.filter((c) => c !== cat);
    const params = new URLSearchParams(searchParams.toString());
    if (newCats.length > 0) {
      params.set("category", newCats.join(","));
    } else {
      params.delete("category");
    }
    router.push(`/ogloszenia?${params.toString()}`);
  };

  const removeLocation = (loc: string) => {
    const newLocs = locationList.filter((l) => l !== loc);
    const params = new URLSearchParams(searchParams.toString());
    if (newLocs.length > 0) {
      params.set("location", newLocs.join(","));
    } else {
      params.delete("location");
    }
    router.push(`/ogloszenia?${params.toString()}`);
  };

  const clearAll = () => {
    router.push("/ogloszenia");
  };

  const [showAll, setShowAll] = useState(false);

  const allFilters = [
    ...locationList.map((loc) => ({ type: "location", value: loc })),
    ...categoryList.map((cat) => ({ type: "category", value: cat })),
  ];

  if (allFilters.length === 0) return null;

  const visibleFilters = showAll
    ? allFilters
    : allFilters.slice(0, FILTERS_TO_SHOW);

  return (
    <div className="lg:hidden px-3 py-2 rounded-xl shadow-sm border border-gray-200 bg-gray-100">
      {/* Nagłówek + wyczyść */}
      <div className="flex items-center justify-between mb-8">
        <span className="text-sm font-semibold text-[var(--accent-dark)]">
          Aktywne Filtry:
        </span>
        <button
          onClick={clearAll}
          className="flex items-center gap-1 border-b border-zinc-400"
        >
          <Trash2 className="w-4 h-4" />
          Wyczyść
        </button>
      </div>

      {/* Lista filtrów */}
      <div className="flex flex-wrap items-center gap-1">
        {visibleFilters.map((filter) => {
          if (filter.type === "location") {
            return (
              <span
                key={filter.value}
                className="px-2.5 py-2 rounded-full flex items-center gap-1 text-xs font-medium bg-[var(--accent-light)]"
              >
                <MapPin className="w-3.5 h-3.5 text-[var(--accent-main)]" />
                {filter.value}
                <button
                  onClick={() => removeLocation(filter.value)}
                  className="ml-2 p-1 hover:cursor-pointer bg-destructive/80 hover:bg-destructive rounded-full text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            );
          }
          if (filter.type === "category") {
            const catObj = findCategoryByKey(filter.value);
            return (
              <span
                key={filter.value}
                className="px-2.5 py-2 rounded-full flex items-center gap-1 text-xs font-medium bg-green-200"
              >
                {catObj?.icon} {catObj?.label || filter.value}
                <button
                  onClick={() => removeCategory(filter.value)}
                  className="ml-2 p-1 hover:cursor-pointer bg-destructive/90 hover:bg-destructive rounded-full text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            );
          }
        })}

        {/* Pokaż więcej/mniej */}
      </div>
      {allFilters.length > FILTERS_TO_SHOW && (
        <button
          onClick={() => setShowAll((prev) => !prev)}
          className="flex items-center gap-1 text-sm text-[var(--muted-foreground)] hover:text-[var(--accent-main)] transition px-2 mt-4"
        >
          {showAll ? (
            <>
              Zwiń <ChevronUp className="w-3 h-3" />
            </>
          ) : (
            <>
              Zobacz Wszystkie <ChevronDown className="w-3 h-3" />
            </>
          )}
        </button>
      )}
    </div>
  );
}
