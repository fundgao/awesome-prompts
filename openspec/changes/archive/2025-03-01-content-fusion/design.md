# 内容融合 · Design

## Context

- 当前站点为 Next.js App Router + next-intl，子页通过 `app/[locale]/[section]/page.tsx` 动态段渲染，`section` 取自 `SECTION_IDS`（9 项）。
- 文案在 `messages/{zh,en,zh-Hant}.json` 的 `sections.<id>.title` 与 `sections.<id>.p1`…`p5`；单页最多展示 p1–p5（faith 为 5 段，transport 为 3 段，其余 2 段）。
- 导航与底栏由 `SECTION_IDS` 驱动，首页入口按钮同样遍历 `SECTION_IDS`。无现有 openspec specs，无外部 API。

## Goals / Non-Goals

**Goals:**

- 将 9 个子页收敛为 4 个：3 个「融合页」（每页内多区块） + 1 个宫罗岭单页。
- 融合页内按「区块」顺序展示多主题（每区块：标题 + 多段正文），复用现有主题样式（matang-card、matang-section-title 等）。
- 导航、底栏、首页入口仅暴露 4 个链接；三语（简/繁/英）同步。
- 旧路径（如 `/location`、`/transport`）可 301 重定向到对应融合页，避免死链。

**Non-Goals:**

- 不改变首页概述与图片结构；不新增 CMS 或后台；不改变宫罗岭单页的现有展示方式。

## Decisions

1. **融合页 section id 命名**  
   - 采用：`overview`（地理+交通+经济）、`people`（人口+风土+美食）、`customs-faith`（习俗+年例与信仰）、`gongluoling`（保留）。  
   - 理由：简短且与内容对应；与现有 `isSectionId` 和路由一致。  
   - 备选：用 `page1`/`page2`/`page3` 等，可读性差，不采用。

2. **融合页文案结构（i18n）**  
   - 采用：在 `sections.<fusedId>` 下按区块组织，例如 `sections.overview.blocks` 为数组，每项含 `title` 与 `paragraphs`（字符串数组），或扁平为 `sections.overview.location.title`、`sections.overview.location.p1`…。  
   - 理由：与现有 `getTranslations("sections")` 用法一致，仅扩展 key 结构；三语文件结构一致。  
   - 备选：每融合页单独 namespace（如 `overviewPage.*`），会增加与现有 sections 的割裂，不采用。

3. **旧路径处理**  
   - 采用：在 Next.js 配置或 middleware/proxy 中为 `/location`、`/transport`、`/economy` 等做 301 重定向到 `/overview`；`/population`、`/culture`、`/food` → `/people`；`/customs`、`/faith` → `/customs-faith`。  
   - 理由：若有外链或书签指向旧 URL，仍可到达正确融合页。  
   - 备选：不重定向，仅移除旧路由，会导致 404；不采用。

4. **宫罗岭**  
   - 保持现有 `gongluoling` 单页与 `sections.gongluoling` 文案，不并入其他页；`SECTION_IDS` 仍包含 `gongluoling`。

## Risks / Trade-offs

- **[Risk] 旧链接失效** → 通过 301 重定向到对应融合页，并在部署说明中注明。
- **[Risk] 单页内容变长、首屏信息过多** → 融合页内用明确区块标题与间距区分主题，保持可扫读；移动端已有导航可快速切页。
- **[Trade-off] 不再支持「直达」单主题** → 接受；用户从融合页内标题/锚点即可定位，且导航项减少有利于移动端。

## Migration Plan

1. 在 `SECTION_IDS` 与路由中新增 `overview`、`people`、`customs-faith`，保留 `gongluoling`；移除其余 6 个 id。
2. 在 messages 中为 3 个融合页新增/重组 `sections.overview`、`sections.people`、`sections.customs-faith`（每页多区块、多段正文）；保留 `sections.gongluoling`。
3. 新增融合页渲染逻辑：根据 section 读取对应 blocks 或子 key，循环渲染区块（标题 + 段落）。
4. 配置重定向：旧 path → 新 path（next.config redirects 或 next-intl 兼容方式）。
5. 验证导航、底栏、首页入口均为 4 个链接；三语与移动端菜单正常。
6. **Rollback**：还原 `SECTION_IDS`、messages 与重定向配置，恢复原 9 个子页路由即可回退。

## Open Questions

- 无。若后续希望为融合页内区块增加锚点（如 `#location`、`#transport`），可在实现时在区块标题上加 id，并在设计上视为小增强。
