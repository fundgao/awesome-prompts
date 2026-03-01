import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("IndexPage");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between px-6 py-32 sm:px-16">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-foreground">
            {t("title")}
          </h1>
          <p className="max-w-md text-lg leading-8 text-muted-foreground">
            {t("description")}
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <Button asChild>
            <a
              href="https://vercel.com/new"
              target="_blank"
              rel="noopener noreferrer"
            >
              Deploy Now
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </a>
          </Button>
        </div>
      </main>
    </div>
  );
}
