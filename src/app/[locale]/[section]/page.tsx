import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Nav } from "@/components/home/Nav";
import { Footer } from "@/components/home/Footer";
import { Link } from "@/i18n/navigation";
import {
  isSectionId,
  isFusedSection,
  FUSED_SECTION_BLOCKS,
  SECTION_IDS,
} from "@/data/matang";
import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{ locale: string; section: string }>;
};

export default async function SectionPage({ params }: Props) {
  const { locale, section } = await params;
  setRequestLocale(locale);

  if (!isSectionId(section)) {
    notFound();
  }

  const t = await getTranslations("sections");
  const tNav = await getTranslations("nav");

  if (isFusedSection(section)) {
    const blocks = FUSED_SECTION_BLOCKS[section];
    const tSection = await getTranslations(`sections.${section}`);
    return (
      <div className="min-h-screen">
        <Nav />
        <main className="mx-auto max-w-3xl px-4 py-24 sm:px-6 sm:py-28">
          <Button
            asChild
            variant="ghost"
            className="mb-6 text-white/80 hover:text-white"
          >
            <Link href="/">← {tNav("home")}</Link>
          </Button>
          <div className="space-y-10">
            {blocks.map(({ blockId, paragraphKeys }) => (
              <article
                key={blockId}
                className="matang-card p-6 sm:p-8"
              >
                <h2 className="matang-section-title mb-6 text-2xl sm:text-3xl">
                  {tSection(`${blockId}.title`)}
                </h2>
                <div className="space-y-4 text-white/90">
                  {paragraphKeys.map((pKey) => (
                    <p
                      key={`${blockId}-${pKey}`}
                      className="leading-relaxed"
                    >
                      {tSection(`${blockId}.${pKey}`)}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // 单区块页：宫罗岭
  const title = t("gongluoling.title");
  const paragraphs = [t("gongluoling.p1"), t("gongluoling.p2")];

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-24 sm:px-6 sm:py-28">
        <Button
          asChild
          variant="ghost"
          className="mb-6 text-white/80 hover:text-white"
        >
          <Link href="/">← {tNav("home")}</Link>
        </Button>
        <article className="matang-card p-6 sm:p-8">
          <h1 className="matang-section-title mb-6 text-2xl sm:text-3xl">
            {title}
          </h1>
          <div className="space-y-4 text-white/90">
            {paragraphs.map((text, i) => (
              <p key={`gongluoling-p${i + 1}`} className="leading-relaxed">
                {text}
              </p>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

export function generateStaticParams() {
  return SECTION_IDS.map((section) => ({ section }));
}
