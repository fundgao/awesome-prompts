import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Nav } from "@/components/home/Nav";
import { Footer } from "@/components/home/Footer";
import { Link } from "@/i18n/navigation";
import { isSectionId } from "@/data/matang";
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
  const title = t(`${section}.title`);
  const p1 = t(`${section}.p1`);
  const p2 = t(`${section}.p2`);

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-24 sm:px-6 sm:py-28">
        <Button asChild variant="ghost" className="mb-6 text-white/80 hover:text-white">
          <Link href="/">← {tNav("home")}</Link>
        </Button>
        <article className="matang-card p-6 sm:p-8">
          <h1 className="matang-section-title mb-6 text-2xl sm:text-3xl">
            {title}
          </h1>
          <div className="space-y-4 text-white/90">
            <p className="leading-relaxed">{p1}</p>
            <p className="leading-relaxed">{p2}</p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}

export function generateStaticParams() {
  const sections = [
    "location",
    "population",
    "culture",
    "customs",
    "food",
    "economy",
    "gongluoling",
  ] as const;
  return sections.map((section) => ({ section }));
}
