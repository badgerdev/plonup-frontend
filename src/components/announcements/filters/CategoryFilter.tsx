// components/announcements/filters/CategoryFilter.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/lib/constants/categories";
import { CategoryToggle } from "./CategoryToggle";

export function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const location = searchParams.get("location");
  const selected = (searchParams.get("category") || "")
    .split(",")
    .filter(Boolean);

  const toggleCategory = (key: string) => {
    const newSelected = selected.includes(key)
      ? selected.filter((c) => c !== key)
      : [...selected, key];

    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (newSelected.length > 0) {
      params.set("category", newSelected.join(","));
    }
    router.push(`/ogloszenia?${params.toString()}`);
  };

  return (
    <div>
      <div className="flex flex-col gap-1 mb-12">
        {CATEGORIES.map(({ key, label, icon }) => (
          <CategoryToggle
            key={key}
            keyName={key}
            label={label}
            icon={icon}
            isSelected={selected.includes(key)}
            toggle={() => toggleCategory(key)}
          />
        ))}
      </div>
    </div>
  );
}
