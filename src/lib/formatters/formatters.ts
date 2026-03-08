export const formatPostalCode = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 5);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}-${digits.slice(2)}`;
};

export const formatPhoneNumber = (value: string): string => {
  // Usuń wszystko poza cyframi
  const digits = value.replace(/\D/g, "");

  // Jeśli zaczyna się od 48 lub 0048, usuń ten prefix
  const normalized = digits.replace(/^(\+?48|0048)?/, "");

  // Zostaw tylko 9 cyfr (czyli bez +48)
  const core = normalized.slice(0, 9);

  const parts = [core.slice(0, 3), core.slice(3, 6), core.slice(6, 9)];
  const formatted = parts.filter(Boolean).join(" ");

  return formatted ? `+48 ${formatted}` : "";
};

// unkcja do odmiany "polubienie/polubienia/polubień"
export const formatLikes = (count: number): string => {
  if (count === 0) return "0";

  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (count === 1) return "1 osoba lubi to.";
  if (
    lastDigit >= 2 &&
    lastDigit <= 4 &&
    !(lastTwoDigits >= 12 && lastTwoDigits <= 14)
  ) {
    return `${count} osoby lubią to.`;
  }
  return `${count} osób lubi to.`;
};

export const formatRelativeDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < 60) return "przed chwilą";
  if (diff < 3600) return `${Math.floor(diff / 60)} min temu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} godz. temu`;
  if (diff < 172800) return "wczoraj";
  return date.toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
