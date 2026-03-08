import Link from "next/link";
import { User, Shield, Mail, Settings } from "lucide-react";

// UI
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function UserAccountPage() {
  return (
    <div className="space-y-8">
      {/* 🔹 Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-800">Twoje konto</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Zarządzaj danymi konta, bezpieczeństwem i ustawieniami.
        </p>
      </div>

      {/* 🔹 Sekcje */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 📌 Dane konta */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-6 h-6 text-[var(--accent-main)]" />
              <h2 className="text-lg font-semibold">Dane konta</h2>
            </div>

            <p className="text-sm text-muted-foreground">
              Podstawowe informacje o Twoim koncie użytkownika.
            </p>

            <div className="pt-2">
              <Button variant="outline" disabled>
                Edytuj dane (wkrótce)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 🔐 Bezpieczeństwo */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-[var(--accent-main)]" />
              <h2 className="text-lg font-semibold">Bezpieczeństwo</h2>
            </div>

            <p className="text-sm text-muted-foreground">
              Zmień hasło i zadbaj o bezpieczeństwo swojego konta.
            </p>

            <div className="pt-2">
              <Link href="/panel/konto-uzytkownika/bezpieczenstwo">
                <Button variant="default">Przejdź do bezpieczeństwa</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* 📧 E-mail */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-[var(--accent-main)]" />
              <h2 className="text-lg font-semibold">Adres e-mail</h2>
            </div>

            <p className="text-sm text-muted-foreground">
              W przyszłości umożliwimy zmianę adresu e-mail z potwierdzeniem.
            </p>

            <div className="pt-2">
              <Button variant="outline" disabled>
                Zmień e-mail (wkrótce)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* ⚙️ Ustawienia */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <Settings className="w-6 h-6 text-[var(--accent-main)]" />
              <h2 className="text-lg font-semibold">Ustawienia</h2>
            </div>

            <p className="text-sm text-muted-foreground">
              Preferencje konta i ustawienia aplikacji.
            </p>

            <div className="pt-2">
              <Link href="/panel/konto-uzytkownika/ustawienia">
                <Button variant="outline">Ustawienia</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
