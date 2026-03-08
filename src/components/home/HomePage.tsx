// components/HomePage.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/ogloszenia?q=${searchQuery}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-4">Znajdź to, czego potrzebujesz</h1>
      <p className="text-lg text-gray-600 mb-8">
        Wpisz szukaną frazę i przeglądaj ogłoszenia
      </p>

      <form onSubmit={handleSearch} className="w-full max-w-lg relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="np. Rower, używany laptop, komoda..."
          className="w-full pl-5 pr-12 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--accent-main)] transition-shadow"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-[var(--accent-main)] text-white rounded-full hover:bg-[var(--accent-main-hover)]"
        >
          <Search className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
