"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRequireActiveAndVerified } from "@/hooks/guards/useRequireActiveAndVerified";

import {
  deleteAnnouncement,
  updateAnnouncementStatus,
} from "@/lib/helpers/myAnnouncements";

// UI
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Loader2,
  Pause,
  ArrowUpToLine,
  Archive,
  Trash2,
  Pencil,
  Wrench,
  ShieldOff,
} from "lucide-react";
import { AnnouncementStatus } from "@/lib/helpers/types";

const DELAY_FOR_DELETE_AND_UPDATE = 700;

type Props = {
  id: number;
  status: AnnouncementStatus;
  status_display?: string;
  moderation_status?: string;
};

export function ManageButtons({
  id,
  status,
  status_display,
  moderation_status,
}: Props) {
  const router = useRouter();
  const requireAction = useRequireActiveAndVerified();
  const [loading, setLoading] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<null | string>(null);
  const [currentStatus, setCurrentStatus] = useState(status);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showArchiveDialog, setShowArchiveDialog] = useState(false);

  const handleDelete = async () => {
    const allowed = requireAction(() => {});

    if (!allowed) return;

    setLoading(true);
    setTimeout(async () => {
      try {
        await deleteAnnouncement(id);
        toast.success("Ogłoszenie zostało usunięte.");
        router.push("/panel/twoje-ogloszenia");
      } catch {
        toast.error("Wystąpił błąd podczas usuwania ogłoszenia.");
      } finally {
        setLoading(false);
      }
    }, DELAY_FOR_DELETE_AND_UPDATE);
  };

  const handleStatusChange = (
    newStatus: AnnouncementStatus,
    closeDialog?: () => void
  ) => {
    const allowed = requireAction(() => {});

    if (!allowed) return;

    setPendingStatus(newStatus);
    setTimeout(async () => {
      try {
        await updateAnnouncementStatus(id, newStatus);
        setCurrentStatus(newStatus);
        closeDialog?.();
        toast.success("Status ogłoszenia został zmieniony.");
        router.refresh();
      } catch {
        toast.error("Wystąpił błąd podczas zmiany statusu.");
      } finally {
        setPendingStatus(null);
      }
    }, DELAY_FOR_DELETE_AND_UPDATE);
  };

  const isBlocked = loading || !!pendingStatus;

  const renderLoader = () => (
    <div className="flex items-center justify-center gap-2 text-muted-foreground py-2">
      <Loader2 className="h-4 w-4 animate-spin" />
      {pendingStatus === "paused" && "Zawieszanie..."}
      {pendingStatus === "archived" && "Archiwizowanie..."}
      {pendingStatus === "active" &&
        (status === "paused" ? "Wznawianie..." : "Przywracanie...")}
      {loading && "Usuwanie..."}
    </div>
  );

  return (
    <div className="flex flex-col gap-8">
      {/* =========================================================
          1️⃣ SEKCJA: EDYCJA / POPRAWA OGŁOSZENIA
      ========================================================= */}
      <div className="border border-zinc-200 rounded-lg p-5 bg-zinc-50 space-y-3">
        <h4 className="text-sm font-semibold text-zinc-800 flex items-center gap-2">
          {moderation_status === "needs_fix"
            ? "Popraw ogłoszenie"
            : "Edytuj ogłoszenie"}
        </h4>

        {moderation_status === "approved" && (
          <div className="bg-[var(--accent-third-light)] border border-[var(--accent-third)] text-zinc-800 text-sm rounded-lg p-3">
            ℹ️ Po edycji ogłoszenie trafi ponownie do moderacji i nie będzie
            widoczne publicznie do czasu zatwierdzenia.
          </div>
        )}

        {moderation_status === "needs_fix" && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-lg p-3">
            ⚠️ Twoje ogłoszenie wymaga poprawek. Popraw wskazane elementy i
            wyślij ponownie.
          </div>
        )}

        {["approved", "needs_fix"].includes(moderation_status || "") && (
          <Button
            onClick={() =>
              requireAction(() =>
                router.push(`/panel/twoje-ogloszenia/${id}/edytuj`)
              )
            }
            className={`w-full flex items-center justify-center gap-2 ${
              moderation_status === "needs_fix"
                ? "bg-amber-500 hover:bg-amber-600 text-white"
                : ""
            }`}
          >
            {moderation_status === "needs_fix" ? (
              <>
                <Wrench className="h-4 w-4" />
                Popraw ogłoszenie
              </>
            ) : (
              <>
                <Pencil className="h-4 w-4" />
                Edytuj ogłoszenie
              </>
            )}
          </Button>
        )}
      </div>

      {/* =========================================================
    2️⃣ SEKCJA: TWÓJ STATUS
========================================================= */}
      <div className="border border-zinc-200 rounded-lg p-5 bg-zinc-50 space-y-3">
        {moderation_status !== "approved" ? (
          <div className="flex flex-col items-center gap-2 text-gray-600 bg-gray-50 border border-gray-200 rounded-lg p-3">
            <ShieldOff className="h-9 w-9 text-amber-500 mt-0.5" />
            <p className="text-sm leading-relaxed">
              Edycja oraz zarządzanie ogłoszeniem będą dostępne po jego
              zatwierdzeniu
            </p>
          </div>
        ) : isBlocked ? (
          renderLoader()
        ) : (
          <>
            <h4 className="text-sm font-semibold text-zinc-800">
              Twój status:{" "}
              <span className="font-normal text-muted-foreground">
                {status_display}
              </span>
            </h4>

            <div className="space-y-3">
              {currentStatus === "active" && (
                <Button
                  onClick={() => handleStatusChange("paused")}
                  variant="outline"
                  className="w-full justify-start gap-2 cursor-pointer"
                >
                  <Pause className="h-4 w-4" />
                  Zawieś
                </Button>
              )}

              {(currentStatus === "active" || currentStatus === "paused") && (
                <Dialog
                  open={showArchiveDialog}
                  onOpenChange={setShowArchiveDialog}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2 cursor-pointer"
                    >
                      <Archive className="h-4 w-4" />
                      Archiwizuj
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Potwierdzenie archiwizacji</DialogTitle>
                      <DialogDescription>
                        Czy na pewno chcesz przenieść to ogłoszenie do{" "}
                        <b>Archiwum</b>? Będzie niewidoczne publicznie.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-col sm:flex-row gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setShowArchiveDialog(false)}
                      >
                        Anuluj
                      </Button>
                      <Button
                        onClick={() =>
                          handleStatusChange("archived", () =>
                            setShowArchiveDialog(false)
                          )
                        }
                      >
                        Archiwizuj
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}

              {currentStatus === "paused" && (
                <Button
                  onClick={() => handleStatusChange("active")}
                  variant="outline"
                  className="w-full justify-start gap-2 cursor-pointer"
                >
                  <ArrowUpToLine className="h-4 w-4" />
                  Wznów
                </Button>
              )}

              {currentStatus === "archived" && (
                <Button
                  onClick={() => handleStatusChange("active")}
                  variant="outline"
                  className="w-full justify-start gap-2 cursor-pointer"
                >
                  <ArrowUpToLine className="h-4 w-4" />
                  Przywróć
                </Button>
              )}
            </div>
          </>
        )}
      </div>

      {/* =========================================================
          3️⃣ SEKCJA: NIEBEZPIECZNA STREFA
      ========================================================= */}
      <div className="border border-destructive rounded-lg p-5 bg-red-50 space-y-3">
        <h4 className="text font-semibold text-destructive">
          Niebezpieczna strefa
        </h4>
        <p className="text-sm text-destructive">
          Usunięcie ogłoszenia jest trwałe i nie można go cofnąć.
        </p>

        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogTrigger asChild>
            <Button
              variant="destructive"
              className="w-full justify-start gap-2 cursor-pointer"
              disabled={isBlocked}
            >
              <Trash2 className="h-4 w-4" />
              Usuń ogłoszenie
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md rounded-lg">
            <DialogHeader>
              <DialogTitle>Potwierdzenie usunięcia</DialogTitle>
              <DialogDescription>
                Zastanów się dwa razy! Czy na pewno chcesz usunąć to ogłoszenie?
                Tej operacji nie można cofnąć.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(false)}
              >
                Anuluj
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? "Usuwanie..." : "Usuń na zawsze"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
