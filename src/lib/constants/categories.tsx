export type Category = {
  key: string;
  label: string;
  icon: string; // na razie emoji, potem podmienimy na ReactNode
};

export const CATEGORIES: Category[] = [
  { key: "owoce", label: "Owoce", icon: "🍎" },
  { key: "warzywa", label: "Warzywa", icon: "🥬" },
  { key: "mięso", label: "Mięso", icon: "🥩" },
  { key: "nabiał", label: "Nabiał", icon: "🧀" },
  { key: "przetwory", label: "Przetwory", icon: "🥫" },
  { key: "słoiki", label: "Słoiki", icon: "🫙" },
  { key: "jaja", label: "Jaja", icon: "🥚" },
  { key: "miód", label: "Miód", icon: "🍯" },
  { key: "zboża", label: "Zboża", icon: "🌾" },
  { key: "zioła", label: "Zioła", icon: "🌿" },
  { key: "pieczywo", label: "Pieczywo", icon: "🍞" },
  { key: "napoje", label: "Napoje", icon: "🥤" },
  { key: "inne", label: "Inne", icon: "📦" },
];
