"use client";

import { useState } from "react";
import { useForgotPasswordValidation } from "@/hooks/auth/useForgotPasswordValidation";

// UI
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const { validate, errors } = useForgotPasswordValidation();

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (!validate({ email })) return;

    setLoading(true);

    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setLoading(false);
    setSubmitted(false);
    setEmail("");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto py-20 space-y-4 text-center">
        <Mail className="mx-auto w-10 h-10 text-muted-foreground" />
        <h1 className="text-2xl font-bold">Sprawdź skrzynkę 📬</h1>
        <p className="text-muted-foreground">
          Jeśli konto istnieje, wysłaliśmy link do zmiany hasła.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">Nie pamiętasz hasła?</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1 flex flex-col">
            <label className="text-sm font-medium">Adres e-mail</label>
            <Input
              type="email"
              placeholder="twoj@email.pl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {submitted && errors.email && (
              <p className="text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Wysyłanie..." : "Wyślij link resetujący"}
          </Button>
        </form>
      </div>
    </div>
  );
}
