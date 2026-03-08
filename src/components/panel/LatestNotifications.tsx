"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Bell, Check } from "lucide-react";
import { toast } from "sonner";
import type { NotificationItem } from "@/lib/helpers/types";
import { Button } from "@/components/ui/button";
import { useNotificationsStore } from "@/store/notifications";
import { cn } from "@/lib/utils";

/**
 * 🔔 Box: Ostatnie powiadomienia (3 ostatnie)
 * z 🔸kropką i licznikiem zsynchronizowanym ze store
 */
export default function LatestNotifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  const unreadCount = useNotificationsStore((s) => s.unreadCount);
  const setUnreadCount = useNotificationsStore((s) => s.setUnreadCount);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch("/api/notifications", { cache: "no-store" });
      if (!res.ok) {
        setNotifications([]);
        setUnreadCount(0);
        return;
      }
      const data: NotificationItem[] = await res.json();
      setNotifications(data.slice(0, 3)); // ✅ tylko 3 ostatnie
      const unread = data.filter((n) => !n.is_read).length;
      setUnreadCount(unread);
    } catch (e) {
      console.error("Błąd ładowania powiadomień:", e);
    } finally {
      setLoading(false);
    }
  }, [setUnreadCount]);

  const handleMarkAsRead = async (id: number) => {
    try {
      const res = await fetch(`/api/notifications/${id}/read`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error("Nie udało się oznaczyć powiadomienia");

      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
      setUnreadCount(Math.max(0, unreadCount - 1));

      toast.success("Powiadomienie oznaczone jako przeczytane");
    } catch (e) {
      console.error("Błąd oznaczania powiadomienia:", e);
      toast.error("Nie udało się oznaczyć powiadomienia");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  if (loading)
    return (
      <div className="bg-white border rounded-xl shadow-sm p-6 text-sm text-zinc-500">
        Ładowanie powiadomień...
      </div>
    );

  if (notifications.length === 0)
    return (
      <div className="bg-white border rounded-xl shadow-sm p-6 text-sm text-zinc-500">
        Brak powiadomień 🎉
      </div>
    );

  return (
    <div className="bg-white border rounded-xl shadow-sm p-6 animate-fade-in-bottom">
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-2 text-lg text-zinc-600 font-bold">
          <Bell className="w-8 h-8 text-[var(--accent-main)]" />
          Ostatnie Powiadomienia
        </h3>
      </div>

      <ul className="space-y-3 text-sm">
        {notifications.map((n) => (
          <li
            key={n.id}
            className={cn(
              "border-b pb-3 last:border-none flex items-start justify-between gap-3 transition-all duration-300",
              n.is_read ? "opacity-60" : "opacity-100 pl-2"
            )}
          >
            <div className="flex items-start gap-2 flex-1">
              {/* 🔸 kropka statusu */}
              {!n.is_read && (
                <span className="mt-1.5 h-2 w-2 rounded-full bg-[var(--accent-main)] animate-pulse"></span>
              )}
              <p className="flex-1 text-zinc-700 leading-snug">
                {n.title || n.message}
              </p>
            </div>

            {!n.is_read && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleMarkAsRead(n.id)}
                title="Oznacz jako przeczytane"
                className="h-7 w-7 p-0 bg-[var(--accent-light)] border-[var(--accent-light-green)] hover:bg-[var(--accent-light-green)]/10"
              >
                <Check className="w-4 h-4 text-[var(--accent-light-green)]" />
              </Button>
            )}
          </li>
        ))}
      </ul>

      <div className="flex justify-center mt-6">
        <Link href="/panel/powiadomienia" className="w-full sm:w-auto">
          <Button
            variant="outline"
            className="w-full sm:w-auto rounded-full font-medium shadow-sm border-[var(--accent-main)] text-zinc-700 transition"
          >
            Zobacz wszystkie powiadomienia
          </Button>
        </Link>
      </div>
    </div>
  );
}
