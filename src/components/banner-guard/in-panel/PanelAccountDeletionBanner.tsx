"use client";

import { ShieldAlert } from "lucide-react";
import { useAuth } from "@/hooks/auth/useAuth";
import Link from "next/link";

export default function PanelAccountDeletionBanner() {
  const { user } = useAuth();

  if (!user || !user.is_deleted) return null;

  return (
    <div
      className="w-full bg-[#FFF1F1] border-y border-[#F1AEB5] py-2 px-4
                    flex items-center justify-between gap-4
                    lg:justify-start lg:gap-6 lg:border-x lg:rounded-md"
    >
      <div className="flex items-center gap-2 text-sm font-medium text-[#842029]">
        <ShieldAlert className="size-5 shrink-0 text-[#B02A37]" />
        <span>
          Konto jest w trakcie usuwania. Część funkcji jest zablokowana.
        </span>
      </div>

      <Link
        href="/panel/konto-uzytkownika"
        className="text-xs font-medium px-3 py-1 border border-[#B02A37]
                   text-[#842029] rounded-md hover:bg-[#F8D7DA] transition"
      >
        Przejdź do ustawień
      </Link>
    </div>
  );
}
