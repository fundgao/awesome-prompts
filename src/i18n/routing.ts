import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["zh", "zh-Hant", "en"],
  defaultLocale: "zh",
  localePrefix: "as-needed",
});
