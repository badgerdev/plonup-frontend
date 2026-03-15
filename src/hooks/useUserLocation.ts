"use client";

import { useState, useEffect } from "react";

export type SavedLocation = {
  city: string;
  admin1: string;
  lat: number;
  lng: number;
  radius: number;
};

const LS_KEY = "plonup_location";

function readFromStorage(): SavedLocation | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as SavedLocation) : null;
  } catch {
    return null;
  }
}

export function useUserLocation() {
  const [savedLocation, setSavedLocation] = useState<SavedLocation | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setSavedLocation(readFromStorage());
    setIsLoaded(true);
  }, []);

  const saveLocation = (loc: SavedLocation) => {
    localStorage.setItem(LS_KEY, JSON.stringify(loc));
    setSavedLocation(loc);
  };

  const clearLocation = () => {
    localStorage.removeItem(LS_KEY);
    setSavedLocation(null);
  };

  const requestGPS = (): Promise<SavedLocation | null> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await fetch(
              `/api/cities/nearest?lat=${latitude}&lng=${longitude}`
            );
            if (!res.ok) { resolve(null); return; }
            const data = await res.json();
            if (!data) { resolve(null); return; }
            resolve({
              city: data.name,
              admin1: data.admin1,
              lat: data.lat,
              lng: data.lng,
              radius: 50,
            });
          } catch {
            resolve(null);
          }
        },
        () => resolve(null),
        { timeout: 10000 }
      );
    });
  };

  return { savedLocation, isLoaded, saveLocation, clearLocation, requestGPS };
}
