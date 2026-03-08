"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX, useEffect, useState } from "react";
import {
  LayoutPanelLeft,
  ClipboardList,
  Archive,
  Pencil,
  MessageSquareText,
} from "lucide-react";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const [title, setTitle] = useState<string | null>(null);

  // fetch tytułu ogłoszenia jeśli końcówka to ID
  useEffect(() => {
    const last = segments[segments.length - 1];
    if (last && /^\d+$/.test(last)) {
      (async () => {
        try {
          const res = await fetch(`/api/my-announcements/${last}`);
          if (!res.ok) throw new Error("Błąd pobierania tytułu");
          const data = await res.json();
          setTitle(data?.title || null);
        } catch (err) {
          console.error("❌ Błąd Breadcrumbs fetch:", err);
          setTitle(null);
        }
      })();
    }
  }, [segments]);

  // mapowanie labeli
  const LABELS: Record<string, { label: string; icon: JSX.Element }> = {
    panel: { label: "Panel", icon: <LayoutPanelLeft className="w-5 h-5" /> },
    "twoje-ogloszenia": {
      label: "Twoje ogłoszenia",
      icon: <ClipboardList className="w-5 h-5" />,
    },
    "twoje-opinie": {
      label: "Opinie",
      icon: <MessageSquareText className="w-5 h-5" />,
    },
    archiwum: { label: "Archiwum", icon: <Archive className="w-5 h-5" /> },
    edytuj: { label: "Edytuj", icon: <Pencil className="w-5 h-5" /> },
  };

  return (
    <nav
      className="
        w-full overflow-x-auto no-scrollbar
        border-b border-gray-200
        pb-2 mb-6
        flex items-center gap-2 text-xs md:text-sm lg:text-lg
      "
    >
      {segments.map((seg, idx) => {
        const href = "/" + segments.slice(0, idx + 1).join("/");
        const isLast = idx === segments.length - 1;

        let label: React.ReactNode;
        if (/^\d+$/.test(seg) && isLast) {
          label = title || (
            <span className="animate-pulse w-24 h-4 bg-gray-200 rounded" />
          );
        } else {
          label = LABELS[seg]?.label || seg;
        }

        const icon = LABELS[seg]?.icon;

        return (
          <span key={href} className="flex items-center gap-2">
            {isLast ? (
              <span className="flex items-center gap-1 font-semibold text-[var(--accent-main)]">
                {icon}
                {label}
              </span>
            ) : (
              <Link
                href={href}
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition"
              >
                {icon}
                {label}
              </Link>
            )}
            {!isLast && <span className="text-gray-400">/</span>}
          </span>
        );
      })}
    </nav>
  );
}
