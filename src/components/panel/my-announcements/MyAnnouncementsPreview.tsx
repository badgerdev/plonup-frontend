"use client";

import { format } from "date-fns";
import Link from "next/link";
import { CalendarCheck2, ClipboardList, Plus } from "lucide-react";
import {
  AnnouncementOut,
  AnnouncementStatus,
  AnnouncementType,
} from "@/lib/helpers/types";
import { StatusBadge } from "@/components/badgesUi/StatusBadge";
import { TypeBadge } from "@/components/badgesUi/TypeBadge";
import { ModAnnStatusBadge } from "@/components/badgesUi/ModAnnStatusBadge";
import { Button } from "@/components/ui/button";

export default function MyAnnouncementsPreview({
  announcements,
}: {
  announcements: AnnouncementOut[];
}) {
  return (
    <div className="bg-white border rounded-xl shadow-sm p-3 flex flex-col h-fit">
      {/* 🔹 header */}
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h3 className="flex gap-2 text-md font-semibold text-foreground">
          <ClipboardList className="text-[var(--accent-main)]" />
          Ostatnio dodane
        </h3>
        <Link href="/ogloszenia/dodaj">
          <Button
            className="border-2 border-[var(--accent-main)]"
            variant="outline"
          >
            <Plus className="w-4 h-4" />
            Dodaj
          </Button>
        </Link>
      </div>

      {/* 🔹 list */}
      <ul className="space-y-4 text-sm flex-1">
        {announcements.map((a) => (
          <li
            key={a.id}
            className="flex items-center justify-between py-3 border-b last:border-b-0 gap-4"
          >
            {/* Lewa część */}
            <div className="flex-1 min-w-0 flex flex-col gap-1 lg:gap-2">
              <p className="font-semibold text-base text-foreground truncate">
                {a.title}
              </p>

              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <CalendarCheck2 className="w-4 h-4" />
                Dodano:
                <span className="font-semibold">
                  {format(new Date(a.created_at), "dd.MM.yyyy")}
                </span>
              </p>

              {/* Typ ogłoszenia */}
              <div className="flex items-center gap-2 mt-1">
                <TypeBadge type={a.announcement_type as AnnouncementType} />
              </div>

              {/* 🔹 Status moderacji (kropka + label) */}
              <ModAnnStatusBadge
                status={a.moderation_status}
                className="mt-1"
              />
            </div>

            {/* Prawa część */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="hidden lg:flex">
                <StatusBadge
                  status={a.status as AnnouncementStatus}
                  label={a.status_display}
                />
              </div>
              <Link href={`/panel/twoje-ogloszenia/${a.id}`}>
                <button className="px-3 py-1.5 rounded-full text-sm font-medium border bg-white hover:bg-zinc-100 transition">
                  Zarządzaj
                </button>
              </Link>
            </div>
          </li>
        ))}
      </ul>

      {/* 🔹 zobacz wszystkie */}
      <div className="flex justify-center mt-6 lg:border-t lg:py-6">
        <Link href="/panel/twoje-ogloszenia" className="w-full sm:w-auto">
          <Button
            variant="outline"
            className="w-full sm:w-auto rounded-full font-medium shadow-sm border-[var(--accent-main)] text-zinc-700 transition"
          >
            Zobacz wszystkie ogłoszenia
          </Button>
        </Link>
      </div>
    </div>
  );
}
