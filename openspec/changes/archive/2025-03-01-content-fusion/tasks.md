## 1. 数据与 i18n

- [x] 1.1 将 `src/data/matang.ts` 中 `SECTION_IDS` 改为 `["overview", "people", "customs-faith", "gongluoling"]`，并更新 `isSectionId` / 类型
- [x] 1.2 在 `messages/zh.json` 中新增 `sections.overview`、`sections.people`、`sections.customs-faith`（每页多区块：title + paragraphs），合并原地理位置、交通、经济 / 人口、风土、美食 / 习俗、年例与信仰的文案；保留 `sections.gongluoling`
- [x] 1.3 在 `messages/zh-Hant.json` 中做与 1.2 相同的融合页文案结构（繁体）
- [x] 1.4 在 `messages/en.json` 中做与 1.2 相同的融合页文案结构（英文）
- [x] 1.5 在三个语言的 `nav` 中仅保留 `overview`、`people`、`customs-faith`、`gongluoling` 四项及对应 label

## 2. 融合页路由与渲染

- [x] 2.1 更新 `app/[locale]/[section]/page.tsx`：对 `overview`、`people`、`customs-faith` 从 i18n 读取多区块（blocks 或子 key），循环渲染「区块标题 + 多段正文」；`gongluoling` 保持单区块渲染
- [x] 2.2 更新 `generateStaticParams`，仅返回 `overview`、`people`、`customs-faith`、`gongluoling`

## 3. 旧路径重定向

- [x] 3.1 在 `next.config.ts`（或 next-intl 兼容方式）中配置重定向：`/location`、`/transport`、`/economy` → `/overview`；`/population`、`/culture`、`/food` → `/people`；`/customs`、`/faith` → `/customs-faith`（保留 locale 前缀）

## 4. 导航、底栏与首页

- [x] 4.1 确认 `NavBar` / `Nav` 仅使用新的 `SECTION_IDS`（4 项），桌面与移动端均显示 4 个栏目链接
- [x] 4.2 确认 `Footer` 仅链接到 4 个子页（首页 + overview、people、customs-faith、gongluoling）
- [x] 4.3 更新首页 `app/[locale]/page.tsx` 的入口按钮：仅渲染 4 个链接（对应 4 个 section）

## 5. 验证与收尾

- [ ] 5.1 验证三语下 4 个融合页/宫罗岭页内容与样式正确，旧路径重定向到对应新页
- [x] 5.2 移除或弃用对原 6 个单专题 section id 的引用（如有残留）
