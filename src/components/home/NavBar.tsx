"use client";

import { useState, useEffect, useMemo } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";
import { LocaleSwitcher } from "./LocaleSwitcher";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" />
    </svg>
  );
}

type NavItem = { id: string; label: string };

type Props = {
  homeLabel: string;
  navItems: NavItem[];
};

export function NavBar({ homeLabel, navItems }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const activeId = useMemo(() => {
    const normalized = pathname === "" ? "/" : pathname;
    const segment = normalized.replace(/^\//, "").split("/")[0] ?? "";
    if (segment === "") return "home";
    return navItems.some((item) => item.id === segment) ? segment : null;
  }, [pathname, navItems]);

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
        <nav className="site-container flex items-center justify-between gap-4">
          <Link
            href="/"
            className={`matang-nav-home shrink-0 text-base font-semibold transition-colors sm:text-lg ${activeId === "home" ? "matang-nav-link-active" : ""}`}
            onClick={() => setMobileOpen(false)}
            aria-current={activeId === "home" ? "page" : undefined}
          >
            {homeLabel}
          </Link>

          {/* 桌面端：横向链接 + 语言切换 */}
          <ul className="hidden flex-1 flex-wrap items-center justify-end gap-0.5 md:flex sm:gap-1">
            {navItems.map(({ id, label }) => (
              <li key={id}>
                <Link
                  href={`/${id}`}
                  className={`matang-nav-link block rounded-lg px-3 py-2 text-sm transition-colors sm:px-4 ${activeId === id ? "matang-nav-link-active" : ""}`}
                  aria-current={activeId === id ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="hidden shrink-0 items-center gap-2 pl-2 md:flex">
            <LocaleSwitcher />
            <a
              href="https://github.com/fundgao/awesome-mata"
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-9 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="GitHub 仓库"
            >
              <GitHubIcon className="size-5" />
            </a>
          </div>

          {/* 移动端：汉堡按钮 */}
          <div className="flex shrink-0 items-center gap-2 md:hidden">
            <LocaleSwitcher />
            <a
              href="https://github.com/fundgao/awesome-mata"
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-9 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="GitHub 仓库"
            >
              <GitHubIcon className="size-5" />
            </a>
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
              <li>
                <Link
                  href="/"
                  className={`block rounded-lg px-4 py-3.5 text-base font-medium text-white transition-colors hover:bg-white/10 hover:text-[var(--matang-gold)] ${activeId === "home" ? "matang-nav-link-active" : ""}`}
                  onClick={() => setMobileOpen(false)}
                  aria-current={activeId === "home" ? "page" : undefined}
                >
                  {homeLabel}
                </Link>
              </li>
              {navItems.map(({ id, label }) => (
                <li key={id}>
                  <Link
                    href={`/${id}`}
                    className={`block rounded-lg px-4 py-3.5 text-base font-medium text-white transition-colors hover:bg-white/10 hover:text-[var(--matang-gold)] ${activeId === id ? "matang-nav-link-active" : ""}`}
                    onClick={() => setMobileOpen(false)}
                    aria-current={activeId === id ? "page" : undefined}
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
