"use client";

import { ShieldAlert, Undo2 } from "lucide-react";
import { useAuth } from "@/hooks/auth/useAuth";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "sonner";
import Link from "next/link";

export default function PanelAccountDeletionBanner() {
  const { user } = useAuth();
  const { refreshUser } = useAuthStore();

  if (!user || !user.is_deleted) return null;

  const handleCancelDeletion = async () => {
    try {
      const res = await fetch("/api/account/cancel", { method: "POST" });
      if (!res.ok) throw new Error("Cancel failed");
      toast.success("Usuwanie konta zostało anulowane");
      await refreshUser();
    } catch {
      toast.error("Nie udało się anulować usuwania konta");
    }
  };

  const formattedDate = user.delete_scheduled_for
    ? new Date(user.delete_scheduled_for).toLocaleDateString("pl-PL", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

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
          {formattedDate && <> Usunięcie: {formattedDate}.</>}
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={handleCancelDeletion}
          className="text-xs font-medium px-3 py-1 border border-[#B02A37]
                     text-[#842029] rounded-md hover:bg-[#F8D7DA] transition
                     flex items-center gap-1"
        >
          <Undo2 className="size-3" />
          Anuluj
        </button>

        <Link
          href="/panel/konto-uzytkownika"
          className="text-xs font-medium px-3 py-1 border border-[#B02A37]
                     text-[#842029] rounded-md hover:bg-[#F8D7DA] transition"
        >
          Ustawienia
        </Link>
      </div>
    </div>
  );
}
