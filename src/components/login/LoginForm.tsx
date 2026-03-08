"use client";

import { useState, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// UI
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next") || "/panel";
  const reason = searchParams.get("reason");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // HARD REFRESH instead of router refresh
        toast.success("Zalogowano pomyślnie ✅");
        window.location.href = nextUrl;
      } else {
        setError(data?.error || "Niepoprawny login lub hasło");
      }
    } catch (err) {
      console.error("Błąd po stronie klienta:", err);
      setError("Wystąpił błąd połączenia. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md w-full space-y-4">
      {reason && (
        <p className="text-sm text-amber-600 text-center font-bold flex items-center justify-center gap-2">
          <TriangleAlert />
          Sesja wygasła. Zaloguj się ponownie.
        </p>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">
          Nazwa użytkownika
        </label>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="np. janek"
          required
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Hasło</label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Twoje tajne hasło"
          required
          className="w-full"
        />
        <div className="pt-2">
          <Link href="/forgot-password">Zapomniałeś hasła ?</Link>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Logowanie..." : "Zaloguj się"}
      </Button>
      <p className="text-md text-center text-muted-foreground">
        Nie masz konta?{" "}
        <Link
          href={`/rejestracja?next=${encodeURIComponent(nextUrl)}`}
          className="text-orange-600 hover:underline font-bold"
        >
          Zarejestruj się tutaj
        </Link>
      </p>
    </form>
  );
};
