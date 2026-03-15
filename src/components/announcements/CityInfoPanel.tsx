"use client";

interface NearbyCityEntry {
  name: string;
  distance_km: number;
  count: number;
}

interface Props {
  searchedCity: string;
  radiusKm: number;
  inCityCount: number;
  nearbyCities: NearbyCityEntry[];
}

export function CityInfoPanel({
  searchedCity,
  radiusKm,
  inCityCount,
  nearbyCities,
}: Props) {
  return (
    <div className="rounded-xl bg-white border border-gray-200 px-4 py-3 text-sm text-[var(--text-main)] flex flex-col gap-2">
      <p className="font-semibold text-[var(--accent-dark)]">
        Wyniki dla: <span className="text-[var(--accent-main)]">{searchedCity}</span>{" "}
        &bull; promień {radiusKm} km
      </p>

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
        <span>
          📍 W {searchedCity}: <strong>{inCityCount}</strong>{" "}
          {inCityCount === 1 ? "ogłoszenie" : inCityCount < 5 ? "ogłoszenia" : "ogłoszeń"}
        </span>

        {nearbyCities.length > 0 && (
          <span className="flex flex-wrap gap-x-2">
            🌍 W okolicy:{" "}
            {nearbyCities.map((c, i) => (
              <span key={c.name}>
                {c.name} {c.distance_km} km ({c.count})
                {i < nearbyCities.length - 1 && " •"}
              </span>
            ))}
          </span>
        )}
      </div>
    </div>
  );
}
