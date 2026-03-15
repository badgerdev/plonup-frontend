"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { useNearbyAnnouncements, NearbyEntry } from "@/hooks/announcement/useNearbyAnnouncements";

interface Props {
  city: string;
  radiusKm: number;
  category?: string;
}

function SkeletonNearbyCard() {
  return (
    <div className="animate-pulse rounded-2xl bg-white border border-gray-200 p-4 flex flex-col gap-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-100 rounded w-1/2" />
      <div className="h-3 bg-gray-100 rounded w-1/3" />
    </div>
  );
}

function NearbyCard({ entry }: { entry: NearbyEntry }) {
  return (
    <Link href={`/ogloszenia/${entry.id}`}>
      <div className="rounded-2xl bg-white border border-gray-200 p-4 flex flex-col gap-2 hover:shadow-md transition-shadow cursor-pointer">
        <p className="font-semibold text-[var(--text-main)] line-clamp-2 text-sm">
          {entry.title}
        </p>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <MapPin className="h-3 w-3 text-[var(--accent-main)]" />
          <span>{entry.location}</span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs bg-[var(--accent-light)] text-[var(--accent-main)] px-2 py-0.5 rounded-full">
            {entry.category}
          </span>
          <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
            📍 {entry.distance_km} km
          </span>
        </div>
      </div>
    </Link>
  );
}

function Section({ title, entries }: { title: string; entries: NearbyEntry[] }) {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4 border-l-2 border-[var(--accent-main)] pl-3">
        {title}
      </h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <NearbyCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}

export function NearbyResults({ city, radiusKm, category }: Props) {
  const { inCity, nearby, searchedCity, isLoading, notFound } = useNearbyAnnouncements(
    city,
    radiusKm,
    category
  );

  if (isLoading) {
    return (
      <div className="mt-8">
        <div className="h-5 bg-gray-200 rounded w-48 mb-4 animate-pulse" />
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonNearbyCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="mt-8 text-center text-gray-500 text-sm">
        Nie znaleziono miasta <strong>{city}</strong> w naszej bazie.
      </div>
    );
  }

  if (inCity.length === 0 && nearby.length === 0) {
    return (
      <div className="mt-8 text-center text-gray-500 text-sm">
        Brak ogłoszeń w <strong>{searchedCity}</strong> i okolicy {radiusKm} km.
        Spróbuj zwiększyć promień.
      </div>
    );
  }

  return (
    <div>
      {inCity.length > 0 && (
        <Section title={`📍 Ogłoszenia w ${searchedCity}`} entries={inCity} />
      )}
      {nearby.length > 0 && (
        <Section
          title={`🌍 Zobacz także w okolicy (${radiusKm} km)`}
          entries={nearby}
        />
      )}
    </div>
  );
}
