"use client";

import { useState, useEffect } from "react";
import { Loader2, MapPin, MapPinHouse, Navigation } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

import { RadiusPicker } from "./RadiusPicker";
import { useLocationSuggestions, CityOption } from "@/hooks/announcement/useLocationSuggestions";
import { SavedLocation, useUserLocation } from "@/hooks/useUserLocation";

interface Props {
  open: boolean;
  onClose: () => void;
  onLocationSet: (loc: SavedLocation) => void;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

function LocationDialogContent({ onClose, onLocationSet }: Omit<Props, "open">) {
  const { requestGPS } = useUserLocation();

  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState(false);

  const [cityQuery, setCityQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);
  const [radius, setRadius] = useState(50);

  const { suggestions } = useLocationSuggestions(cityQuery);

  const showDropdown = suggestions.length > 0 && !selectedCity;

  const handleGPS = async () => {
    setGpsLoading(true);
    setGpsError(false);
    const loc = await requestGPS();
    setGpsLoading(false);
    if (loc) {
      onLocationSet(loc);
    } else {
      setGpsError(true);
    }
  };

  const handleSelectCity = (city: CityOption) => {
    setSelectedCity(city);
    setCityQuery(`${city.name}${city.admin1 ? ` (${city.admin1})` : ""}`);
  };

  const handleSearch = () => {
    if (!selectedCity) return;
    onLocationSet({
      city: selectedCity.name,
      admin1: selectedCity.admin1,
      lat: selectedCity.lat,
      lng: selectedCity.lng,
      radius,
    });
  };

  return (
    <div className="flex flex-col gap-5 pt-2">
      {/* GPS button */}
      <div className="flex flex-col gap-2">
        <Button
          onClick={handleGPS}
          disabled={gpsLoading}
          className="w-full py-6 text-base bg-[var(--accent-main)] hover:bg-[var(--accent-main-hover)] text-white rounded-xl"
        >
          {gpsLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Wykrywam lokalizację...
            </>
          ) : (
            <>
              <Navigation className="mr-2 h-5 w-5" />
              Użyj mojej lokalizacji GPS
            </>
          )}
        </Button>
        {gpsError && (
          <p className="text-sm text-destructive text-center">
            Brak dostępu do GPS — wpisz miasto ręcznie
          </p>
        )}
        <p className="text-xs text-muted-foreground text-center">
          Twoja lokalizacja jest przechowywana tylko w tej przeglądarce i nie jest wysyłana na serwer.
        </p>
      </div>

      {/* Separator */}
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <div className="flex-1 h-px bg-border" />
        lub wpisz miasto
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* City autocomplete */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Szukaj miasta..."
          value={cityQuery}
          onChange={(e) => {
            setCityQuery(e.target.value);
            setSelectedCity(null);
          }}
          autoComplete="off"
        />
        {showDropdown && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
            {suggestions.map((city, i) => (
              <button
                key={i}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelectCity(city);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-50 cursor-pointer"
              >
                <MapPin className="h-3 w-3 text-muted-foreground shrink-0" />
                <span className="font-medium">{city.name}</span>
                {city.admin1 && (
                  <span className="text-muted-foreground text-xs">({city.admin1})</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* RadiusPicker */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Promień wyszukiwania</p>
        <RadiusPicker value={radius} onChange={setRadius} />
      </div>

      {/* Search button */}
      <Button
        onClick={handleSearch}
        disabled={!selectedCity}
        className="w-full py-5 bg-[var(--accent-main)] hover:bg-[var(--accent-main-hover)] text-white rounded-xl"
      >
        Szukaj w okolicy
      </Button>

      {/* Skip link */}
      <button
        onClick={onClose}
        className="text-sm text-muted-foreground hover:text-foreground transition-colors text-center"
      >
        Pomiń — pokaż wszystkie ogłoszenia
      </button>
    </div>
  );
}

export function LocationDialog({ open, onClose, onLocationSet }: Props) {
  const isMobile = useIsMobile();

  const header = (
    <>
      <div className="flex items-center gap-2">
        <MapPinHouse className="h-5 w-5 text-[var(--accent-main)]" />
        <span>Znajdź ogłoszenia w okolicy</span>
      </div>
      <p className="text-sm text-muted-foreground font-normal mt-1">
        Zapisz swoją lokalizację — przy kolejnej wizycie automatycznie pokażemy Ci ogłoszenia w pobliżu.
      </p>
    </>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
        <SheetContent side="bottom" className="h-auto max-h-[85vh] overflow-y-auto px-4 pb-8 rounded-t-2xl">
          <SheetHeader className="text-left mb-2">
            <SheetTitle>{header}</SheetTitle>
            <SheetDescription className="sr-only">
              Wybierz lokalizację aby zobaczyć ogłoszenia w pobliżu.
            </SheetDescription>
          </SheetHeader>
          <LocationDialogContent onClose={onClose} onLocationSet={onLocationSet} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{header}</DialogTitle>
          <DialogDescription className="sr-only">
            Wybierz lokalizację aby zobaczyć ogłoszenia w pobliżu.
          </DialogDescription>
        </DialogHeader>
        <LocationDialogContent onClose={onClose} onLocationSet={onLocationSet} />
      </DialogContent>
    </Dialog>
  );
}
