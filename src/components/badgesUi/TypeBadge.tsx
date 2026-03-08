import { UsersRound, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  type: "private" | "business";
  label?: string;
  className?: string;
};

export const TypeBadge = ({ type, label, className }: Props) => {
  const isPrivate = type === "private";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium rounded-full",
        isPrivate
          ? "bg-[#303030]/90 border border-[#c5d7a3] shadow-md text-[#c5d7a3] text-xs"
          : "bg-[#303030]/90 border border-[#d8aada] text-[#d8aada] shadow-md text-xs",
        className
      )}
    >
      {isPrivate ? (
        <UsersRound className=" hidden h-3.5 w-3.5 text-[#c5d7a3]" />
      ) : (
        <Briefcase className=" hidden h-3.5 w-3.5 text-[#d8aada]" />
      )}
      {label ?? (isPrivate ? "Prywatne" : " Firmowe")}
    </span>
  );
};
