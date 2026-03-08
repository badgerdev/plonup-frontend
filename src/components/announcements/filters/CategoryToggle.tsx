"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Toggle } from "@/components/ui/toggle";

type Props = {
  keyName: string;
  label: string;
  icon: string;
  isSelected: boolean;
  toggle: () => void;
};

export function CategoryToggle({ label, icon, isSelected, toggle }: Props) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            aria-pressed={isSelected}
            pressed={isSelected}
            onPressedChange={toggle}
            data-state={isSelected ? "on" : "off"}
            className="text-sm px-3 py-2 flex items-center gap-1 rounded-md border-[1.5px] border-border transition-colors data-[state=on]:text-[var(--text-main-darker)] data-[state=on]:border-[var(--accent-main)]
              hover:bg-accent hover:text-foreground hover:cursor-pointer"
          >
            <span className="text-lg">{icon}</span>
            {label}
          </Toggle>
        </TooltipTrigger>
        <TooltipContent side="top">
          {isSelected ? "Usuń filtr ❌" : "Kliknij, by dodać"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
