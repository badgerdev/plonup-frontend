"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SettingsSection() {
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

  return (
    <div className="space-y-4 max-w-md">
      <h2 className="text-xl font-semibold">Ustawienia konta</h2>

      <Button onClick={handleExport}>Eksportuj moje dane (RODO)</Button>

      <p className="text-sm text-muted-foreground">
        Pobierzesz plik JSON zawierający wszystkie dane powiązane z Twoim
        kontem.
      </p>
    </div>
  );
}
