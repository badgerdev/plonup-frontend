"use client";

import { usePathname } from "next/navigation";
import { BottomMobileNav } from "@/components/navigation/BottomMobileNav";

/**
 * Wrapper klientowy dla BottomMobileNav.
 * Zapewnia fixed pozycjonowanie na dole ekranu i
 * ukrywa nav w procesie dodawania ogłoszenia.
 */
export function BottomMobileNavWrapper() {
  const pathname = usePathname();
  const hideNav = pathname.startsWith("/ogloszenia/dodaj");

  if (hideNav) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[var(--accent-light)] border-t border-zinc-200 shadow-sm safe-bottom animate-fade-in-bottom">
      <BottomMobileNav />
    </div>
  );
}
