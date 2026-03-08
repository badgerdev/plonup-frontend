import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import Image from "next/image";

// UI
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/badgesUi/StatusBadge";

// Types
import { AnnouncementDetail, AnnouncementStatus } from "@/lib/helpers/types";

// Utils
import { getFullImageUrl } from "@/lib/helpers/getFullImageUrl";

// Klienckie akcje
import { DeleteButton } from "./DeleteButton";
import { RestoreButton } from "./RestoreButton";
import {
  CalendarCheck2,
  Component,
  MapPin,
  SquareArrowOutUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

export default async function ArchivedAnnouncements() {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  if (!access) {
    redirect("/login");
  }

  let announcements: AnnouncementDetail[] = [];
  try {
    const res = await fetch(
      `${API_BASE}/announcements/my-announcements?status=archived`,
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
        cache: "no-store",
      }
    );

    if (res.ok) {
      announcements = await res.json();
    }
  } catch (error) {
    console.error("❌ Failed to fetch archived announcements:", error);
  }

  if (announcements.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground mb-4">
          Brak zarchiwizowanych ogłoszeń.
        </p>
        <Link href="/panel/twoje-ogloszenia">
          <Button variant="outline">
            <SquareArrowOutUpRight />
            Twoje ogloszenia
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {announcements.map((ann) => (
        <Card key={ann.id} className="group hover:shadow-lg transition-shadow">
          <CardContent className="p-4 flex flex-col h-full">
            <div className="relative w-full aspect-video rounded-md overflow-hidden mb-3">
              {ann.images && ann.images.length > 0 ? (
                <Image
                  src={getFullImageUrl(ann.images[0].image_url)}
                  alt={ann.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-muted-foreground">
                  Brak zdjęcia
                </div>
              )}
            </div>

            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold truncate pr-2">{ann.title}</h3>
              <StatusBadge
                status={ann.status as AnnouncementStatus}
                label={ann.status_display}
              />
            </div>

            <div className="text-sm text-muted-foreground space-y-1 flex-grow">
              {/* <p className="mb-2">
                <TypeBadge type={ann.announcement_type as AnnouncementType} />
              </p> */}
              <p className="flex gap-2 items-center">
                <Component className="w-8 h-8 bg-zinc-100 rounded-full p-1.5 text-[var(--accent-main)]" />
                Kategoria: <span className="font-semibold">{ann.category}</span>
              </p>
              <p className="flex gap-2 items-center">
                <MapPin className="w-8 h-8 bg-zinc-100 rounded-full p-1.5 text-[var(--accent-main)]" />
                Lokalizacja:{" "}
                <span className="font-semibold">{ann.location}</span>
              </p>
              <p className="flex gap-2 items-center">
                <CalendarCheck2 className="w-8 h-8 bg-zinc-100 rounded-full p-1.5 text-[var(--accent-main)]" />
                Dodano:
                <span className="font-semibold">
                  {format(new Date(ann.created_at), "dd.MM.yyyy", {
                    locale: pl,
                  })}
                </span>
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-zinc-200 flex flex-col gap-2">
              <RestoreButton announcementId={ann.id} />
              <DeleteButton announcementId={ann.id} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
