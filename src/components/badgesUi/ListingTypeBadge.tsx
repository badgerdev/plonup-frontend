import { HandHeart, Handshake } from "lucide-react";
import { cn } from "@/lib/utils";

type ListingType = "free" | "sale_or_exchange";

type Props = {
  type: ListingType;
  label?: string;
  className?: string;
};

export const ListingTypeBadge = ({ type, label, className }: Props) => {
  const isFree = type === "free";

  return (
    <span
      aria-label={isFree ? "Za darmo" : "Sprzedaż lub wymiana"}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium rounded-full shadow-md",
        isFree
          ? "bg-green-50 border border-zinc-300 text-black"
          : "bg-green-50 border border-zinc-300 text-black",
        className
      )}
    >
      {isFree ? (
        <HandHeart className="w-3.5 h-3.5 text-[var(--accent-green)]" />
      ) : (
        <Handshake className="w-3.5 h-3.5 text-[var(--accent-main)]" />
      )}
      {label ?? (isFree ? "Za darmo" : "Sprzedaż / wymiana")}
    </span>
  );
};
