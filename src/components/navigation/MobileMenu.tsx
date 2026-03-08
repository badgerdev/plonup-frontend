"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/auth/useAuth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { NotificationBadge } from "@/components/shared/NotificationBadge";
import { useFetchUnreadCount } from "@/hooks/notifications/useFetchUnreadCount";
import { useLogout } from "@/hooks/auth/useLogout";
import { TypingEffect } from "../typing-effect/TypingEffect";

// ui
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Menu,
  UserCircle,
  Info,
  BookOpen,
  Heart,
  MessageCircle,
  LogOut,
  Rocket,
  LogIn,
  LayoutPanelLeft,
  UserPen,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { OpenCookieSettingsButton } from "../cookies-consent/OpenCookieSettingButton";

export function MobileMenu() {
  const { user, isAuthenticated, loading } = useAuth();
  useFetchUnreadCount();

  const router = useRouter();
  const { handleLogout } = useLogout();

  const [open, setOpen] = useState(false);

  const handleNavigate = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  if (loading) {
    return (
      <div className="md:hidden px-4 py-2">
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    );
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className="flex lg:hidden items-center gap-2">
        {isAuthenticated && (
          <span className="text-sm text-gray-600 font-medium hidden sm:block">
            Witaj, {user?.username}
          </span>
        )}
        <SheetTrigger asChild>
          <Button variant="ghost" className="h-14 w-14 p-0">
            <Menu
              className={`text-gray-700 transition-transform duration-300 ease-in-out ${
                open ? "rotate-90" : "rotate-0"
              }`}
              style={{ width: "24px", height: "24px", padding: "0" }}
            />
          </Button>
        </SheetTrigger>
      </div>

      <SheetContent
        side="left"
        className="w-72 flex flex-col px-0 bg-[var(--accent-light)] border-r text-gray-900"
      >
        <SheetHeader className="px-4 pt-4 pb-4">
          <SheetTitle className="sr-only">Menu nawigacyjne</SheetTitle>
          {isAuthenticated ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <UserCircle className="w-10 h-10 text-gray-400" />
                <p className="text-sm font-semibold text-gray-800">
                  Witaj, {user?.username}!
                </p>
              </div>
              <Link href="/panel" onClick={() => setOpen(false)}>
                <Button variant="outline" className="w-full relative">
                  <LayoutPanelLeft className="w-4 h-4 mr-2" />
                  Twój Panel
                  <NotificationBadge
                    variant="pulse"
                    className="absolute top-2 right-2"
                  />
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 pb-2 border-b border-gray-200">
                <UserCircle className="w-10 h-10 text-gray-400" />

                <TypingEffect
                  text="Witaj w Plonup!"
                  timeDelay={0.7}
                  className="!font-bold"
                />
              </div>
              <div className="flex flex-col gap-2 pt-4 border-b pb-2">
                <Link href="/login" onClick={() => setOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-600 hover:bg-gray-100"
                  >
                    <LogIn className="!w-5 !h-5 mr-2 text-green-600" />
                    Zaloguj się
                  </Button>
                </Link>
                <Link href="/rejestracja" onClick={() => setOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-600 hover:bg-gray-100"
                  >
                    <UserPen className="!w-5 !h-5 mr-2 text-orange-500" />
                    Załóż konto
                  </Button>
                </Link>
              </div>
            </>
          )}
        </SheetHeader>

        <nav className="flex-1 px-4 py-2 space-y-1 text-sm text-gray-700">
          <button
            onClick={() => handleNavigate("/jak-zaczac")}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-lg hover:bg-gray-100 transition-colors bg-[var(--accent-third-light)]"
          >
            <Rocket className="w-5 h-5 text-gray-600" />
            Jak zacząć?
          </button>
          <button
            onClick={() => handleNavigate("/poznaj")}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Info className="w-5 h-5 text-gray-600" />
            Poznaj Plonup
          </button>
          <button
            onClick={() => handleNavigate("/kontakt")}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-lg hover:bg-gray-100 transition-colors"
          >
            <MessageCircle className="w-5 h-5 text-gray-600" />
            Kontakt
          </button>
          <button
            onClick={() => handleNavigate("/blog")}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-lg hover:bg-gray-100 transition-colors"
          >
            <BookOpen className="w-5 h-5 text-gray-600" />
            Blog
          </button>
          <Link
            href="/patron"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-3 px-3 py-2 w-full rounded-lg border-2 border-[var(--accent-main)] text-[var(--accent-main)] font-semibold hover:bg-[var(--accent-main)] hover:text-white transition-colors mt-4"
          >
            <Heart className="w-5 h-5" />
            Zostań Patronem
          </Link>
        </nav>

        <div className="py-4 px-4 mt-auto mx-auto border-t">
          {isAuthenticated && (
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start text-destructive hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Wyloguj się
            </Button>
          )}

          <div className="mt-4 flex flex-col text-xs text-muted-foreground gap-1">
            <Link
              href="/polityka-prywatnosci"
              onClick={() => setOpen(false)}
              className="hover:underline text-center"
            >
              Polityka Prywatności
            </Link>
            <Link
              href="/regulamin"
              onClick={() => setOpen(false)}
              className="hover:underline text-center"
            >
              Regulamin
            </Link>
          </div>
          <OpenCookieSettingsButton className="hover:underline text-center" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
