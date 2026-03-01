import { getTranslations } from "next-intl/server";
import { SECTION_IDS } from "@/data/matang";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Link } from "@/i18n/navigation";

export async function Nav() {
  const t = await getTranslations("nav");

  return (
    <header className="matang-nav fixed left-0 right-0 top-0 z-50 py-4">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="matang-nav-home shrink-0 text-lg transition-colors"
        >
          {t("home")}
        </Link>
        <ul className="flex flex-1 flex-wrap items-center justify-end gap-0.5 sm:gap-1">
          {SECTION_IDS.map((id) => (
            <li key={id}>
              <Link
                href={`/${id}`}
                className="matang-nav-link block rounded-lg px-3 py-2 text-sm transition-colors sm:px-4"
              >
                {t(id)}
              </Link>
            </li>
          ))}
        </ul>
        <div className="shrink-0 pl-2">
          <LocaleSwitcher />
        </div>
      </nav>
    </header>
  );
}
