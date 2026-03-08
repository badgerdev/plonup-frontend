"use client";

import { useEffect, useState, useCallback } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { NotificationCard } from "./NotificationCard";
import { useNotificationsStore } from "@/store/notifications";
import type { NotificationItem } from "@/lib/helpers/types";
import { authFetch } from "@/lib/authFetch";

export const NotificationsList = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  const setUnreadCount = useNotificationsStore((s) => s.setUnreadCount);
  const clearUnread = useNotificationsStore((s) => s.clearUnread);

  // ✅ Używamy useCallback, żeby nie powodować warningów
  const fetchNotifications = useCallback(async () => {
    const res = await fetch("/api/notifications", { cache: "no-store" });
    if (!res.ok) {
      setNotifications([]);
      setUnreadCount(0);
      setLoading(false);
      return;
    }

    const data: NotificationItem[] = await res.json();
    setNotifications(data);

    const unread = data.filter((n) => !n.is_read).length;
    setUnreadCount(unread);
    setLoading(false);
  }, [setUnreadCount]);

  const markAllAsRead = async () => {
    await authFetch("/api/notifications/mark-all-read", { method: "PATCH" });
    await fetchNotifications();
    clearUnread();
  };

  const handleDeleted = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  useEffect(() => {
    fetchNotifications();
    clearUnread();
  }, [fetchNotifications, clearUnread]); // ✅ poprawione dependencies

  if (loading) return <p>Ładowanie powiadomień...</p>;
  if (notifications.length === 0)
    return <p className="text-zinc-500 text-sm">Brak powiadomień 🎉</p>;

  return (
    <div className="space-y-4 animate-in fade-in-50">
      {/* Nagłówek */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Bell className="w-5 h-5 text-[#f35b04]" /> Twoje powiadomienia
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={markAllAsRead}
          className="text-xs"
        >
          Oznacz wszystkie jako przeczytane
        </Button>
      </div>

      <Separator />

      {/* Lista powiadomień */}
      <div className="space-y-3">
        {notifications.map((n) => (
          <NotificationCard key={n.id} n={n} onDeleted={handleDeleted} />
        ))}
      </div>
    </div>
  );
};
