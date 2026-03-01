import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Nav } from "@/components/home/Nav";
import { Hero } from "@/components/home/Hero";
import { Footer } from "@/components/home/Footer";
import { Link } from "@/i18n/navigation";
import { SECTION_IDS } from "@/data/matang";
import { Button } from "@/components/ui/button";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tNav = await getTranslations("nav");

  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <section id="overview" className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl bg-white/5">
            <Image
              src="https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=1200&q=80"
              alt={t("imageAlt")}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
              priority
            />
          </div>
          <div className="mt-8 space-y-6 text-white/90">
            <p className="text-lg leading-relaxed">{t("overview1")}</p>
            <p className="text-lg leading-relaxed">{t("overview2")}</p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-white/5">
              <Image
                src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80"
                alt={t("imageAlt")}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-white/5">
              <Image
                src="https://images.unsplash.com/photo-1508807527080-aeefc73317d5?w=600&q=80"
                alt={t("imageAlt")}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-white/5 sm:col-span-1 col-span-2">
              <Image
                src="https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?w=600&q=80"
                alt={t("imageAlt")}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            {SECTION_IDS.map((id) => (
              <Button key={id} asChild variant="outline" className="matang-btn-outline">
                <Link href={`/${id}`}>{tNav(id)}</Link>
              </Button>
            ))}
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}
