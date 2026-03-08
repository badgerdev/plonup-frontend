"use client";

import { useEffect } from "react";
import { useNotificationsStore } from "@/store/notifications";
import type { NotificationItem } from "@/lib/helpers/types";

/**
 * 🔁 Globalny hook do pobierania liczby nieprzeczytanych powiadomień.
 * Odpala się tylko, jeśli użytkownik jest zalogowany.
 */
export function useFetchUnreadCount(intervalMs = 60000) {
  const setUnreadCount = useNotificationsStore((s) => s.setUnreadCount);

  useEffect(() => {
    let isMounted = true;

    const fetchCount = async () => {
      try {
        const res = await fetch("/api/notifications", { cache: "no-store" });
        if (!res.ok) return;
        const data: NotificationItem[] = await res.json();
        if (!isMounted) return;
        const unread = data.filter((n) => !n.is_read).length;
        setUnreadCount(unread);
      } catch (err) {
        console.error(
          "❌ Błąd pobierania liczby nieprzeczytanych powiadomień",
          err
        );
      }
    };

    fetchCount(); // pierwszy ping natychmiast

    const interval = setInterval(fetchCount, intervalMs);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [setUnreadCount, intervalMs]);
}
