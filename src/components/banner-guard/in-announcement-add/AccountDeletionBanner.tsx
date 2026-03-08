"use client";

import { LogOut, Undo2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useLogout } from "@/hooks/auth/useLogout";

export function AccountDeletionBanner() {
  const { handleLogout } = useLogout();

  return (
    <Card
      className="
    w-full
    max-w-xl md:max-lg
    mx-auto
    mt-10 md:mt-0
    animate-in fade-in slide-in-from-bottom-4
  "
    >
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-orange-600">
          <ShieldAlert className="h-7 w-7" />
        </div>

        <CardTitle>Konto w trakcie usuwania</CardTitle>
        <CardDescription>
          Większość funkcji została zablokowana.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        <Button
          size="lg"
          className="bg-orange-600 hover:bg-orange-700 text-white"
          onClick={() => alert("TODO: anulowanie usuwania konta")}
        >
          <Undo2 className="mr-2 h-4 w-4" />
          Anuluj usuwanie
        </Button>

        <Button variant="outline" size="lg" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Wyloguj się
        </Button>
      </CardContent>
    </Card>
  );
}
