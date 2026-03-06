import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
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

const NIANLI_IMAGES = [
  "/nianli/nianli-1.jpg",
  "/nianli/nianli-2.jpg",
  "/nianli/nianli-3.jpg",
] as const;

export default async function SectionPage({ params }: Props) {
  const { locale, section } = await params;
  setRequestLocale(locale);

  if (!isSectionId(section)) {
    notFound();
  }

  const tNav = await getTranslations("nav");

  if (isFusedSection(section)) {
    const blocks = FUSED_SECTION_BLOCKS[section];
    const tSection = await getTranslations(`sections.${section}`);
    return (
      <div className="min-h-screen flex flex-col">
        <Nav />
        <main className="site-container flex-1 py-24 sm:py-28">
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
                {section === "customs-faith" && blockId === "faith" ? (
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {NIANLI_IMAGES.map((src) => (
                      <div
                        key={src}
                        className="overflow-hidden rounded-xl border border-white/10"
                      >
                        <Image
                          src={src}
                          alt={tSection("faith.title")}
                          width={1200}
                          height={900}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  notFound();
}

export function generateStaticParams() {
  return SECTION_IDS.map((section) => ({ section }));
}
