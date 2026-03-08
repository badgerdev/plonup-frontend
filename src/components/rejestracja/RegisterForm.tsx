"use client";

import { useState } from "react";
import { useRegisterValidation } from "@/hooks/register/useRegisterValidation";

// UI
import { StatusIcon } from "@/components/ui/statusIcon";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { UserPen, Eye, EyeOff } from "lucide-react";
import Benefits from "./Benefits";

export default function RegisterForm() {
  const { validate, errors } = useRegisterValidation();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [apiError, setApiError] = useState<{
    username?: string;
    email?: string;
  }>({});

  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof typeof formData
  ) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextUrl = `/potwierdz?from=register&email=${encodeURIComponent(
    formData.email
  )}`;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setApiError({});

    const isValid = validate(formData);
    if (!isValid) return;

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Rejestracja udana – sprawdź skrzynkę e-mail 📬");
      window.location.href = nextUrl;
    } else {
      if (data?.error?.includes("e-mail")) {
        setApiError({ email: data.error });
      } else if (data?.error?.includes("nazwa")) {
        setApiError({ username: data.error });
      } else {
        setApiError({ username: data.error || "Błąd rejestracji" });
      }
    }
  };

  // flags
  const password = formData.password;
  const username = formData.username;

  const usernameValid =
    username.length >= 4 &&
    username.length <= 16 &&
    /^[a-zA-Z0-9_ ]*$/.test(username);

  const passwordFlags = {
    length: password.length >= 8 && password.length <= 40,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[\W_]/.test(password),
  };

  return (
    <div className="min-h-screen w-full bg-[var(--accent-light)] py-20 px-4 sm:px-6 lg:px-8">
      {/* 📱 mobile: flat; 💻 desktop: card look */}
      <div className="w-full max-w-5xl mx-auto bg-[var(--accent-light)] lg:bg-white lg:shadow-xl lg:rounded-2xl overflow-hidden flex flex-col lg:flex-row">
        {/* FORMULARZ */}
        <div className="p-8 sm:p-10 flex-1 flex flex-col items-center lg:items-start">
          <h1 className="flex items-center gap-4 text-xl md:text-2xl font-bold text-zinc-700 mb-6 self-center">
            <UserPen className="w-8 h-8 text-[var(--accent-light-green)]" />
            Załóż konto w Plonup
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
            {/* Username */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Nazwa użytkownika</label>
              <div className="relative flex items-center gap-2">
                <Input
                  className="w-full"
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleChange(e, "username")}
                  placeholder="np. Spoko Loko"
                  maxLength={20}
                  minLength={4}
                />
                <StatusIcon
                  status={username.length === 0 ? null : usernameValid}
                />
              </div>
              {apiError.username && (
                <p className="text-sm text-red-600">{apiError.username}</p>
              )}
              <ul className="text-xs text-muted-foreground space-y-1 pl-1">
                <li>• Min. 4 znaki</li>
                <li>• Maks. 20 znaków</li>
                <li>• Dozwolone: litery, cyfry, spacje i _</li>
              </ul>
              {submitted && errors.username && (
                <p className="text-sm text-red-600">{errors.username}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm font-medium">E-mail</label>
              <div className="relative flex items-center gap-2">
                <Input
                  className="w-full"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange(e, "email")}
                  placeholder="np. jan@plonup.pl"
                />
                <StatusIcon
                  status={
                    formData.email.length === 0
                      ? null
                      : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                  }
                />
              </div>
              {apiError.email && (
                <p className="text-sm text-red-600">{apiError.email}</p>
              )}
              {submitted && errors.email && (
                <p className="text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Hasło</label>
              <div className="relative">
                <Input
                  className="w-full pr-10"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleChange(e, "password")}
                  placeholder="********"
                  maxLength={40}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-2.5 text-zinc-500 hover:text-zinc-700 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

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
                  Przynajmniej jedna cyfra (0-9)
                </li>
                <li className="flex items-center gap-2">
                  <StatusIcon status={passwordFlags.special} />
                  Znak specjalny (!@#$...)
                </li>
              </ul>
              {submitted && errors.password && (
                <p className="text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-sm font-medium">Powtórz hasło</label>
              <div className="relative flex items-center gap-2">
                <Input
                  className="w-full"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange(e, "confirmPassword")}
                  placeholder="********"
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

            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full mt-6 rounded-full shadow-md"
            >
              Zarejestruj się
            </Button>
          </form>
        </div>

        {/* INFO BOX */}
        <div className="p-8 sm:p-10 flex-1 flex flex-col justify-center lg:border-l border-gray-200 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center lg:text-left">
            Dlaczego warto założyć konto?
          </h2>
          <Benefits />
        </div>
      </div>
    </div>
  );
}
