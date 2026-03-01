import { setRequestLocale } from "next-intl/server";
import { Nav } from "@/components/home/Nav";
import { Hero } from "@/components/home/Hero";
import { SectionCard } from "@/components/home/SectionCard";
import { Footer } from "@/components/home/Footer";
import { SECTION_IDS } from "@/data/matang";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <div className="mx-auto max-w-4xl space-y-6 px-4 py-16 sm:px-6 sm:py-20">
          {SECTION_IDS.map((id) => (
            <SectionCard key={id} id={id} />
          ))}
        </div>
        <Footer />
      </main>
    </div>
  );
}
