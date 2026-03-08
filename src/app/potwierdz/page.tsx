"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Mail, CheckCircle, XCircle, Info } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

import { useAuth } from "@/hooks/auth/useAuth";
import { useEmailVerification } from "@/hooks/guards/useEmailVerification";
import { usePublicEmailVerification } from "@/hooks/guards/usePublicEmailVerification";

type VerifyStatus =
  | "idle"
  | "loading"
  | "success"
  | "already_verified"
  | "invalid"
  | "expired";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const fromRegister = searchParams.get("from") === "register";
  const email = searchParams.get("email");

  const { user, loading: authLoading } = useAuth();

  // resend (logged)
  const {
    cooldown: loggedCooldown,
    isSending: loggedSending,
    resendVerification: resendLogged,
  } = useEmailVerification();

  // resend (public)
  const {
    cooldown: publicCooldown,
    isSending: publicSending,
    limitReached,
    resend: resendPublic,
  } = usePublicEmailVerification(email);

  const [verifyStatus, setVerifyStatus] = useState<VerifyStatus>("idle");

  // -------------------------------------------------------
  // VERIFY TOKEN (ONLY IF TOKEN EXISTS)
  // -------------------------------------------------------
  useEffect(() => {
    if (!token) return;

    async function verify() {
      setVerifyStatus("loading");

      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (data.status === "success") setVerifyStatus("success");
      else if (data.status === "already_verified")
        setVerifyStatus("already_verified");
      else if (data.status === "expired") setVerifyStatus("expired");
      else setVerifyStatus("invalid");
    }

    verify();
  }, [token]);

  // -------------------------------------------------------
  // SHARED UI HELPERS
  // -------------------------------------------------------
  const CardWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen flex items-center justify-center bg-[var(--accent-light)] p-4">
      <Card className="w-full max-w-md shadow-sm border border-gray-200">
        {children}
      </Card>
    </div>
  );

  const handleResend = user ? resendLogged : resendPublic;
  const cooldown = user ? loggedCooldown : publicCooldown;
  const isSending = user ? loggedSending : publicSending;
  const canResend = !!email || !!user;

  // -------------------------------------------------------
  // AUTH LOADING
  // -------------------------------------------------------
  if (authLoading) {
    return (
      <CardWrapper>
        <CardHeader className="text-center space-y-3">
          <Mail className="w-10 h-10 text-gray-400 animate-pulse mx-auto" />
          <CardTitle>Ładowanie…</CardTitle>
          <CardDescription>Sprawdzamy status konta.</CardDescription>
        </CardHeader>
      </CardWrapper>
    );
  }

  // =======================================================
  // 🔐 TOKEN-BASED STATES (HIGHEST PRIORITY)
  // =======================================================

  if (verifyStatus === "loading") {
    return (
      <CardWrapper>
        <CardHeader className="text-center space-y-3">
          <Mail className="w-10 h-10 animate-pulse mx-auto" />
          <CardTitle>Weryfikujemy link…</CardTitle>
          <CardDescription>Prosimy o chwilę cierpliwości.</CardDescription>
        </CardHeader>
      </CardWrapper>
    );
  }

  if (verifyStatus === "success") {
    return (
      <CardWrapper>
        <CardHeader className="text-center space-y-3">
          <CheckCircle className="w-10 h-10 text-green-600 mx-auto" />
          <CardTitle>E-mail potwierdzony 🎉</CardTitle>
          <CardDescription>Twoje konto zostało aktywowane.</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button className="w-full" onClick={() => (location.href = "/login")}>
            Przejdź do logowania
          </Button>
        </CardFooter>
      </CardWrapper>
    );
  }

  if (verifyStatus === "already_verified") {
    return (
      <CardWrapper>
        <CardHeader className="text-center space-y-3">
          <CheckCircle className="w-10 h-10 text-green-600 mx-auto" />
          <CardTitle>Konto jest już aktywne</CardTitle>
          <CardDescription>
            Ten adres e-mail został już wcześniej potwierdzony.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button className="w-full" onClick={() => (location.href = "/login")}>
            Przejdź do logowania
          </Button>
        </CardFooter>
      </CardWrapper>
    );
  }

  if (verifyStatus === "expired" || verifyStatus === "invalid") {
    return (
      <CardWrapper>
        <CardHeader className="text-center space-y-3">
          <XCircle className="w-10 h-10 text-orange-500 mx-auto" />
          <CardTitle>
            {verifyStatus === "expired" ? "Link wygasł" : "Nieprawidłowy link"}
          </CardTitle>
          <CardDescription>
            Możesz wysłać nowy link aktywacyjny.
          </CardDescription>
        </CardHeader>

        {canResend && (
          <CardFooter>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleResend}
              disabled={cooldown > 0 || isSending || limitReached}
            >
              {limitReached
                ? "Limit wysyłek osiągnięty"
                : cooldown > 0
                  ? `Wyślij ponownie (${cooldown}s)`
                  : isSending
                    ? "Wysyłanie…"
                    : "Wyślij ponownie link"}
            </Button>
          </CardFooter>
        )}
      </CardWrapper>
    );
  }

  // =======================================================
  // 🟢 NO TOKEN FLOWS
  // =======================================================

  if (fromRegister && !token) {
    return (
      <CardWrapper>
        <CardHeader className="text-center space-y-3">
          <Mail className="w-10 h-10 mx-auto" />
          <CardTitle>Sprawdź skrzynkę e-mail</CardTitle>
          <CardDescription>Wysłaliśmy Ci link aktywacyjny.</CardDescription>
        </CardHeader>

        <CardContent>
          <Alert>
            <AlertTitle>Dlaczego to ważne?</AlertTitle>
            <AlertDescription>
              Weryfikacja odblokuje wszystkie funkcje portalu.
            </AlertDescription>
          </Alert>
        </CardContent>

        <CardFooter>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleResend}
            disabled={cooldown > 0 || isSending || limitReached}
          >
            {cooldown > 0
              ? `Wyślij ponownie (${cooldown}s)`
              : "Wyślij ponownie link"}
          </Button>
        </CardFooter>
      </CardWrapper>
    );
  }

  if (!user && !token) {
    return (
      <CardWrapper>
        <CardHeader className="text-center space-y-3">
          <Info className="w-10 h-10 mx-auto" />
          <CardTitle>Aktywacja konta</CardTitle>
          <CardDescription>
            Ta strona służy do potwierdzania adresu e-mail.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button
            className="w-full"
            onClick={() => (location.href = "/rejestracja")}
          >
            Załóż konto
          </Button>
        </CardFooter>
      </CardWrapper>
    );
  }
  // =======================================================
  // 🔔 LOGGED IN, NOT VERIFIED, NO TOKEN
  // =======================================================
  if (user && !user.is_verified && !token) {
    return (
      <CardWrapper>
        <CardHeader className="text-center space-y-3">
          <Info className="w-10 h-10 text-orange-500 mx-auto" />
          <CardTitle>Zweryfikuj swój adres e-mail</CardTitle>
          <CardDescription>
            Twoje konto nie zostało jeszcze aktywowane.
            <br />
            Kliknij w link wysłany na e-mail lub wyślij go ponownie.
          </CardDescription>
        </CardHeader>

        <CardFooter>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleResend}
            disabled={cooldown > 0 || isSending || limitReached}
          >
            {limitReached
              ? "Limit wysyłek osiągnięty"
              : cooldown > 0
                ? `Wyślij ponownie (${cooldown}s)`
                : isSending
                  ? "Wysyłanie…"
                  : "Wyślij ponownie link"}
          </Button>
        </CardFooter>
      </CardWrapper>
    );
  }

  return null;
}
