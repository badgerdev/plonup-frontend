"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocationSuggestions, CityOption } from "@/hooks/announcement/useLocationSuggestions";
import { MapPinHouse, Search, SquareArrowOutUpRight } from "lucide-react";
import { TypingEffect } from "../typing-effect/TypingEffect";
import { HeroSearchMobileSheet } from "./HeroSearchMobileSheet";
import Link from "next/link";

export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const { suggestions } = useLocationSuggestions(query);

  const handleSelectCity = (city: CityOption) => {
    router.push(
      `/ogloszenia?lat=${city.lat}&lng=${city.lng}&city=${encodeURIComponent(city.name)}&radius=50`
    );
  };

  const handleSearch = () => {
    const selected = suggestions[highlightedIndex];
    if (selected) handleSelectCity(selected);
  };

  return (
    <section className="w-full flex flex-col items-center justify-center text-center px-4">
      <div className="z-10 max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--accent-dark)] animate-fade-in-up animate-delay-[200ms] text-left">
          Plonup, podziel się tym co masz.
        </h1>
        <TypingEffect text="Prostsze niż kiedykolwiek" />

        <p className="text-sm md:text-base text-muted-foreground animate-fade-in-up animate-delay-[300ms] text-left">
          Nadmiar zbiorów, warzywa, owoce, lokalne produkty – wszystko w jednym
          miejscu.
        </p>

        {/* DESKTOP: dropdown */}
        <div className="hidden lg:flex items-center justify-center gap-3 mt-6 w-full sm:w-auto animate-fade-in-up animate-delay-[400ms]">
          <div className="relative w-full max-w-sm sm:w-[360px] flex items-center gap-2 z-[9999]">
            <span className="relative flex items-center justify-center w-6 h-6">
              <MapPinHouse className="w-6 h-6 text-gray-500 animate-pulse-icon" />
            </span>

            <Input
              type="text"
              placeholder="Znajdź ogłoszenia w swoim mieście..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setHighlightedIndex(0);
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 150)}
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
              className="text-xs md:text-base w-full h-10"
            />

            {isFocused && (
              <div className="absolute top-full left-6 md:left-0 mt-2 w-full rounded-md border-2 bg-white shadow z-[9999] text-left overflow-hidden py-2">
                {suggestions.length > 0 ? (
                  <>
                    {suggestions.slice(0, 4).map((s, i) => (
                      <button
                        key={i}
                        className={`w-full px-3 py-2 text-sm font-semibold text-left transition-colors ${
                          i === highlightedIndex
                            ? "border-l-2 border-[var(--accent-main)] text-gray-700 bg-gray-100"
                            : "border-l-2 border-transparent text-gray-700 hover:text-[var(--accent-main)] hover:cursor-pointer"
                        }`}
                        onMouseDown={() => handleSelectCity(s)}
                      >
                        {s.name}
                        {s.admin1 && (
                          <span className="ml-1 text-xs font-normal text-gray-400">
                            ({s.admin1})
                          </span>
                        )}
                      </button>
                    ))}
                    {suggestions.length > 5 && (
                      <Link
                        href="/ogloszenia"
                        className="text-sm px-4 hover:text-black text-gray-700 select-none mb-2 flex items-center gap-1 w-full bg-gray-100 py-2 justify-center"
                      >
                        Zobacz Wszystkie
                        <SquareArrowOutUpRight className="w-4 h-4" />
                      </Link>
                    )}
                  </>
                ) : query.length > 0 && query.length < 3 ? (
                  <p className="px-3 py-2 text-sm text-gray-400 select-none">
                    Podaj minimum 3 znaki, aby zobaczyć wyniki
                  </p>
                ) : query.length >= 3 ? (
                  <p className="px-3 py-2 text-sm text-gray-500 select-none">
                    Brak wyników dla &quot;{query}&quot;
                  </p>
                ) : null}

                <p className="px-3 py-2 mt-2 text-xs text-muted-foreground font-semibold border-t">
                  <span className="text-sm text-[var(--accent-main)]">*</span>{" "}
                  Pracujemy nad mapką i potrzebujemy trochę czasu... <br />
                  <span>Nie zniechęcaj się, szukaj w swojej okolicy!</span>
                </p>
              </div>
            )}
          </div>

          <Button
            onClick={handleSearch}
            className="h-10 px-5 text-base bg-[var(--accent-main)] hover:bg-[var(--accent-main-hover)] text-white rounded-full hover:cursor-pointer"
          >
            <Search />
          </Button>
        </div>

        {/* MOBILE: Sheet */}
        <div className="lg:hidden mt-6 animate-fade-in-up animate-delay-[400ms] w-full">
          <HeroSearchMobileSheet />
        </div>
      </div>
    </section>
  );
}
