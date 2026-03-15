import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export interface CityOption {
  name: string;
  admin1: string;
  lat: number;
  lng: number;
}

export function useLocationSuggestions(query: string) {
  const { data, isLoading } = useSWR<CityOption[]>(
    query.length >= 2 ? `/api/cities/autocomplete?q=${encodeURIComponent(query)}` : null,
    fetcher,
    {
      dedupingInterval: 300,
      keepPreviousData: true,
    }
  );

  return { suggestions: data ?? [], isLoading };
}
