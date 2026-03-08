"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/auth/useAuth";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { LayoutPanelLeft, PlusCircle, Search, User } from "lucide-react";

import { NotificationBadge } from "@/components/shared/NotificationBadge";

export function BottomMobileNav() {
  const { isAuthenticated, loading } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  if (loading) {
    return (
      <div className="fixed bottom-0 left-0 w-full z-40 bg-white border-t flex justify-around items-center h-16 shadow-sm px-4">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-8 w-20 rounded-full" />
        <Skeleton className="h-6 w-16" />
      </div>
    );
  }

  return (
    <nav className="fixed bottom-0 left-0 w-full z-40 bg-[var(--accent-light)] border-t flex justify-around items-center h-16 shadow-sm">
      <Link
        href="/ogloszenia"
        className={cn(
          "flex flex-col items-center text-xs transition-colors duration-200",
          isActive("/ogloszenia")
            ? "text-[var(--accent-main)] font-semibold"
            : "text-zinc-500 hover:text-zinc-700"
        )}
      >
        <Search className="w-5 h-5 mb-1" />
        Odkrywaj
      </Link>

      <Link
        href="/ogloszenia/dodaj"
        className="bg-[var(--accent-main)] hover:bg-[var(--accent-main-hover)] text-white px-4 py-2 rounded-full shadow-md flex items-center gap-1 text-sm font-semibold transition-colors duration-200"
      >
        <PlusCircle className="w-5 h-5" />
        Dodaj
      </Link>

      <Link
        href={isAuthenticated ? "/panel" : "/login"}
        className={cn(
          "flex flex-col items-center text-xs transition-colors duration-200",
          pathname.startsWith("/panel")
            ? "text-[var(--accent-main)] font-semibold"
            : "text-zinc-500 hover:text-zinc-700"
        )}
      >
        {isAuthenticated ? (
          <div className="relative flex flex-col items-center">
            <LayoutPanelLeft className="w-5 h-5 mb-1" />
            <NotificationBadge
              variant="pulse"
              className="absolute top-0 -right-2"
            />
            <span>Panel</span>
          </div>
        ) : (
          <>
            <User className="w-5 h-5 mb-1" />
            Zaloguj
          </>
        )}
      </Link>
    </nav>
  );
}
