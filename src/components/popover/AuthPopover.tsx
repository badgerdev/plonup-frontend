import { PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import { Lock, LogIn } from "lucide-react";

export const AuthPopover = ({
  handleRedirect,
}: {
  handleRedirect: (to: "login" | "rejestracja") => void;
}) => (
  // Domyślne tło i cienie z shadcn/ui, bez zbędnych klas
  <PopoverContent
    className="w-80 border border-[var(--accent-main)] bg-gray-100 p-8 rounded-md "
    sideOffset={10}
  >
    <div className="grid gap-4">
      <div className="space-y-2 text-center">
        <div className="flex justify-center">
          <div className="p-2 bg-muted rounded-full">
            <Lock className="h-6 w-6 text-foreground" />
          </div>
        </div>
        <h4 className="font-semibold text-foreground">Dostęp ograniczony</h4>
        <p className="text-sm text-muted-foreground">
          Zaloguj się, aby zobaczyć dane kontaktowe ogłoszeniodawcy.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleRedirect("rejestracja")}
          className="border-[var(--accent-green)] hover:cursor-pointer"
        >
          Załóż konto
        </Button>
        <Button
          size="sm"
          onClick={() => handleRedirect("login")}
          className=" flex gap-2 items-center border border-transparent bg-[var(--accent-green)] hover:bg-white hover:text-[black] hover:border-[var(--accent-green)] hover:cursor-pointer"
        >
          <LogIn />
          Zaloguj się
        </Button>
      </div>
    </div>
  </PopoverContent>
);
