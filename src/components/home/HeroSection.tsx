// components/home/HeroSection.tsx

import { HeroSearch } from "./HeroSearch";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link"; // Dodano, aby przyciski były linkami
import { Building2 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-between md:justify-center overflow-hidden text-[var(--accent-dark)] animate-fade-in-slow">
      {/*  Gradient  */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#efeeec] to-[#d8d6d1] z-0" />

      {/* Kontener main */}
      <div className="relative z-10 w-full max-w-7xl px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* wyszukiwarka */}
        <div className="pt-30 md:pt-0 flex-1 w-full">
          <HeroSearch />
        </div>

        {/* 📸 Prawa strona – kompozycja graficzna */}
        <div className="hidden md:flex flex-1 flex-col items-center justify-center relative w-full h-[500px]">
          {/* Główne zdjęcie */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-3xl overflow-hidden shadow-2xl rotate-[-4deg] animate-float-slow">
            <Image
              src="/placeholder.jpg"
              alt="Warzywo 1"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Drugie zdjęcie */}
          <div className="absolute bottom-6 left-[calc(50%-100px)] w-[220px] h-[220px] rounded-2xl overflow-hidden shadow-lg rotate-[3deg] animate-fade-in-slow animate-delay-300">
            <Image
              src="/placeholder.jpg"
              alt="Warzywo 2"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* btns */}
      <div className="min-w-full pb-12 px-8 md:mt-20 flex gap-6 flex-col md:flex-row justify-center animate-fade-in animate-delay-500 mt-16">
        <Link href="/rejestracja" className="w-full md:w-[40%] lg:w-[220px]">
          <Button className="w-full h-auto py-3 text-sm md:text-base font-medium rounded-full bg-[var(--accent-main)] hover:bg-[var(--accent-main-hover)] text-white hover:cursor-pointer transition-all duration-300">
            Dołącz do społeczności
          </Button>
        </Link>
        <Link href="/poznaj" className="w-full md:w-[40%] lg:w-[220px]">
          <Button className="w-full h-auto py-3 text-sm md:text-base font-medium rounded-full text-[var(--accent-main)] transition-all duration-300 bg-white hover:underline hover:underline-offset-2 border-white hover:bg-white hover:cursor-pointer">
            Dla Firm
            <Building2 />
          </Button>
        </Link>
      </div>
    </section>
  );
}
