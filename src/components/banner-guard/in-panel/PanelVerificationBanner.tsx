"use client";

import { AlertTriangle } from "lucide-react";
import { useAuth } from "@/hooks/auth/useAuth";
import Link from "next/link";

export default function PanelVerificationBanner() {
  const { user } = useAuth();

  if (!user || user.is_verified) return null;

  return (
    <div
      className="w-full bg-[#FFF4E5] border-y border-[#F4C27A] py-2 px-4
                    flex items-center justify-between gap-4
                    lg:justify-start lg:gap-6 lg:border-x lg:rounded-md"
    >
      <div className="flex items-center gap-2 text-sm font-medium text-[#9A5B0A]">
        <AlertTriangle className="size-5 shrink-0 text-[#D47F2A]" />
        <span>Zweryfikuj adres e-mail, aby w pełni korzystać z Plonup.</span>
      </div>

      <Link
        href="/potwierdz"
        className="text-xs font-medium px-3 py-1 border border-[#D47F2A]
                   text-[#9A5B0A] rounded-md hover:bg-[#FDF0DA] transition"
      >
        Zweryfikuj teraz
      </Link>
    </div>
  );
}
