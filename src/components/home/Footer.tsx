import { getTranslations } from "next-intl/server";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="matang-footer py-8 text-center text-sm">
      <p>{t("tagline")}</p>
    </footer>
  );
}
