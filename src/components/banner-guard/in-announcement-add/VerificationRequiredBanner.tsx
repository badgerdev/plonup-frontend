"use client";

import Link from "next/link";
import { MailWarning } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function VerificationRequiredBanner() {
  return (
    <Card
      className="
    w-full
    max-w-xl md:max-w-lg
    mx-auto
    mt-10 md:mt-0
    animate-in fade-in slide-in-from-bottom-4
  "
    >
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-orange-600">
          <MailWarning className="h-7 w-7" />
        </div>

        <CardTitle>Zweryfikuj adres e-mail</CardTitle>
        <CardDescription>
          Aby dodać ogłoszenie, musisz potwierdzić swój adres e-mail.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Button
          asChild
          size="lg"
          className="w-full bg-orange-600 hover:bg-orange-700 text-white"
        >
          <Link href="/potwierdz">Zweryfikuj teraz</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
