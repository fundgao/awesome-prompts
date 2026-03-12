import LocaleLayout from "./[locale]/layout";
import HomePage from "./[locale]/page";

// SEO-first: keep `/` as Chinese content (same as `/zh`) instead of client-side locale redirect.
export default function RootHome() {
  return (
    <LocaleLayout params={Promise.resolve({ locale: "zh" })}>
      <HomePage params={Promise.resolve({ locale: "zh" })} />
    </LocaleLayout>
  );
}
