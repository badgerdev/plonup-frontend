"use client";

import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/auth/useAuth";

import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Copy, User, CalendarDays } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { AuthPopover } from "../popover/AuthPopover";

interface ContactSectionProps {
  phone?: string;
  email?: string;
  user: string;
  userId: number;
  createdAt: string;
}

export function ContactSection({
  phone,
  email,
  user,
  userId,
  createdAt,
}: ContactSectionProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  if (!phone && !email) return null;

  const handleRedirect = (to: "login" | "rejestracja") => {
    router.push(`/${to}?next=${pathname}`);
  };

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    toast.success("Skopiowano!");
  };

  return (
    <section className="border border-border rounded-xl p-6 shadow-sm space-y-6 bg-white">
      <h2 className="text-lg font-semibold text-foreground">
        Kontakt do ogłoszeniodawcy
      </h2>

      <Tabs defaultValue={phone ? "phone" : "email"} className="w-full">
        {/* --- LISTA ZAKŁADEK (pasek) --- */}
        <TabsList
          className="
            grid w-full grid-cols-2 mb-4 rounded-full bg-gray-200
          "
        >
          <TabsTrigger
            value="phone"
            disabled={!phone}
            className="
              rounded-full text-sm
              data-[state=active]:bg-white
              data-[state=active]:text-foreground
              data-[state=active]:shadow-md
              data-[state=active]:border data-[state=active]:border-[var(--accent-main)] 
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
              disabled:opacity-50
            "
          >
            Telefon
          </TabsTrigger>
          <TabsTrigger
            value="email"
            disabled={!email}
            className="
              rounded-full text-sm
              data-[state=active]:bg-background
              data-[state=active]:text-foreground
              data-[state=active]:shadow-sm
              data-[state=active]:border data-[state=active]:border-[var(--accent-main)] 
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
              disabled:opacity-50
            "
          >
            E-mail
          </TabsTrigger>
        </TabsList>

        {/* 📞 TELEFON */}
        <TabsContent value="phone">
          {phone ? (
            loading ? (
              <Skeleton className="h-12 w-full rounded-md" />
            ) : isAuthenticated ? (
              <div className="flex items-center justify-between border-2 border-green-500 bg-green-50 text-black rounded-md px-4 py-3 hover:shadow-sm transition-all">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5" />
                  <a href={`tel:${phone}`} className="text-base font-medium">
                    {phone}
                  </a>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(phone)}
                  title="Kopiuj numer"
                  className="text-green-600 hover:text-green-700 hover:bg-green-100"
                >
                  <Copy className="w-5 h-5" />
                </Button>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-center gap-2 h-12 text-base border border-[var(--accent-green)]"
                  >
                    <Phone className="h-4 w-4" />
                    Pokaż numer telefonu
                  </Button>
                </PopoverTrigger>
                <AuthPopover handleRedirect={handleRedirect} />
              </Popover>
            )
          ) : (
            <p className="text-sm text-muted-foreground text-center py-3">
              Ogłoszeniodawca nie podał numeru telefonu.
            </p>
          )}
        </TabsContent>

        {/* 📧 EMAIL */}
        <TabsContent value="email">
          {email ? (
            loading ? (
              <Skeleton className="h-12 w-full rounded-md" />
            ) : isAuthenticated ? (
              <div className="flex items-center justify-between border-2 border-green-500 bg-green-50 text-black rounded-md px-4 py-3 hover:shadow-sm transition-all">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5" />
                  <a href={`mailto:${email}`} className="text-base font-medium">
                    {email}
                  </a>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(email)}
                  title="Kopiuj e-mail"
                  className="text-green-600 hover:text-green-700 hover:bg-green-100"
                >
                  <Copy className="w-5 h-5" />
                </Button>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-center gap-2 h-12 text-base border border-[var(--accent-green)]"
                  >
                    <Mail className="h-4 w-4" />
                    Pokaż adres e-mail
                  </Button>
                </PopoverTrigger>
                <AuthPopover handleRedirect={handleRedirect} />
              </Popover>
            )
          ) : (
            <p className="text-sm text-muted-foreground text-center py-3">
              Ogłoszeniodawca nie podał adresu e-mail.
            </p>
          )}
        </TabsContent>

        {/* 👤 Info o użytkowniku + data */}
        <div className="flex flex-col gap-4 border-t pt-4 mt-6">
          <div className="flex items-center gap-3 text-base">
            <div className="w-8 h-8 flex items-center justify-center bg-muted rounded-full shadow-sm">
              <User className="w-5 h-5 text-[var(--accent-main)]" />
            </div>
            <span className="text-muted-foreground">Dodane przez:</span>
            <Link
              href={`/uzytkownicy/${userId}`}
              className="font-semibold text-primary hover:underline"
            >
              {user}
            </Link>
          </div>
          <div className="flex items-center gap-3 text-base">
            <div className="w-8 h-8 flex items-center justify-center bg-muted rounded-full shadow-sm">
              <CalendarDays className="w-5 h-5 text-[var(--accent-main)]" />
            </div>
            <span className="text-muted-foreground">
              Dnia:{" "}
              <span className="font-semibold text-primary">
                {new Date(createdAt).toLocaleDateString("pl-PL", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
            </span>
          </div>
        </div>
      </Tabs>
    </section>
  );
}
