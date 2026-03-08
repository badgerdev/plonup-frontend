"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Handshake, HandHeart, Grid2x2Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { getFullImageUrl } from "@/lib/helpers/getFullImageUrl";
import { AnnouncementOut } from "@/lib/helpers/types";
import { TypeBadge } from "@/components/badgesUi/TypeBadge";
import { HeartButton } from "../shared/HeartButton";

type Props = {
  data: AnnouncementOut;
};

export function AnnouncementCard({ data }: Props) {
  const {
    id,
    title,
    location,
    listing_type,
    category,
    images,
    user,
    user_id,
    announcement_type,
    likes_count,
    is_liked, // 👈 z backendu
  } = data;

  const router = useRouter();

  const imageUrl =
    images && images.length > 0
      ? getFullImageUrl(images[0].image_url)
      : "/placeholder.jpg";

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.closest("button") ||
      target.closest("a") ||
      target.closest("svg") ||
      target.closest("[data-no-card-click]")
    ) {
      return;
    }
    router.push(`/ogloszenia/${id}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      className="cursor-pointer rounded-xl bg-gray-100 border border-[var(--border)] shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden py-0 group"
    >
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          width={400}
          height={300}
          priority
        />
        <div className="absolute bottom-3 left-3">
          <TypeBadge type={announcement_type} />
        </div>
      </div>

      <div className="flex flex-col">
        <CardHeader className="p-4 pb-0 space-y-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-base font-semibold text-[var(--accent-dark)] leading-snug transition-colors duration-200 group-hover:text-[var(--accent-main)]">
              {title}
            </CardTitle>
            <HeartButton
              announcementId={id}
              initialCount={likes_count}
              initialLiked={is_liked}
            />
          </div>

          <div className="text-sm font-medium text-[var(--accent-dark)]">
            {listing_type === "free" ? (
              <div className="flex items-center gap-2">
                <div className="p-2 bg-white rounded-full border">
                  <HandHeart className="w-4 h-4 text-[var(--accent-green)]" />
                </div>
                <span>Za darmo</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="p-2 bg-white rounded-full border">
                  <Handshake className="w-4 h-4 text-[var(--accent-main)]" />
                </div>
                <span>Sprzedaż / wymiana</span>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="px-4 pt-3 flex items-center justify-between text-sm text-[var(--accent-dark)]">
          <div className="flex items-center gap-1">
            <div className="p-2 bg-white rounded-full border">
              <MapPin className="w-4 h-4 text-[var(--text-main)]" />
            </div>
            <span className="text-[var(--text-main-darker)] pl-1">
              {location}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="p-2 bg-white rounded-full border">
              <Grid2x2Check className="w-4 h-4 text-[var(--text-main)]" />
            </div>
            <span className="text-[var(--text-main-darker)] pl-1">
              {category}
            </span>
          </div>
        </CardContent>

        <CardContent className="px-4 pt-3 pb-4 mt-3 border-t border-[var(--border)] transition-colors duration-200 group-hover:border-[var(--accent-main)]">
          <div className="text-sm text-[var(--accent-dark)]">
            Dodane przez:{" "}
            <Link
              href={`/uzytkownicy/${user_id}`}
              onClick={(e) => e.stopPropagation()}
              className="font-semibold hover:underline"
            >
              {user}
            </Link>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
