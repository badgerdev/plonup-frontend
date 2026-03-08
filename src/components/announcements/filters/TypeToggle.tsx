"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState, useEffect } from "react";
import { User, Building2 } from "lucide-react";

export function TypeToggle() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const current = searchParams.get("type");
  const [type, setType] = useState<string | undefined>(current || undefined);

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (type) {
      newParams.set("type", type);
    } else {
      newParams.delete("type");
    }
    router.push(`/ogloszenia?${newParams.toString()}`);
  }, [type, searchParams, router]);

  return (
    <ToggleGroup
      type="single"
      value={type}
      onValueChange={(val) =>
        setType((prev) => (val === prev ? undefined : val))
      }
      className="flex gap-2"
    >
      <ToggleGroupItem
        value="private"
        className="flex items-center gap-2 px-4 py-2 text-sm border bg-white shadow-sm
      text-[var(--text-main)] hover:text-[var(--text-main-darker)]
      hover:bg-accent
      data-[state=on]:text-[var(--accent-dark)]
      data-[state=on]:border-[var(--accent-green)]
      !rounded-full data-[state=on]:rounded-full
      transition-all duration-200 ease-out
      hover:scale-105 active:scale-95"
      >
        <User className="w-4 h-4 transition-transform duration-200 group-data-[state=on]:scale-110" />
        Prywatne
      </ToggleGroupItem>

      <ToggleGroupItem
        value="business"
        className="flex items-center gap-2 px-4 py-2 text-sm border bg-white shadow-sm
      text-[var(--text-main)] hover:text-[var(--text-main-darker)]
      hover:bg-accent
      data-[state=on]:text-[var(--accent-dark)]
      data-[state=on]:border-[var(--accent-third)]
      !rounded-full data-[state=on]:rounded-full
      transition-all duration-200 ease-out
      hover:scale-105 active:scale-95"
      >
        <Building2 className="w-4 h-4 transition-transform duration-200 group-data-[state=on]:scale-110" />
        Firmowe
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
