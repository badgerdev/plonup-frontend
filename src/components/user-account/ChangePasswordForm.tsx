"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import { useChangePasswordValidation } from "@/hooks/auth/useChangePasswordValidation";

export default function ChangePasswordForm() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { validate, errors } = useChangePasswordValidation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate(form)) return;

    setLoading(true);

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          current_password: form.currentPassword,
          new_password: form.newPassword,
        }),
      });

      if (!res.ok) {
        throw new Error();
      }

      toast.success("Hasło zostało zmienione. Zaloguj się ponownie.");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch {
      toast.error("Aktualne hasło jest nieprawidłowe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <Input
          type="password"
          name="currentPassword"
          placeholder="Aktualne hasło"
          value={form.currentPassword}
          onChange={handleChange}
        />
        {errors.currentPassword && (
          <p className="text-xs text-destructive">{errors.currentPassword}</p>
        )}
      </div>

      <div className="space-y-1">
        <Input
          type="password"
          name="newPassword"
          placeholder="Nowe hasło"
          value={form.newPassword}
          onChange={handleChange}
        />
        {errors.newPassword && (
          <p className="text-xs text-destructive">{errors.newPassword}</p>
        )}
      </div>

      <div className="space-y-1">
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Powtórz nowe hasło"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <p className="text-xs text-destructive">{errors.confirmPassword}</p>
        )}
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Zmienianie hasła..." : "Zmień hasło"}
      </Button>
    </form>
  );
}
