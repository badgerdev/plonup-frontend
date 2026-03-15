"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { MapPinHouse, Search } from "lucide-react";
import { useLocationSuggestions, CityOption } from "@/hooks/announcement/useLocationSuggestions";

export function MobileSearchSheet() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const { suggestions } = useLocationSuggestions(query);

  const handleSearch = (city?: CityOption) => {
    const selected = city ?? suggestions[highlightedIndex];
    if (!selected) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("lat", String(selected.lat));
    params.set("lng", String(selected.lng));
    params.set("city", selected.name);
    params.delete("all");

    setOpen(false);
    router.push(`/ogloszenia?${params.toString()}`);
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="flex-1 border-zinc-400 text-gray-700 font-semibold bg-white hover:bg-gray-100 shadow-xl rounded-full py-5"
      >
        <MapPinHouse className="mr-2 h-4 w-4" />
        Znajdź miasto
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="bottom"
          className="h-[100vh] flex flex-col px-2 pt-6 pb-6"
        >
          <SheetHeader>
            <SheetTitle className="text-xl flex items-center gap-1">
              <MapPinHouse className="w-6 h-6 text-black" />
              Wyszukaj swoje miasto
            </SheetTitle>
          </SheetHeader>

          <div className="flex items-center gap-2 mt-2">
            <Input
              autoFocus
              type="text"
              placeholder="Wpisz miasto..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setHighlightedIndex(0);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setHighlightedIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
                }
                if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setHighlightedIndex((prev) => Math.max(prev - 1, 0));
                }
              }}
              className="flex-1 h-10 text-base"
            />
            <Button
              onClick={() => handleSearch()}
              className="h-10 px-4 bg-[var(--accent-main)] hover:bg-[var(--accent-main-hover)] text-white rounded-full"
            >
              <Search />
            </Button>
          </div>

          <div className="mt-6 flex-1 overflow-y-auto">
            {suggestions.length > 0 ? (
              <ul className="space-y-2">
                {suggestions.slice(0, 10).map((s, i) => (
                  <li key={i}>
                    <button
                      onClick={() => handleSearch(s)}
                      className={`w-full px-3 py-2 text-left text-sm font-medium transition-colors ${
                        i === highlightedIndex
                          ? "bg-gray-100 text-gray-800 border-l-2 border-[var(--accent-main)]"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      {s.name}
                      {s.admin1 && (
                        <span className="ml-1 text-xs text-gray-400">({s.admin1})</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            ) : query.length > 2 ? (
              <p className="text-gray-500 text-sm mt-6 px-2">
                Brak wyników dla &quot;{query}&quot;
              </p>
            ) : (
              <p className="text-gray-400 text-sm mt-6 px-2">
                Wpisz minimum 3 znaki...
              </p>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
