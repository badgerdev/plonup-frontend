"use client";

import { useSearchParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ListFilterPlusIcon,
  MapPinHouse,
  Pencil,
} from "lucide-react";

import { AnnouncementOut } from "@/lib/helpers/types";
import {
  useNearbyAnnouncements,
  NearbyEntry,
} from "@/hooks/announcement/useNearbyAnnouncements";
import { useUserLocation, SavedLocation } from "@/hooks/useUserLocation";
import { AnnouncementCard } from "./AnnouncementCard";
import { RadiusPicker } from "./RadiusPicker";
import { CityInfoPanel } from "./CityInfoPanel";
import { LocationDialog } from "./LocationDialog";
import { CategoryFilter } from "./filters/CategoryFilter";
import { CategoryFilterOverlay } from "./filters/CategoryFilterOverlay";
import { ActiveFiltersMobile } from "./filters/ActiveFiltersMobile";
import { ActiveFiltersDesktop } from "./filters/ActiveFiltersDesktop";
import { SkeletonCard } from "./skeletons/SkeletonCard";
import { SearchBar } from "./filters/SearchBar";
import { TypeToggle } from "./filters/TypeToggle";
import { Button } from "@/components/ui/button";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Błąd pobierania ogłoszeń");
    return res.json();
  });

function NearbyAnnouncementCard({ entry }: { entry: NearbyEntry }) {
  return (
    <div className="relative">
      <AnnouncementCard data={entry} />
      <span className="absolute top-2 right-2 z-20 bg-black/60 text-white text-xs font-semibold px-2 py-0.5 rounded-full pointer-events-none">
        📍 {entry.distance_km} km
      </span>
    </div>
  );
}

