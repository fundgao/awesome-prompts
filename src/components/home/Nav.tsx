import { getTranslations } from "next-intl/server";
import { SECTION_ANCHORS, type SectionId } from "@/data/matang";
import { LocaleSwitcher } from "./LocaleSwitcher";

const NAV_KEYS: SectionId[] = [
  "location",
  "population",
  "culture",
  "customs",
  "food",
  "economy",
  "gongluoling",
];

export async function Nav() {
  const t = await getTranslations("nav");

  return (
    <header className="matang-nav fixed left-0 right-0 top-0 z-50 py-3">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a
          href="#hero"
          className="text-lg font-semibold text-white transition-colors shrink-0"
        >
          {t("home")}
        </a>
        <ul className="flex flex-1 flex-wrap items-center justify-end gap-1 sm:gap-3">
          {NAV_KEYS.map((id) => (
            <li key={id}>
              <a
                href={`#${SECTION_ANCHORS[id]}`}
                className="rounded-md px-2 py-1.5 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:px-3"
              >
                {t(id)}
              </a>
            </li>
          ))}
        </ul>
        <div className="shrink-0">
          <LocaleSwitcher />
        </div>
      </nav>
    </header>
  );
}
