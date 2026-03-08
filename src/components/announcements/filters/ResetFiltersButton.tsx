"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

export function ResetFiltersButton() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const category = searchParams.get("category");
  const location = searchParams.get("location");

  const hasFilters = !!category || !!location;

  if (!hasFilters) return null;

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-1 border-[var(--accent-main)] text-[var(--accent-main)] hover:bg-[var(--accent-main)/10]"
      onClick={() => router.push("/ogloszenia")}
    >
      <XCircle className="w-4 h-4" />
      Wyczyść filtry
    </Button>
  );
}
