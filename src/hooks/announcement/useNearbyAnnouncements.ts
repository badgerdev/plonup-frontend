import useSWR from "swr";
import { AnnouncementOut } from "@/lib/helpers/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export interface NearbyEntry extends AnnouncementOut {
  distance_km: number;
}

export interface NearbyCityInfo {
  searched_city: string;
  radius_km: number;
  in_city_count: number;
  nearby_cities: { name: string; distance_km: number; count: number }[];
}

interface NearbyResponse {
  searched_city?: string;
  radius_km?: number;
  in_city?: NearbyEntry[];
  nearby?: NearbyEntry[];
  city_info?: NearbyCityInfo;
  error?: string;
}

interface UseNearbyAnnouncementsResult {
  inCity: NearbyEntry[];
  nearby: NearbyEntry[];
  allResults: NearbyEntry[];
  cityInfo: NearbyCityInfo | null;
  searchedCity: string;
  isLoading: boolean;
  notFound: boolean;
}

export function useNearbyAnnouncements(
  lat: number | null,
  lng: number | null,
  city: string,
  radiusKm: number,
  category?: string
): UseNearbyAnnouncementsResult {
  const hasCoords = lat !== null && lng !== null;

  const params = new URLSearchParams({ radius_km: String(radiusKm) });
  if (hasCoords) {
    params.set("lat", String(lat));
    params.set("lng", String(lng));
  }
  if (city) params.set("city", city);
  if (category) params.set("category", category);

  const { data, isLoading } = useSWR<NearbyResponse>(
    hasCoords || city ? `/api/announcements/nearby?${params.toString()}` : null,
    fetcher,
    { dedupingInterval: 500, keepPreviousData: true }
  );

  const inCity = data?.in_city ?? [];
  const nearby = data?.nearby ?? [];
  const allResults = [...inCity, ...nearby].sort(
    (a, b) => a.distance_km - b.distance_km
  );

  return {
    inCity,
    nearby,
    allResults,
    cityInfo: data?.city_info ?? null,
    searchedCity: data?.searched_city ?? city,
    isLoading,
    notFound: !!data?.error,
  };
}
