"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";
import { AnnouncementLikesModal } from "@/components/panel/my-announcements/AnnouncementLikesModal";
import { formatLikes } from "@/lib/formatters/formatters";
import { useRequireActiveAndVerified } from "@/hooks/guards/useRequireActiveAndVerified";
import { authFetch } from "@/lib/authFetch";

type Props = {
  announcementId: number;
  initialCount: number;
  initialLiked: boolean;
  className?: string;
};

export function HeartButton({
  announcementId,
  initialCount,
  initialLiked,
  className,
}: Props) {
  const { isAuthenticated } = useAuthStore();

  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(initialLiked);
  const [isPending, setIsPending] = useState(false);
  const [open, setOpen] = useState(false);

  const requireAction = useRequireActiveAndVerified();

  const handleClick = () => {
    const allowed = requireAction(() => toggleLike());

    if (!allowed && !isAuthenticated) {
      toast.info("Zaloguj się, aby polubić ogłoszenie.");
    }
  };

  const toggleLike = async () => {
    setIsPending(true);
    try {
      setLiked((prev) => !prev);
      setCount((prev) => (liked ? prev - 1 : prev + 1));

      const res = await authFetch(`/api/announcements/${announcementId}/like`, {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      setLiked(data.liked);
      setCount(data.likes_count);
    } catch {
      toast.error("Wystąpił błąd. Spróbuj ponownie.");
      setLiked(initialLiked);
      setCount(initialCount);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <div className={cn("flex items-center gap-2 ml-4", className)}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          disabled={isPending}
        >
          <Heart
            key={liked ? "liked" : "unliked"}
            className={cn(
              "w-5 h-5 transition-transform animate-popIn",
              liked
                ? "fill-green-400 stroke-[var(--accent-green)] scale-110"
                : "stroke-green-600"
            )}
          />
        </button>

        <span
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
          className="text-xs hover:underline cursor-pointer"
        >
          {formatLikes(count)}
        </span>
      </div>

      <AnnouncementLikesModal
        open={open}
        onClose={() => setOpen(false)}
        announcementId={announcementId}
      />
    </>
  );
}
