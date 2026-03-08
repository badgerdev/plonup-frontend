"use client";

type Props = {
  avg: number;
};

export function UserScoringLabel({ avg }: Props) {
  if (avg >= 4.5)
    return (
      <span className="text-sm text-zinc-700 font-semibold">
        Znakomity użytkownik!
      </span>
    );
  if (avg >= 4)
    return (
      <span className="text-sm text-zinc-700 font-semibold">
        Super użytkownik!
      </span>
    );
  if (avg >= 3)
    return (
      <span className="text-sm text-zinc-700 font-semibold">
        Dobry użytkownik!
      </span>
    );
  if (avg >= 2)
    return (
      <span className="text-sm text-zinc-700 font-semibold">
        Niezły użytkownik!
      </span>
    );
  if (avg > 0)
    return (
      <span className="text-sm text-zinc-700 font-semibold">
        Są zastrzeżenia...
      </span>
    );
  return <span className="text-sm text-zinc-700 font-semibold">Brak ocen</span>;
}
