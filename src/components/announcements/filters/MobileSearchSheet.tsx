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
import { useLocationSuggestions } from "@/hooks/announcement/useLocationSuggestions";

export function MobileSearchSheet() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const { suggestions } = useLocationSuggestions(query);

  const handleSearch = (value?: string) => {
    const raw = value ?? query;
    if (!raw.trim()) return;

    const loc = value?.trim() || suggestions[0]?.trim() || query.trim();

    // 1. pobierz aktualne paramy
    const params = new URLSearchParams(searchParams.toString());

    // 2. obecna lista lokalizacji
    const currentLocations = (params.get("location") || "")
      .split(",")
      .filter(Boolean);

    // 3. dodaj nowe jeśli go jeszcze nie ma
    if (!currentLocations.includes(loc)) {
      currentLocations.push(loc);
    }

    // 4. zapisz w paramach
    if (currentLocations.length > 0) {
      params.set("location", currentLocations.join(","));
    } else {
      params.delete("location");
    }

    // 5. zamknij sheet i nawiguj
    setOpen(false);
    router.push(`/ogloszenia?${params.toString()}`);
  };

  return (
    <>
      {/* Trigger button */}
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
            <p className="text-xs text-muted-foreground font-semibold">
              <span className="text-sm text-[var(--accent-main)]">*</span>
              Pracujemy nad mapką i potrzebujemy trochę czasu... <br />
              <span>Nie zniechęcaj się, szukaj w swojej okolicy!</span>
            </p>
          </SheetHeader>

          {/* Input */}
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
                if (e.key === "Enter") {
                  if (suggestions[highlightedIndex]) {
                    handleSearch(suggestions[highlightedIndex]);
                  } else {
                    handleSearch();
                  }
                }
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setHighlightedIndex((prev) =>
                    Math.min(prev + 1, suggestions.length - 1)
                  );
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

          {/* Suggestions */}
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
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            ) : query.length > 2 ? (
              <p className="text-gray-500 text-sm mt-6 px-2">
                W tej chwili brak ogłoszeń w Twoim mieście, sprawdź okolice!
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
