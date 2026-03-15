"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useLocationSuggestions, CityOption } from "@/hooks/announcement/useLocationSuggestions";
import { MapPinHouse, Loader2, Search } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [inputValue, setInputValue] = useState("");
  const [popoverOpen, setPopoverOpen] = useState(false);

  const { suggestions, isLoading } = useLocationSuggestions(inputValue);

  const cityFromUrl = searchParams.get("city") ?? "";
  const admin1FromUrl = searchParams.get("admin1") ?? "";
  const urlLabel = cityFromUrl
    ? `${cityFromUrl}${admin1FromUrl ? ` (${admin1FromUrl})` : ""}`
    : "";

  const handleSelectCity = (city: CityOption) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lat", String(city.lat));
    params.set("lng", String(city.lng));
    params.set("city", city.name);
    if (city.admin1) params.set("admin1", city.admin1);
    else params.delete("admin1");
    params.delete("all");
    setInputValue("");
    setTimeout(() => setPopoverOpen(false), 100);
    router.push(`/ogloszenia?${params.toString()}`);
  };

  return (
    <div className="relative w-full mx-auto">
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="border-black w-full justify-between text-left text-[var(--text-main)] rounded-full transition-all duration-200 ease-in-out hover:scale-[1.01]"
            onClick={() => setPopoverOpen((prev) => !prev)}
          >
            {inputValue || urlLabel || "Szukaj miasta"}
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin opacity-50 transition-all" />
            ) : (
              <Search className="h-4 w-4 opacity-50 shrink-0 transition-all" />
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          sideOffset={4}
          className="p-0 mx-auto origin-top transition-all duration-200 ease-out data-[state=open]:opacity-100 data-[state=open]:scale-100 opacity-0 scale-95"
        >
          <Command shouldFilter={false} className="w-full">
            <CommandInput
              placeholder="Szukaj miasta..."
              value={inputValue}
              onValueChange={setInputValue}
              className="h-10 w-full"
            />
            <CommandList className="max-h-48 overflow-auto">
              {suggestions.length === 0 && !isLoading ? (
                <CommandEmpty>Brak wyników...</CommandEmpty>
              ) : (
                <CommandGroup>
                  {suggestions.map((city, idx) => (
                    <CommandItem
                      key={idx}
                      onSelect={() => handleSelectCity(city)}
                      className="cursor-pointer transition-colors duration-150"
                    >
                      <MapPinHouse className="mr-2 h-4 w-4 text-[var(--accent-main)]" />
                      <span className="text-[var(--text-main)]">{city.name}</span>
                      {city.admin1 && (
                        <span className="ml-1 text-xs text-gray-400">({city.admin1})</span>
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
