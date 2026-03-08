"use client";

import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { useState, useEffect } from "react";
import { AnnouncementOut } from "@/lib/helpers/types";

// components
import { CategoryFilter } from "./filters/CategoryFilter";
import { CategoryFilterOverlay } from "./filters/CategoryFilterOverlay";
import { AnnouncementCard } from "./AnnouncementCard";
import { ActiveFiltersMobile } from "@/components/announcements/filters/ActiveFiltersMobile";
import { SkeletonCard } from "./skeletons/SkeletonCard";
import { Button } from "@/components/ui/button";
import { ActiveFiltersDesktop } from "./filters/ActiveFiltersDesktop";
import { TypeToggle } from "./filters/TypeToggle";
import { MobileSearchSheet } from "./filters/MobileSearchSheet";

// icons
import { ListFilterPlusIcon } from "lucide-react";
import { SearchBar } from "./filters/SearchBar";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Nie udało się pobrać ogłoszeń");
    return res.json();
  });

export function AnnouncementsPage() {
  const [showFilter, setShowFilter] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);

  const searchParams = useSearchParams();

  const category = searchParams.get("category");
  const location = searchParams.get("location");
  const type = searchParams.get("type");

  const query = new URLSearchParams();
  if (type) query.set("type", type);
  if (category) query.set("category", category);
  if (location) query.set("location", location);

  const key = `/api/announcements?${query.toString()}`;

  const {
    data: announcements,
    error,
    isLoading,
  } = useSWR<AnnouncementOut[]>(key, fetcher);

  useEffect(() => {
    if (isLoading) {
      setShowSkeleton(true);
    } else {
      const timeout = setTimeout(() => setShowSkeleton(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-[var(--accent-light)] pt-20 pb-32 px-4 lg:px-8 flex">
      {/* Fixed sidebar */}
      <aside className="hidden lg:flex sticky top-24 left-0 h-[calc(100vh-5rem)] w-[200px] overflow-y-auto pt-4 bg-white rounded-2xl border backdrop-blur-lg border-gray-300 p-2 z-40 flex-col gap-6">
        <div className="border-b py-4 px-2">
          <ActiveFiltersDesktop />
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold mb-2">Wszystkie Kategorie</h3>
          <CategoryFilter />
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 w-full md:ml-8">
        <h1 className="lg:hidden text-2xl pl-4 mb-4 md:mb-12 md:mt-12 border-l-2 border-[var(--accent-main)]">
          Ogłoszenia w Twojej okolicy
        </h1>

        {/* Nagłówek z wyszukiwarką i przełącznikiem typów na desktopie */}
        <div className="hidden lg:flex justify-center mb-8">
          <div className="flex items-center gap-4 w-full max-w-2xl px-6 py-4 rounded-full shadow-lg bg-white/70 backdrop-blur-md border border-gray-100">
            <div className="flex-1">
              <SearchBar />
            </div>
            <div className="flex-shrink-0">
              <TypeToggle />
            </div>
          </div>
        </div>

        {/* Pasek filtrów na mobile*/}
        <div className="lg:hidden flex flex-col gap-4 mb-4">
          <ActiveFiltersMobile />
        </div>

        {/* Lista ogłoszeń */}
        {showSkeleton ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500 mt-6">
            Ups, coś poszło nie tak z ogłoszeniami.
          </div>
        ) : announcements && announcements.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {announcements.map((a) => (
              <AnnouncementCard key={a.id} data={a} />
            ))}
          </div>
        ) : (
          <div className="text-center text-[var(--muted-foreground)] mt-6">
            Brak ogłoszeń w tej chwili.
          </div>
        )}
      </div>

      {/* Warstwa overlay dla filtrów mobilnych */}
      <CategoryFilterOverlay
        open={showFilter}
        onClose={() => setShowFilter(false)}
      />

      {/* Floating dock CTA na dole mobile */}
      <div className="lg:hidden fixed bottom-18 left-0 md:left-1/2 md:-translate-x-1/2 w-full md:max-w-[75%] px-4 z-50">
        <div className="flex flex-row justify-center items-center w-full gap-3 md:gap-5">
          {/* Szukaj miasto w sheet */}
          <MobileSearchSheet />

          {/* Filtruj kategorie */}
          <Button
            variant="default"
            onClick={() => setShowFilter(true)}
            className="flex-1 bg-[var(--accent-main)] hover:bg-[var(--accent-main-hover)] text-white font-semibold rounded-full shadow-xl py-5"
          >
            <ListFilterPlusIcon className="mr-2 h-4 w-4" />
            Filtruj
          </Button>
        </div>
      </div>
    </div>
  );
}
