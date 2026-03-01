import { getTranslations } from "next-intl/server";
import { SECTION_IDS } from "@/data/matang";
import { NavBar } from "./NavBar";

export async function Nav() {
  const t = await getTranslations("nav");
  const navItems = SECTION_IDS.map((id) => ({ id, label: t(id) }));

  return (
    <NavBar
      homeLabel={t("home")}
      navItems={navItems}
    />
  );
}
