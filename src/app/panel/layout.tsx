"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { useLogout } from "@/hooks/auth/useLogout";
import { useFetchUnreadCount } from "@/hooks/notifications/useFetchUnreadCount";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  ClipboardList,
  ChevronDown,
  PlusCircle,
  User,
  Bell,
  MessageCircle,
  Archive,
  PanelLeftOpen,
  LayoutPanelLeft,
  LogOut,
  FileClock,
  FileX,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import Breadcrumbs from "@/components/panel/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { NotificationBadge } from "@/components/shared/NotificationBadge";
import PanelAccountStatusGuard from "@/components/banner-guard/in-panel/PanelAccountStatusGuard";

type Props = {
  children: ReactNode;
};

// 🔸 własny typ dla NavLinks
type NavLinksProps = {
  withSheetClose?: boolean;
};

/* 🔗 Linki nawigacyjne */
function NavLinks({ withSheetClose = false }: NavLinksProps) {
  return (
    <nav className="space-y-3">
      {/* 📁 Twoje Ogłoszenia */}
      <Collapsible className="group">
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg 
               text-sm font-medium text-zinc-700
               hover:bg-zinc-100 hover:text-zinc-900 transition-colors duration-150"
          >
            <span className="flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-zinc-600 group-hover:text-zinc-800" />
              Twoje Ogłoszenia
            </span>
            <ChevronDown
              className="w-4 h-4 text-zinc-500 transition-transform duration-200 
                 group-data-[state=open]:rotate-180"
            />
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent className="pl-3 mt-2 space-y-1 border-l border-zinc-200 animate-in fade-in-50 slide-in-from-top-2">
          {[
            {
              href: "/panel/twoje-ogloszenia",
              label: "Wszystkie",
              icon: ClipboardList,
            },
            {
              href: "/panel/twoje-ogloszenia/oczekujace",
              label: "Oczekujące",
              icon: FileClock,
            },
            { href: "/panel/archiwum", label: "Archiwum", icon: Archive },
            {
              href: "/panel/twoje-ogloszenia/odrzucone",
              label: "Odrzucone",
              icon: FileX,
            },
          ].map(({ href, label, icon: Icon }) =>
            withSheetClose ? (
              <SheetClose asChild key={href}>
                <Link
                  href={href}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm 
                             text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 transition"
                >
                  <Icon className="w-4 h-4 text-zinc-500" />
                  {label}
                </Link>
              </SheetClose>
            ) : (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm 
                           text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition"
              >
                <Icon className="w-4 h-4 text-zinc-500" />
                {label}
              </Link>
            ),
          )}
        </CollapsibleContent>
      </Collapsible>

      {/* 📚 Pozostałe linki */}
      <div className="border-t border-zinc-200 pt-3 space-y-1">
        {/* 🔔 Powiadomienia z pingiem */}
        <Link
          href="/panel/powiadomienia"
          className="relative flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition"
        >
          <div className="relative">
            <Bell className="w-5 h-5 text-zinc-600" />
            <NotificationBadge variant="pulse" />
          </div>
          Powiadomienia
          <NotificationBadge variant="count" />
        </Link>

        <Link
          href="/panel/konto-uzytkownika"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm 
                     text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition"
        >
          <User className="w-5 h-5 text-zinc-600" />
          Konto
        </Link>

        <Link
          href="/panel/twoje-opinie"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm 
                     text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition"
        >
          <MessageCircle className="w-5 h-5 text-zinc-600" />
          Opinie
        </Link>
      </div>

      {/* ➕ Dodaj Ogłoszenie */}
      <div className="w-full pt-6 border-t border-zinc-200">
        {withSheetClose ? (
          <SheetClose asChild>
            <Link href="/ogloszenia/dodaj" className="block">
              <Button
                variant="outline"
                className="w-full flex items-center gap-2 text-[var(--accent-main)] 
                           border-2 border-[var(--accent-main)] hover:bg-orange-50 
                           hover:text-[var(--accent-main)] transition"
              >
                <PlusCircle className="w-5 h-5 text-[var(--accent-main)]" />
                Dodaj Ogłoszenie
              </Button>
            </Link>
          </SheetClose>
        ) : (
          <Link href="/ogloszenia/dodaj" className="block">
            <Button
              variant="outline"
              className="w-full flex items-center gap-2 text-[var(--accent-main)] 
                         border-2 border-[var(--accent-main)] hover:bg-orange-50 
                         hover:text-[var(--accent-main)] transition"
            >
              <PlusCircle className="w-5 h-5 text-[var(--accent-main)]" />
              Dodaj Ogłoszenie
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default function PanelLayout({ children }: Props) {
  const { handleLogout } = useLogout();
  useFetchUnreadCount(); // 🔁 auto-refresh badge co 60s

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-muted/50 pt-20">
      <aside className="hidden lg:flex w-52 bg-white border-r border-t rounded-tr-md flex-col px-3 pt-12">
        <NavLinks />
      </aside>

      <section className="flex-1 w-full lg:p-4">
        <PanelAccountStatusGuard />

        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4">
          <div className="flex-1">
            <Breadcrumbs />
            <div className="lg:hidden mt-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <PanelLeftOpen className="w-4 h-4" />
                    Otwórz Panel
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-64 p-4 flex flex-col justify-between"
                >
                  <div>
                    <SheetHeader>
                      <SheetTitle className="border-b pb-2 text-lg font-semibold mb-4 flex gap-2 items-center">
                        <LayoutPanelLeft />
                        Twój Panel
                      </SheetTitle>
                    </SheetHeader>
                    <NavLinks withSheetClose />
                  </div>

                  <div className="border-t pt-4 mt-6 flex flex-col gap-3 text-sm">
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 text-destructive hover:text-red-700"
                    >
                      <LogOut className="w-4 h-4" />
                      Wyloguj się
                    </Button>

                    <div className="mt-2 flex flex-col text-xs text-muted-foreground gap-1 text-center">
                      <Link
                        href="/polityka-prywatnosci"
                        className="hover:underline"
                      >
                        Polityka Prywatności
                      </Link>
                      <Link href="/regulamin" className="hover:underline">
                        Regulamin
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
        {children}
      </section>
    </div>
  );
}
