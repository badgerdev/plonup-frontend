import { useEffect, useState } from "react";

export function useLocationSuggestions(query: string) {
  const [locations, setLocations] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/announcements/locations")
      .then((res) => res.json())
      .then((data) => {
        setLocations(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("❌ Błąd pobierania lokalizacji:", err);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = locations.filter((loc) =>
      loc.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filtered);
  }, [query, locations]);

  return { suggestions, isLoading };
}
