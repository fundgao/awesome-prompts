import { setRequestLocale, getTranslations } from "next-intl/server";
import { Nav } from "@/components/home/Nav";
import { Footer } from "@/components/home/Footer";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { NianliClient } from "@/components/nianli/NianliClient";
import { NIANLI_DATA } from "@/data/nianli";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function NianliPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tNav = await getTranslations("nav");
  const tNianli = await getTranslations("nianli");

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
        <h1 className="matang-section-title text-3xl sm:text-4xl mb-2">
          {tNianli("title")}
        </h1>
        <p className="text-white/70 mb-8">{tNianli("subtitle")}</p>
        <NianliClient data={NIANLI_DATA} searchPlaceholder={tNianli("searchPlaceholder")} />
      </main>
      <Footer />
    </div>
  );
}
