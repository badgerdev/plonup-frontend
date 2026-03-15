"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ShieldAlert, Undo2 } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth-store";

export default function SettingsSection() {
  const { refreshUser, user } = useAuthStore();
  const isDeletionPending = !!user?.is_deleted;

  const handleExport = async () => {
    try {
      const res = await fetch("/api/account/export");

      if (!res.ok) {
        throw new Error("Export failed");
      }

      const data = await res.json();

      // 🕒 data w nazwie pliku
      const date = new Date().toISOString().split("T")[0];
      const filename = `plonup-account-export-${date}.json`;

      // 📦 JSON → Blob
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json;charset=utf-8",
      });

      // 🌍 uniwersalny download
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = filename;

      document.body.appendChild(a);
      a.click();

      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      toast.error("Nie udało się wyeksportować danych");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const res = await fetch("/api/account/delete", { method: "POST" });
      if (!res.ok) throw new Error("Delete request failed");
      toast.success("Żądanie usunięcia konta zostało wysłane");
      await refreshUser();
    } catch {
      toast.error("Nie udało się wysłać żądania usunięcia konta");
    }
  };

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

  return (
    <div className="space-y-4 max-w-md">
      <h2 className="text-xl font-semibold">Ustawienia konta</h2>

      <Button onClick={handleExport}>Eksportuj moje dane (RODO)</Button>

      <p className="text-sm text-muted-foreground">
        Pobierzesz plik JSON zawierający wszystkie dane powiązane z Twoim
        kontem.
      </p>

      <hr className="border-border" />

      <div className="flex items-center gap-2">
        <ShieldAlert className="h-5 w-5 text-red-600" />
        <h3 className="text-lg font-semibold text-red-600">
          Strefa niebezpieczna
        </h3>
      </div>

      {isDeletionPending ? (
        <>
          <Button
            variant="outline"
            className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={handleCancelDeletion}
          >
            <Undo2 className="mr-2 h-4 w-4" />
            Anuluj usuwanie konta
          </Button>
          <p className="text-sm text-red-600">
            Twoje konto jest aktualnie w trakcie usuwania.
            {user?.delete_scheduled_for && (
              <>
                {" "}Zostanie trwale usunięte{" "}
                {new Date(user.delete_scheduled_for).toLocaleDateString("pl-PL", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
                .
              </>
            )}{" "}
            Możesz anulować tę operację klikając przycisk powyżej.
          </p>
        </>
      ) : (
        <>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Usuń konto</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Czy na pewno chcesz usunąć konto?</AlertDialogTitle>
                <AlertDialogDescription>
                  Twoje konto zostanie trwale usunięte za 30 dni. W tym czasie
                  możesz anulować tę operację. Większość funkcji portalu zostanie
                  zablokowana.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Anuluj</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Usuń konto
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <p className="text-sm text-muted-foreground">
            Po wysłaniu żądania konto zostanie usunięte za 30 dni. Możesz
            anulować tę operację w każdej chwili przed upływem tego czasu.
          </p>
        </>
      )}
    </div>
  );
}
