"use client";

import { useState } from "react";
import {
  Check,
  Trash2,
  CircleCheck,
  XCircle,
  Wrench,
  ClipboardCheck,
  Star,
  Info,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatRelativeDate } from "@/lib/formatters/formatters";
import type { NotificationItem } from "@/lib/helpers/types";
import { useNotificationsStore } from "@/store/notifications";
import Link from "next/link";
import { authFetch } from "@/lib/authFetch";

type Props = {
  n: NotificationItem;
  onDeleted?: (id: number) => void;
};

export const NotificationCard = ({ n, onDeleted }: Props) => {
  const [isRead, setIsRead] = useState(n.is_read);
  const unreadCount = useNotificationsStore((s) => s.unreadCount);
  const setUnreadCount = useNotificationsStore((s) => s.setUnreadCount);

  // 🎨 Styl i ikonka w zależności od typu / tytułu / pochodzenia
  const getStyle = () => {
    const title = n.title.toLowerCase();

    // 🟦 Wiadomości moderatora — najwyższy priorytet
    if (n.is_staff_message || n.type === "staff_message") {
      return {
        border: "border-[var(--accent-third)]",
        icon: <UserCheck className="w-5 h-5 text-[var(--accent-third)]" />,
      };
    }

    if (title.includes("zatwierdzone"))
      return {
        border: "border-[var(--accent-light-green)]",
        icon: (
          <CircleCheck className="w-5 h-5 text-[var(--accent-light-green)]" />
        ),
      };

    if (title.includes("odrzucone"))
      return {
        border: "border-rose-600",
        icon: <XCircle className="w-5 h-5 text-rose-600" />,
      };

    if (title.includes("poprawy"))
      return {
        border: "border-amber-500",
        icon: <Wrench className="w-5 h-5 text-amber-600" />,
      };

    if (title.includes("moderacji"))
      return {
        border: "border-[var(--accent-main)]",
        icon: <ClipboardCheck className="w-5 h-5 text-[var(--accent-main)]" />,
      };

    if (title.includes("spam") || title.includes("zablokowane"))
      return {
        border: "border-rose-700",
        icon: <XCircle className="w-5 h-5 text-rose-700" />,
      };

    if (n.type === "review")
      return {
        border: "border-yellow-500",
        icon: <Star className="w-5 h-5 text-yellow-600" />,
      };

    return {
      border: "border-stone-400",
      icon: <Info className="w-5 h-5 text-stone-600" />,
    };
  };

  const { border, icon } = getStyle();

  const markAsRead = async () => {
    if (isRead) return;
    const res = await authFetch(`/api/notifications/${n.id}/read`, {
      method: "PATCH",
    });
    if (res.ok) {
      setIsRead(true);
      setUnreadCount(Math.max(0, unreadCount - 1));
    }
  };

  const deleteNotification = async () => {
    const res = await authFetch(`/api/notifications/${n.id}`, {
      method: "DELETE",
    });
    if (res.ok) onDeleted?.(n.id);
  };

  // 🧠 Logika linku (priorytety):
  // 1️⃣ Jeśli powiązane ogłoszenie → prowadzi do ogłoszenia
  // 2️⃣ Jeśli tylko link_url → prowadzi tam
  // 3️⃣ Jeśli moderator message → nie ma linku (sam tekst)
  const getLink = () => {
    if (n.related_announcement_id)
      return {
        href: `/panel/twoje-ogloszenia/${n.related_announcement_id}`,
        label: "Zobacz ogłoszenie →",
      };
    if (n.link_url)
      return {
        href: n.link_url,
        label: n.is_staff_message ? "Zobacz →" : "Przejdź →",
      };
    return null;
  };

  const link = getLink();

  return (
    <Card
      className={`bg-zinc-50 border ${border} rounded-lg shadow-sm transition-all ${
        isRead ? "opacity-50" : "opacity-100 animate-in fade-in-50"
      }`}
    >
      <CardContent className="p-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        {/* Lewa sekcja */}
        <div className="flex items-start gap-3 flex-1">
          <div className="mt-0.5">{icon}</div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
              <h3 className="font-semibold text-sm text-zinc-800 leading-tight">
                {n.title}
              </h3>
              <span className="text-xs text-zinc-500">
                {formatRelativeDate(n.created_at)}
              </span>
            </div>

            <p className="text-sm text-zinc-700 mt-0.5">{n.message}</p>

            {n.is_staff_message && (
              <p className="text-xs text-blue-600 mt-1 italic">
                Wiadomość od zespołu Plonup
              </p>
            )}

            {link && (
              <Link
                href={link.href}
                className="text-xs font-medium text-[var(--accent-main)] hover:underline mt-1 inline-block"
                onClick={markAsRead}
              >
                {link.label}
              </Link>
            )}
          </div>
        </div>

        {/* Prawa sekcja – akcje */}
        <div className="flex items-center gap-2 justify-end mt-2 sm:mt-0">
          <div className="flex flex-col items-center">
            <Button
              size="icon"
              variant="secondary"
              onClick={markAsRead}
              title="Oznacz jako przeczytane"
            >
              <Check className="w-4 h-4 text-green-500" />
            </Button>
            <span className="text-xs text-zinc-500">przeczytane</span>
          </div>
          <div className="flex flex-col items-center opacity-100">
            <Button
              size="icon"
              variant="secondary"
              onClick={deleteNotification}
              title="Usuń powiadomienie"
            >
              <Trash2 className="w-4 h-4 text-rose-600" />
            </Button>
            <span className="text-xs text-zinc-500">usuń</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
