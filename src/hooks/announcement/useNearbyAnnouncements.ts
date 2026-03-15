import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export interface NearbyEntry {
  id: number;
  title: string;
  category: string;
  location: string;
  listing_type: string;
  distance_km: number;
}

interface NearbyResponse {
  searched_city?: string;
  radius_km?: number;
  in_city?: NearbyEntry[];
  nearby?: NearbyEntry[];
  error?: string;
}

interface UseNearbyAnnouncementsResult {
  inCity: NearbyEntry[];
  nearby: NearbyEntry[];
  searchedCity: string;
  isLoading: boolean;
  notFound: boolean;
}

export function useNearbyAnnouncements(
  city: string,
  radiusKm: number,
  category?: string
): UseNearbyAnnouncementsResult {
  const params = new URLSearchParams({ city, radius_km: String(radiusKm) });
  if (category) params.set("category", category);

  const { data, isLoading } = useSWR<NearbyResponse>(
    city ? `/api/announcements/nearby?${params.toString()}` : null,
    fetcher,
    { dedupingInterval: 500, keepPreviousData: true }
  );

  return {
    inCity: data?.in_city ?? [],
    nearby: data?.nearby ?? [],
    searchedCity: data?.searched_city ?? city,
    isLoading,
    notFound: !!data?.error,
  };
}
