"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

export function PanelErrorHandler() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const searchParams = new URLSearchParams(window.location.search);
    const error = searchParams.get("error");

    if (error === "unauthorized") {
      setTimeout(() => {
        toast.error("Brak dostępu do tego ogłoszenia.");
      }, 100);
      router.replace(pathname); // czyści query z URL
    }
  }, [pathname, router]);

  return null;
}
