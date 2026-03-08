"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useFetchUnreadCount } from "@/hooks/notifications/useFetchUnreadCount";
import { useAuth } from "@/hooks/auth/useAuth";

import { MobileMenu } from "./MobileMenu";
import { UserMenu } from "./UserMenu";
import { FilePlus, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Navbar() {
  const { isAuthenticated, loading } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useFetchUnreadCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 22);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return (
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-sm shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Skeleton className="h-6 w-24 rounded-md" />
          <div className="flex space-x-4">
            <Skeleton className="h-8 w-20 rounded-md" />
            <Skeleton className="h-8 w-24 rounded-md" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isScrolled
          ? "bg-[var(--accent-light)] backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold text-[var(--accent-main)]"
        >
          Plonup
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-6 text-zinc-600">
          <Link
            href="/ogloszenia"
            className="hover:text-zinc-900 transition-colors font-semibold"
          >
            Ogłoszenia
          </Link>
          <Link
            href="/jak-zaczac"
            className="hover:text-zinc-900 transition-colors font-semibold"
          >
            Jak zacząć?
          </Link>

          <Link
            href="/patron"
            className="hover:text-[var(--accent-main)] underline underline-offset-4 decoration-[var(--accent-main)] transition-all font-semibold"
          >
            Zostań Patronem
          </Link>

          {/* Drugorzędne – pokazują się dopiero od xl */}
          <div className="hidden xl:flex items-center space-x-6">
            <Link
              href="/poznaj"
              className="hover:text-zinc-900 transition-colors font-semibold"
            >
              Poznaj Plonup
            </Link>
            <Link
              href="/kontakt"
              className="hover:text-zinc-900 transition-colors font-semibold"
            >
              Kontakt
            </Link>
            <Link
              href="/blog"
              className="hover:text-zinc-900 transition-colors font-semibold"
            >
              Blog
            </Link>
          </div>

          {/* cta */}
          <Link
            href="/ogloszenia/dodaj"
            className="bg-[var(--accent-main)] hover:bg-[var(--accent-main-hover)] text-white font-medium px-3 lg:px-4 py-2 rounded-md text-xs lg:text-sm transition-all flex gap-2 items-center"
          >
            <FilePlus className="w-4 h-4" />
            Dodaj ogłoszenie
          </Link>

          {/* User Menu / Login */}
          {isAuthenticated ? (
            <div>
              <UserMenu />
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1 text-sm text-gray-700 hover:text-[var(--accent-main)] pl-4 border-l border-gray-300 transition-colors"
            >
              <User className="w-4 h-4 text-gray-500" />
              Zaloguj
            </Link>
          )}
        </nav>

        {/* Mobile Nav – aktywne aż do xl */}
        <MobileMenu />
      </div>
    </header>
  );
}
