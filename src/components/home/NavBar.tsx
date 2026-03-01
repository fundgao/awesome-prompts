"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";
import { LocaleSwitcher } from "./LocaleSwitcher";

type NavItem = { id: string; label: string };

type Props = {
  homeLabel: string;
  navItems: NavItem[];
};

export function NavBar({ homeLabel, navItems }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="matang-nav fixed left-0 right-0 top-0 z-[110] py-3 sm:py-4">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="matang-nav-home shrink-0 text-base font-semibold transition-colors sm:text-lg"
            onClick={() => setMobileOpen(false)}
          >
            {homeLabel}
          </Link>

          {/* 桌面端：横向链接 + 语言切换 */}
          <ul className="hidden flex-1 flex-wrap items-center justify-end gap-0.5 md:flex sm:gap-1">
            {navItems.map(({ id, label }) => (
              <li key={id}>
                <Link
                  href={`/${id}`}
                  className="matang-nav-link block rounded-lg px-3 py-2 text-sm transition-colors sm:px-4"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="hidden shrink-0 pl-2 md:block">
            <LocaleSwitcher />
          </div>

          {/* 移动端：汉堡按钮 */}
          <div className="flex shrink-0 items-center gap-2 md:hidden">
            <LocaleSwitcher />
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="flex size-10 items-center justify-center rounded-lg text-white/90 transition-colors hover:bg-white/10 hover:text-white"
              aria-label={mobileOpen ? "关闭菜单" : "打开菜单"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* 移动端：展开的菜单面板（独立于 header，避免 z-index 被遮挡） */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[100] md:hidden"
          aria-hidden="false"
        >
          {/* 遮罩：从导航栏下方开始，盖住整页 */}
          <div
            className="absolute inset-0 top-14 bg-black/80 backdrop-blur-sm sm:top-16"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          {/* 菜单内容：紧贴导航栏下方，保证在遮罩之上、文字清晰 */}
          <div className="absolute left-0 right-0 top-14 z-10 max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-white/10 bg-[oklch(0.08_0.03_270)] sm:top-16">
            <ul className="flex flex-col px-2 py-3">
              {navItems.map(({ id, label }) => (
                <li key={id}>
                  <Link
                    href={`/${id}`}
                    className="block rounded-lg px-4 py-3.5 text-base font-medium text-white transition-colors hover:bg-white/10 hover:text-[var(--matang-gold)]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
