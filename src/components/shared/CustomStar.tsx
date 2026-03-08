import { Star } from "lucide-react";
import { cn } from "@/lib/utils"; // shadcn util do łączenia klas
import { ComponentProps } from "react";

type Props = ComponentProps<typeof Star>;
//  dziedzicz wszystkie propsy z <Star />

export function CustomStar({ className, ...props }: Props) {
  return (
    <Star
      className={cn("w-4.5 h-4.5 text-[#f5edba] fill-[#e48628]", className)}
      {...props}
    />
  );
}
