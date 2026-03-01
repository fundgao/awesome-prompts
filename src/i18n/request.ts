import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

const messageLoaders: Record<(typeof routing.locales)[number], () => Promise<{ default: Record<string, unknown> }>> = {
  zh: () => import("../../messages/zh.json"),
  "zh-Hant": () => import("../../messages/zh-Hant.json"),
  en: () => import("../../messages/en.json"),
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const { default: messages } = await messageLoaders[locale]();

  return {
    locale,
    messages,
  };
});
