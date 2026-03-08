"use client";

import { useRouter } from "next/navigation";
import { MapPin, Calendar } from "lucide-react";
import { TypeBadge } from "@/components/badgesUi/TypeBadge";
import { AnnouncementOut } from "@/lib/helpers/types";
import Image from "next/image";
import { AnnouncementLikesBadge } from "@/components/badgesUi/AnnouncementLikesBadge";

type Props = {
  item: AnnouncementOut;
};

export const AnnouncementPreviewCard = ({ item }: Props) => {
  const router = useRouter();

  const imageUrl = item.images?.[0]?.image_url
    ? `${process.env.NEXT_PUBLIC_MEDIA_URL}${item.images[0].image_url}`
    : "/placeholder.jpg";

  const handleCardClick = () => {
    router.push(`/ogloszenia/${item.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative block bg-white border border-gray-200 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:border-gray-300 hover:-translate-y-1 overflow-hidden cursor-pointer"
    >
      <Image
        src={imageUrl}
        alt={item.title}
        width={400}
        height={300}
        className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
        unoptimized
      />

      <div className="absolute top-2 left-2 z-10">
        <TypeBadge type={item.announcement_type} className="text-xs" />
      </div>

      <div className="p-4 flex flex-col justify-between h-auto">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {item.title}
        </h3>

        {/* Badge z lajkami (nie przenosi na ogłoszenie) */}
        <div onClick={(e) => e.stopPropagation()}>
          <AnnouncementLikesBadge
            likesCount={item.likes_count}
            announcementId={item.id}
            className="mb-2"
          />
        </div>

        <div className="text-sm text-gray-500 flex items-center gap-2 mb-1">
          <MapPin className="w-4 h-4 text-gray-400 group-hover:text-[var(--accent-main)] transition-colors duration-200" />
          <span className="truncate">{item.location}</span>
        </div>
        <div className="text-xs text-gray-500 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400 group-hover:text-[var(--accent-main)] transition-colors duration-200" />
          <span className="truncate">
            {new Date(item.created_at).toLocaleDateString("pl-PL")}
          </span>
        </div>
      </div>
    </div>
  );
};
