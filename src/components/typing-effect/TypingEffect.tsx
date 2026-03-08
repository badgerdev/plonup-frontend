import { ReactNode } from "react";

interface AnimatedTextProps {
  text: string;
  timeDelay?: number;
  nextLetterDelay?: number;
  children?: ReactNode;
  className?: string;
}

export const TypingEffect = ({
  text,
  timeDelay,
  nextLetterDelay,
  children,
  className = "",
}: AnimatedTextProps) => {
  // in seconds
  const FADE_IN_LETTER_DELAY = timeDelay ?? 1.3;
  const LETTER_SPACING_TIME = nextLetterDelay ?? 0.05;

  return (
    <p className={`text-lg text-gray-600 mt-2 ${className}`}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="fade-in-letter"
          style={{
            animationDelay: `${
              FADE_IN_LETTER_DELAY + i * LETTER_SPACING_TIME
            }s`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
      {children}
    </p>
  );
};
