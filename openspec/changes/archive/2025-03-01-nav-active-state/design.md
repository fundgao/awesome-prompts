## Context

- 导航由 `Nav.tsx`（服务端）拉取 `SECTION_IDS` 与 i18n，将 `homeLabel` 与 `navItems` 传给客户端组件 `NavBar.tsx`。
- `NavBar` 内桌面端（`md:flex`）与移动端（汉堡 + 遮罩下面板）各渲染一组链接；当前所有 Link 使用统一 class，无「当前页」区分。
- 路由结构：`/` 或 `/[locale]` 为首页，`/[locale]/[section]` 为 section 页（section ∈ SECTION_IDS）。next-intl 使用 `localePrefix: "as-needed"`，默认 locale 可能无前缀。
- 需在客户端根据当前 pathname 判断「首页」或「某个 section」，并对对应菜单项施加激活样式。

## Goals / Non-Goals

**Goals:**

- 桌面端与移动端导航中，与当前路由对应的菜单项显示激活样式（视觉一致）。
- 首页时「首页」链接激活；section 页时对应 section 链接激活，其余不激活。
- 实现方式与现有 next-intl、Link、SECTION_IDS 兼容，便于维护。

**Non-Goals:**

- 不改变路由或 i18n 结构；不新增页面；不处理面包屑或页内锚点高亮。

## Decisions

1. **用 pathname 判断激活项**
   - 使用 next-intl 的 `usePathname()`（或 Next.js `usePathname()`），得到的是已去掉 locale 前缀的 pathname（如 `"/"` 或 `"/overview"`）。
   - 若 pathname 为 `"/"` → 首页激活；若 pathname 为 `"/<section>"` 且 section 在 navItems 的 id 中 → 该 id 对应项激活。
   - **备选**：服务端把 `pathname` 通过 props 传入 NavBar。选用客户端 pathname 可避免 layout 传参，且 NavBar 已是 client 组件，与现有结构一致。

2. **激活样式实现**
   - 在 `NavBar` 内根据 pathname 计算 `activeId: null | string`（首页用 `"home"` 或约定与 nav 的 home 一致），对「首页」Link 与每个 `navItems` 的 Link 分别判断是否 `id === activeId`（首页链接用 `pathname === "/"` 或 `activeId === "home"`），为激活项添加 class（如 `matang-nav-link-active`）并可选设置 `aria-current="page"`。
   - 样式在全局或组件内定义：激活态可与现有 `matang-nav-link` 区分（如字色、下划线或背景），与主题一致。
   - **备选**：用 data 属性（如 `data-active`）配合 CSS 选择器，便于主题切换；当前采用 class 更直观。

3. **桌面与移动共用逻辑**
   - 同一套 `activeId` 计算逻辑，桌面端与移动端两处渲染都使用该值，保证两处激活项一致。

## Risks / Trade-offs

- **[Risk]** next-intl 的 `usePathname` 在不同版本中返回格式可能带或不带 leading slash → **Mitigation**：以文档或实际运行为准，判断时做规范化（如 `pathname === "/" || pathname === ""` 均视为首页）。
- **[Trade-off]** 激活态仅依赖 pathname，若未来有同 path 多「tab」的区分，需再扩展（本次不处理）。

## Migration Plan

- 无数据或配置迁移。部署后即生效；若需回滚，移除激活 class 与 `aria-current` 的传递即可。

## Open Questions

- 无。激活样式具体色值/粗细可与现有设计系统统一即可。
