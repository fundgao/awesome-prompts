import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SECTION_IDS } from "@/data/matang";

export async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");

  return (
    <footer className="matang-footer mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <nav
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm sm:gap-x-8"
          aria-label="Footer navigation"
        >
          <Link href="/" className="transition-colors">
            {tNav("home")}
          </Link>
          {SECTION_IDS.map((id) => (
            <Link key={id} href={`/${id}`} className="transition-colors">
              {tNav(id)}
            </Link>
          ))}
        </nav>
        <div className="matang-footer-divider my-6" />
        <p className="matang-footer-tagline text-center">{t("tagline")}</p>
      </div>
    </footer>
  );
}
