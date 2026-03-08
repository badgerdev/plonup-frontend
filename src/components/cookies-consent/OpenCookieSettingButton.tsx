"use client";

type Props = {
  className?: string;
};

export function OpenCookieSettingsButton({ className }: Props) {
  return (
    <button
      type="button"
      onClick={() => {
        window.dispatchEvent(new Event("open-cookie-settings"));
      }}
      className={className}
    >
      Ustawienia cookies
    </button>
  );
}
