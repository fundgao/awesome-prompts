## Why

当前桌面端与移动端导航栏的菜单项没有「当前页」的激活状态，用户无法一眼看出自己所在栏目，影响导航体验。需要在进入对应 section 页面时，让该菜单项在桌面端和移动端均呈现激活样式。

## What Changes

- 桌面端导航：当路径为 `/[locale]/<section>` 时，对应 section 的菜单项显示激活样式（如高亮或不同字色/背景）。
- 移动端导航：展开的汉堡菜单中，当前页对应的菜单项同样显示激活样式。
- 首页（`/` 或 `/[locale]`）：「首页」链接显示激活，section 项均不激活。
- 不改变现有路由、链接或 i18n，仅增加基于当前 pathname 的样式区分。

## Capabilities

### New Capabilities

- `nav-active-state`: 导航栏根据当前路由高亮对应菜单项（桌面端与移动端一致行为）。

### Modified Capabilities

- （无：仅新增能力，未修改既有 spec 行为。）

## Impact

- **受影响代码**：`src/components/home/NavBar.tsx`（客户端组件，需读取当前路径并给对应 Link 施加激活 class）。
- **可能依赖**：next-intl 的 `usePathname` 或 Next.js `usePathname`，需与 `[locale]` 路由一致；若使用 `Link` 的 `aria-current`，可同时提升可访问性。
- **样式**：需在现有 `matang-nav-link` 等 class 基础上增加激活态样式（如 `matang-nav-link-active` 或 data 属性 + CSS），与现有主题一致。
