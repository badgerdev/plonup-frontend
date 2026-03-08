"use client";

import { cn } from "@/lib/utils";
import { useNotificationsStore } from "@/store/notifications";

/**
 * 🔸 Badge do powiadomień – 3 warianty:
 * - "dot"   → mała kropka
 * - "count" → licznik np. 3 lub 9+
 * - "pulse" → migająca animacja (np. dzwonek)
 */
export function NotificationBadge({
  variant = "dot",
  className,
}: {
  variant?: "dot" | "count" | "pulse";
  className?: string;
}) {
  const unreadCount = useNotificationsStore((s) => s.unreadCount);

  if (unreadCount === 0) return null;

  if (variant === "count") {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center min-w-[18px] h-[18px] text-[11px] font-semibold bg-[var(--accent-main)] text-white rounded-full leading-none px-1 shadow-sm",
          className
        )}
      >
        {unreadCount > 9 ? "9+" : unreadCount}
      </span>
    );
  }

  if (variant === "pulse") {
    return (
      <span
        className={cn(
          "absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5",
          className
        )}
      >
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-main)] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--accent-main)]"></span>
      </span>
    );
  }

  // default → dot
  return (
    <span
      className={cn(
        "absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[var(--accent-main)]",
        className
      )}
    ></span>
  );
}
