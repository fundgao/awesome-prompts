import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "placehold.co" },
    ],
  },
  async redirects() {
    const toOverview = [
      { source: "/location", destination: "/overview", permanent: true },
      { source: "/transport", destination: "/overview", permanent: true },
      { source: "/economy", destination: "/overview", permanent: true },
    ];
    const toPeople = [
      { source: "/population", destination: "/people", permanent: true },
      { source: "/culture", destination: "/people", permanent: true },
      { source: "/food", destination: "/people", permanent: true },
    ];
    const toCustomsFaith = [
      { source: "/customs", destination: "/customs-faith", permanent: true },
      { source: "/faith", destination: "/customs-faith", permanent: true },
    ];
    const localesWithPrefix = ["zh-Hant", "en"];
    const withLocale = [
      ...toOverview.flatMap((r) =>
        localesWithPrefix.map((locale) => ({
          source: `/${locale}${r.source}`,
          destination: `/${locale}${r.destination}`,
          permanent: true as const,
        }))
      ),
      ...toPeople.flatMap((r) =>
        localesWithPrefix.map((locale) => ({
          source: `/${locale}${r.source}`,
          destination: `/${locale}${r.destination}`,
          permanent: true as const,
        }))
      ),
      ...toCustomsFaith.flatMap((r) =>
        localesWithPrefix.map((locale) => ({
          source: `/${locale}${r.source}`,
          destination: `/${locale}${r.destination}`,
          permanent: true as const,
        }))
      ),
    ];
    return [...toOverview, ...toPeople, ...toCustomsFaith, ...withLocale];
  },
};

export default withNextIntl(nextConfig);
