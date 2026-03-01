import { getTranslations } from "next-intl/server";
import type { SectionId } from "@/data/matang";

type Props = { id: SectionId };

export async function SectionCard({ id }: Props) {
  const t = await getTranslations("sections");
  const title = t(`${id}.title`);
  const p1 = t(`${id}.p1`);
  const p2 = t(`${id}.p2`);

  return (
    <section
      id={id}
      className="matang-anchor matang-card p-6 sm:p-8 md:p-10"
      aria-labelledby={`section-${id}-title`}
    >
      <h2
        id={`section-${id}-title`}
        className="matang-section-title mb-4 text-2xl sm:text-3xl"
      >
        {title}
      </h2>
      <div className="space-y-4 text-white/90">
        <p className="leading-relaxed">{p1}</p>
        <p className="leading-relaxed">{p2}</p>
      </div>
    </section>
  );
}
