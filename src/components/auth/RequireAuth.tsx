"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth/useAuth";
import { Loader2 } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

export const RequireAuth = ({ children }: Props) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace(
        "/login?next=" + encodeURIComponent(window.location.pathname)
      );
    } else if (!loading) {
      setChecked(true); // tylko jeśli nie loading i user jest
    }
  }, [loading, isAuthenticated, router]);

  if (loading || !checked) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-muted-foreground gap-2">
        <Loader2 className="w-6 h-6 animate-spin" />
        <p>Sprawdzanie autoryzacji...</p>
      </div>
    );
  }

  return <>{children}</>;
};
