"use client";

import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { Globe } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const LOCALES = [
  { locale: "zh" as const, label: "简体" },
  { locale: "zh-Hant" as const, label: "繁體" },
  { locale: "en" as const, label: "EN" },
] as const;

export function LocaleSwitcher() {
  const currentLocale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex size-9 items-center justify-center rounded-lg text-white/90 transition-colors hover:bg-white/10 hover:text-[var(--matang-gold)]"
        aria-label="切换语言"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <Globe className="size-5" />
      </button>

      {open && (
        <div
          className="matang-card absolute right-0 top-full z-50 mt-2 min-w-28 py-1"
          role="menu"
        >
          {LOCALES.map(({ locale, label }) => (
            <div key={locale} role="none">
              <Link
                href={pathname}
                locale={locale}
                role="menuitem"
                className={cn(
                  "block px-4 py-2 text-sm transition-colors hover:bg-white/10",
                  currentLocale === locale
                    ? "matang-gold-text font-medium"
                    : "text-white/90"
                )}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
