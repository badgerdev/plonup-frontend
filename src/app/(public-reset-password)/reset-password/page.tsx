"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useResetPasswordValidation } from "@/hooks/auth/useResetPasswordValidation";
import { useAuthStore } from "@/store/auth-store";

// UI
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatusIcon } from "@/components/ui/statusIcon";
import { toast } from "sonner";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const router = useRouter();
  const logoutUser = useAuthStore((s) => s.logoutUser);
  const { validate, errors } = useResetPasswordValidation();

  const token = params.get("token");

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // 🔐 EDGE CASE — brak tokena
  if (!token) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <Lock className="mx-auto w-10 h-10 text-muted-foreground" />
        <h1 className="text-2xl font-bold">Nieprawidłowy link</h1>
        <p className="text-muted-foreground">
          Link resetujący hasło jest nieprawidłowy lub niekompletny.
        </p>
        <Button onClick={() => router.push("/zapomnialem-hasla")}>
          Wyślij nowy link
        </Button>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof typeof formData
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (!validate(formData)) return;

    setLoading(true);

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        password: formData.password,
      }),
    });

    if (!res.ok) {
      toast.error("Link resetujący wygasł lub jest nieprawidłowy.");
      setLoading(false);
      return;
    }

    toast.success("Hasło zostało zmienione. Zaloguj się ponownie 🔐");

    // 🔥 WYLOGUJ WSZYSTKO (Zustand + cookies)
    await logoutUser();

    // 🔥 TWARDY REDIRECT (bez cofania)
    router.replace("/login?reason=password_changed");
  };

  // 🔐 LIVE FLAGS – identyczne jak w SecurityPage
  const password = formData.password;

  const passwordFlags = {
    length: password.length >= 8 && password.length <= 40,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[\W_]/.test(password),
  };

  return (
    <div className="max-w-md mx-auto py-20 space-y-6">
      <h1 className="flex items-center gap-2 text-2xl font-bold">
        <Lock className="w-6 h-6" />
        Ustaw nowe hasło
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 p-4">
        {/* 🔐 NEW PASSWORD */}
        <div className="space-y-1 flex flex-col">
          <label className="text-sm font-medium">Nowe hasło</label>

          <div className="relative">
            <Input
              className="pr-10 w-full"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleChange(e, "password")}
              placeholder="********"
              maxLength={40}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-2.5 text-zinc-500 hover:text-zinc-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* 🔹 LIVE FLAGS */}
          <ul className="text-xs text-muted-foreground space-y-1">
            <li className="flex items-center gap-2">
              <StatusIcon status={passwordFlags.length} />
              Min. 8 znaków, maks. 40
            </li>
            <li className="flex items-center gap-2">
              <StatusIcon status={passwordFlags.lowercase} />
              Mała litera (a-z)
            </li>
            <li className="flex items-center gap-2">
              <StatusIcon status={passwordFlags.uppercase} />
              Duża litera (A-Z)
            </li>
            <li className="flex items-center gap-2">
              <StatusIcon status={passwordFlags.number} />
              Przynajmniej jedna cyfra
            </li>
            <li className="flex items-center gap-2">
              <StatusIcon status={passwordFlags.special} />
              Znak specjalny
            </li>
          </ul>

          {submitted && errors.password && (
            <p className="text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        {/* 🔐 CONFIRM PASSWORD */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Powtórz nowe hasło</label>

          <div className="relative flex items-center gap-2">
            <Input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange(e, "confirmPassword")}
              placeholder="********"
              className="w-full"
            />
            <StatusIcon
              status={
                formData.confirmPassword.length === 0
                  ? null
                  : formData.confirmPassword === formData.password
              }
            />
          </div>

          {submitted && errors.confirmPassword && (
            <p className="text-sm text-red-600">{errors.confirmPassword}</p>
          )}
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Zmienianie hasła..." : "Zmień hasło"}
        </Button>
      </form>
    </div>
  );
}