export function AnnouncementsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { savedLocation, isLoaded, saveLocation } = useUserLocation();

  const [showFilter, setShowFilter] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [pendingLocation, setPendingLocation] = useState<{
    city: string;
    admin1: string;
  } | null>(null);

  // URL params
  const latParam = searchParams.get("lat");
  const lngParam = searchParams.get("lng");
  const city = searchParams.get("city") ?? "";
  const all = searchParams.get("all");
  const category = searchParams.get("category") ?? undefined;
  const type = searchParams.get("type") ?? undefined;
  const radius = Number(searchParams.get("radius") ?? 50);

  const lat = latParam !== null ? Number(latParam) : null;
  const lng = lngParam !== null ? Number(lngParam) : null;
  const hasGeo = lat !== null && lng !== null;

  // ── Initialization logic (runs once after localStorage has loaded) ────────
  const initDoneRef = useRef(false);

  useEffect(() => {
    if (!isLoaded || initDoneRef.current) return;
    initDoneRef.current = true;

    // Priority 1: savedLocation in localStorage, no URL state → auto-navigate
    if (savedLocation && !all) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("lat", String(savedLocation.lat));
      params.set("lng", String(savedLocation.lng));
      params.set("city", savedLocation.city);
      params.set("admin1", savedLocation.admin1);
      params.set("radius", String(savedLocation.radius));
      params.delete("all");
      router.replace(`/ogloszenia?${params.toString()}`);
      return;
    }

    // Priority 3: nothing saved, nothing in URL, not "all" → show dialog after 600ms
    if (!all) {
      const t = setTimeout(() => setDialogOpen(true), 600);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  // ── Location set handler (from dialog) ────────────────────────────────────
  const handleLocationSet = (loc: SavedLocation) => {
    setPendingLocation({ city: loc.city, admin1: loc.admin1 }); // natychmiastowa aktualizacja UI
    saveLocation(loc);
    setDialogOpen(false);
    const params = new URLSearchParams(searchParams.toString());
    params.set("lat", String(loc.lat));
    params.set("lng", String(loc.lng));
    params.set("city", loc.city);
    params.set("admin1", loc.admin1);
    params.set("radius", String(loc.radius));
    params.delete("all");
    router.push(`/ogloszenia?${params.toString()}`);
  };

  // ── Other handlers ────────────────────────────────────────────────────────
  const handleRadiusChange = (km: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("radius", String(km));
    router.push(`/ogloszenia?${params.toString()}`);
  };

  const handleShowAll = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("lat");
    params.delete("lng");
    params.delete("city");
    params.delete("admin1");
    params.set("all", "true");
    router.push(`/ogloszenia?${params.toString()}`);
  };

  const handleSearchNearby = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("all");
    router.push(`/ogloszenia?${params.toString()}`);
  };

  // ── Data fetching ─────────────────────────────────────────────────────────
  const {
    allResults,
    cityInfo,
    isLoading: geoLoading,
    notFound,
  } = useNearbyAnnouncements(
    hasGeo ? lat : null,
    hasGeo ? lng : null,
    city,
    radius,
    category,
  );

  const allQuery = new URLSearchParams();
  if (category) allQuery.set("category", category);
  if (type) allQuery.set("type", type);

  const {
    data: announcements,
    error,
    isLoading: allLoading,
  } = useSWR<AnnouncementOut[]>(
    all ? `/api/announcements?${allQuery.toString()}` : null,
    fetcher,
  );

  useEffect(() => {
    if (!all) return;
    if (allLoading) {
      setShowSkeleton(true);
    } else {
      const t = setTimeout(() => setShowSkeleton(false), 300);
      return () => clearTimeout(t);
    }
  }, [allLoading, all]);

  // ── Location button label ─────────────────────────────────────────────────
  const locationLabel = pendingLocation?.city || savedLocation?.city;
  const locationAdmin1 = pendingLocation?.admin1 || savedLocation?.admin1;

  return (
    <div className="min-h-screen bg-[var(--accent-light)] pt-20 pb-32 px-4 lg:px-8 flex">
      {/* Sidebar desktop */}
      <aside className="hidden lg:flex sticky top-24 left-0 h-[calc(100vh-5rem)] w-[200px] overflow-y-auto pt-4 bg-white rounded-2xl border border-gray-300 p-2 z-40 flex-col gap-6">
        <div className="border-b py-4 px-2">
          <ActiveFiltersDesktop />
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold mb-2">Wszystkie Kategorie</h3>
          <CategoryFilter />
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 w-full md:ml-8">
        {/* Desktop: SearchBar + location button + TypeToggle */}
        <div className="hidden lg:flex justify-center mb-4">
          <div className="flex items-center gap-3 w-full max-w-2xl px-6 py-4 rounded-full shadow-lg bg-white/70 backdrop-blur-md border border-gray-100">
            <div className="flex-1">
              <SearchBar />
            </div>
            <button
              onClick={() => setDialogOpen(true)}
              className="flex items-center gap-1.5 text-sm text-[var(--accent-dark)] hover:text-[var(--accent-main)] transition-colors whitespace-nowrap shrink-0"
            >
              <MapPinHouse className="h-4 w-4" />
              {locationLabel ? (
                <>
                  {locationLabel}
                  {locationAdmin1 && (
                    <span className="text-muted-foreground text-xs">
                      ({locationAdmin1})
                    </span>
                  )}
                  <Pencil className="h-3 w-3 ml-0.5 opacity-60" />
                </>
              ) : (
                "Ustaw lokalizację"
              )}
            </button>
            <div className="w-px h-5 bg-gray-200" />
            <div className="flex-shrink-0">
              <TypeToggle />
            </div>
          </div>
        </div>

        {/* RadiusPicker — only in geo mode */}
        {hasGeo && (
          <div className="hidden lg:flex mb-4 justify-center">
            <RadiusPicker value={radius} onChange={handleRadiusChange} />
          </div>
        )}

        {/* Active filters mobile */}
        <div className="lg:hidden flex flex-col gap-4 mb-4">
          <ActiveFiltersMobile />
        </div>

        {/* ── State A: no city, no all ── */}
        {!hasGeo && !all && (
          <div className="flex flex-col items-center justify-center mt-24 gap-6 text-center">
            <MapPinHouse className="w-16 h-16 text-[var(--accent-main)] opacity-40" />
            <p className="text-xl font-semibold text-[var(--accent-dark)]">
              Wpisz miasto powyżej
            </p>
            <p className="text-sm text-muted-foreground max-w-xs">
              Znajdź ogłoszenia w swojej okolicy lub przeglądaj wszystkie
              dostępne ogłoszenia.
            </p>
            <button
              onClick={handleShowAll}
              className="text-sm text-gray-500 hover:text-[var(--accent-main)] transition-colors flex items-center gap-1"
            >
              Zobacz wszystkie ogłoszenia
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* ── State B: geo results ── */}
        {hasGeo && (
          <>
            {cityInfo && !geoLoading && (
              <div className="mb-4">
                <CityInfoPanel
                  searchedCity={cityInfo.searched_city}
                  radiusKm={cityInfo.radius_km}
                  inCityCount={cityInfo.in_city_count}
                  nearbyCities={cityInfo.nearby_cities}
                />
              </div>
            )}

            {geoLoading ? (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : notFound ? (
              <p className="text-center text-gray-500 mt-6 text-sm">
                Nie znaleziono wyników dla <strong>{city}</strong>.
              </p>
            ) : allResults.length === 0 ? (
              <p className="text-center text-gray-500 mt-6 text-sm">
                Brak ogłoszeń w <strong>{city}</strong> i okolicy {radius} km.
              </p>
            ) : (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {allResults.map((entry) => (
                  <NearbyAnnouncementCard key={entry.id} entry={entry} />
                ))}
              </div>
            )}

            <div className="mt-8 text-center">
              <button
                onClick={handleShowAll}
                className="text-sm text-gray-500 hover:text-[var(--accent-main)] transition-colors flex items-center gap-1 mx-auto"
              >
                Zobacz wszystkie ogłoszenia
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </>
        )}

        {/* ── State C: all announcements ── */}
        {all && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold border-l-2 border-[var(--accent-main)] pl-3 text-[var(--accent-dark)]">
                Wszystkie ogłoszenia
              </h1>
              <button
                onClick={handleSearchNearby}
                className="hidden lg:flex items-center gap-1 text-sm text-gray-500 hover:text-[var(--accent-main)] transition-colors"
              >
                <MapPinHouse className="h-4 w-4" />
                Szukaj w okolicy
              </button>
            </div>

            {showSkeleton ? (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 9 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : error ? (
              <p className="text-center text-red-500 mt-6">
                Ups, coś poszło nie tak z ogłoszeniami.
              </p>
            ) : announcements && announcements.length > 0 ? (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {announcements.map((a) => (
                  <AnnouncementCard key={a.id} data={a} />
                ))}
              </div>
            ) : (
              <p className="text-center text-[var(--muted-foreground)] mt-6">
                Brak ogłoszeń w tej chwili.
              </p>
            )}
          </>
        )}
      </div>

      {/* Dialogs & overlays */}
      <LocationDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onLocationSet={handleLocationSet}
      />
      <CategoryFilterOverlay
        open={showFilter}
        onClose={() => setShowFilter(false)}
      />

      {/* Mobile floating dock */}
      <div className="lg:hidden fixed bottom-18 left-0 md:left-1/2 md:-translate-x-1/2 w-full md:max-w-[75%] px-4 z-50">
        <div className="flex flex-row justify-center items-center w-full gap-3 md:gap-5">
          <Button
            variant="outline"
            onClick={() => setDialogOpen(true)}
            className="flex-1 border-zinc-400 text-gray-700 font-semibold bg-white hover:bg-gray-100 shadow-xl rounded-full py-5"
          >
            <MapPinHouse className="mr-2 h-4 w-4" />
            {locationLabel ?? "Ustaw lokalizację"}
          </Button>
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
