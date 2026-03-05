export default function SectionHeader({
  category,
  title,
  categoryColor = "var(--color-amber)",
}: {
  category: string;
  title: string;
  categoryColor?: string;
}) {
  return (
    <>
      <div
        className="font-[family-name:var(--font-fira)] text-[11px] tracking-[3px] uppercase mb-3"
        style={{ color: categoryColor }}
      >
        {`// ${category}`}
      </div>
      <h2 className="font-[family-name:var(--font-chakra)] text-3xl md:text-4xl font-bold text-[var(--color-txt)] mb-8">
        {title}
      </h2>
    </>
  );
}
