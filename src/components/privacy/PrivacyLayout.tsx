export function PrivacyLayout({
  title,
  updatedAt,
  sections,
}: {
  title: string;
  updatedAt: string;
  sections: { title: string; content: string }[];
}) {
  return (
    <div
      className="max-w-3xl mx-auto px-4 py-16 mt-20
     space-y-10"
    >
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-sm text-muted-foreground">
          Ostatnia aktualizacja: {updatedAt}
        </p>
      </header>

      <div className="space-y-8">
        {sections.map((section, idx) => (
          <section key={idx} className="space-y-2">
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
              {section.content}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
