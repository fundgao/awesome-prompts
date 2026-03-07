"use client";

import { useState, useEffect, useMemo } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, X, Github } from "lucide-react";
import { LocaleSwitcher } from "./LocaleSwitcher";

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
            <a
              href="https://github.com/fundgao/awesome-mata"
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-9 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="GitHub 仓库"
            >
              <Github className="size-5" />
            </a>
            <LocaleSwitcher />
          </div>

          {/* 移动端：汉堡按钮 */}
          <div className="flex shrink-0 items-center gap-2 md:hidden">
            <a
              href="https://github.com/fundgao/awesome-mata"
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-9 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="GitHub 仓库"
            >
              <Github className="size-5" />
            </a>
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
