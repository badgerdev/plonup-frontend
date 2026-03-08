"use client";

import { CATEGORIES } from "@/lib/constants/categories";

const BACKEND_VALID_CATEGORIES = [
  "owoce",
  "warzywa",
  "mięso",
  "nabiał",
  "przetwory",
  "słoiki",
  "jaja",
  "miód",
  "zboża",
  "zioła",
  "oleje",
  "pieczywo",
  "napoje",
  "inne",
];

export default function TestKategoriePage() {
  const frontendKeys = CATEGORIES.map((c) => c.key);
  const backendKeys = BACKEND_VALID_CATEGORIES;

  const missingInFrontend = backendKeys.filter(
    (key) => !frontendKeys.includes(key)
  );
  const extraInFrontend = frontendKeys.filter(
    (key) => !backendKeys.includes(key)
  );

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">🧪 Test kategorii</h1>
      <p>
        ✅ Wszystkie kategorie zgodne:{" "}
        <strong>
          {missingInFrontend.length === 0 && extraInFrontend.length === 0
            ? "TAK"
            : "NIE"}
        </strong>
      </p>

      {missingInFrontend.length > 0 && (
        <div className="mt-4">
          <p className="text-red-600 font-semibold">Brakuje w frontendzie:</p>
          <ul className="list-disc ml-6">
            {missingInFrontend.map((key) => (
              <li key={key}>{key}</li>
            ))}
          </ul>
        </div>
      )}

      {extraInFrontend.length > 0 && (
        <div className="mt-4">
          <p className="text-yellow-600 font-semibold">
            Nadmiarowe w frontendzie:
          </p>
          <ul className="list-disc ml-6">
            {extraInFrontend.map((key) => (
              <li key={key}>{key}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
