import { PlusCircle, User, MessageCircle, Leaf } from "lucide-react";

const benefits = [
  {
    icon: PlusCircle,
    text: "Dodawaj własne ogłoszenia.",
  },
  {
    icon: User,
    text: "Widzisz dane kontaktowe innych użytkowników.",
  },
  {
    icon: MessageCircle,
    text: "Wystawiaj opinie i buduj zaufanie.",
  },
  {
    icon: Leaf,
    text: "Wspierasz lokalną produkcję i wymianę",
  },
];

export default function Benefits() {
  return (
    <div className="space-y-6">
      {benefits.map((benefit, i) => (
        <li key={i} className="flex items-start gap-4">
          <div className="shrink-0 pt-1">
            <benefit.icon className="w-5 h-5 text-[var(--accent-light-green)]" />
          </div>
          <p className="text-gray-700 text-base leading-relaxed">
            {benefit.text}
          </p>
        </li>
      ))}
    </div>
  );
}
