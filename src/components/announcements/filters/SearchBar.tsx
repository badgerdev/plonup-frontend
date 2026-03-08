"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useLocationSuggestions } from "@/hooks/announcement/useLocationSuggestions";
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

  const currentLocations = (searchParams.get("location") || "")
    .split(",")
    .filter(Boolean);

  const [inputValue, setInputValue] = useState("");
  const [popoverOpen, setPopoverOpen] = useState(false);

  const { suggestions, isLoading } = useLocationSuggestions(inputValue);

  const updateUrl = (newLocations: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newLocations.length > 0) {
      params.set("location", newLocations.join(","));
    } else {
      params.delete("location");
    }
    router.push(`/ogloszenia?${params.toString()}`);
  };

  const handleSelectCity = (city: string) => {
    if (!currentLocations.includes(city)) {
      const newList = [...currentLocations, city];
      updateUrl(newList);
    }
    setInputValue("");

    setTimeout(() => {
      setPopoverOpen(false);
    }, 100);
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
            {inputValue || "Szukaj miasta"}
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
              id="mobile-searchbar"
              placeholder="Szukaj miasta..."
              value={inputValue}
              onValueChange={setInputValue}
              className="h-10 w-full"
            />
            <CommandList className="max-h-48 overflow-auto">
              {suggestions.length === 0 && !isLoading ? (
                <CommandEmpty>Brak ogłoszeń w Tym mieście...</CommandEmpty>
              ) : (
                <CommandGroup>
                  {suggestions.map((loc, idx) => (
                    <CommandItem
                      key={idx}
                      onSelect={() => handleSelectCity(loc)}
                      className="cursor-pointer transition-colors duration-150"
                    >
                      <MapPinHouse className="mr-2 h-4 w-4 text-[var(--accent-main)]" />
                      <span className="text-[var(--text-main)]">{loc}</span>
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
