/** 马踏镇介绍站 - 子页面路径与 i18n key（内容融合：4 个入口） */
export const SECTION_IDS = [
  "overview",
  "people",
  "customs-faith",
  "gongluoling",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

/** 是否为有效子页面路径 */
export function isSectionId(slug: string): slug is SectionId {
  return (SECTION_IDS as readonly string[]).includes(slug);
}

/** 融合页（多区块）的 section id */
const FUSED_SECTION_IDS = ["overview", "people", "customs-faith"] as const;

/** 融合页内区块配置：blockId 及该区块的段落 key 列表 */
export type BlockConfig = { blockId: string; paragraphKeys: string[] };

/** 各融合页的区块顺序与段落 key，用于循环渲染 */
export const FUSED_SECTION_BLOCKS: Record<
  (typeof FUSED_SECTION_IDS)[number],
  BlockConfig[]
> = {
  overview: [
    { blockId: "location", paragraphKeys: ["p1", "p2"] },
    { blockId: "history-layout-villages", paragraphKeys: ["p1", "p2", "p3"] },
    { blockId: "transport", paragraphKeys: ["p1", "p2", "p3"] },
    { blockId: "economy", paragraphKeys: ["p1", "p2"] },
  ],
  people: [
    { blockId: "population", paragraphKeys: ["p1", "p2"] },
    { blockId: "culture", paragraphKeys: ["p1", "p2"] },
    { blockId: "food", paragraphKeys: ["p1", "p2"] },
  ],
  "customs-faith": [
    { blockId: "customs", paragraphKeys: ["p1", "p2"] },
    { blockId: "faith", paragraphKeys: ["p1", "p2", "p3", "p4", "p5"] },
  ],
};

export function isFusedSection(
  section: SectionId
): section is (typeof FUSED_SECTION_IDS)[number] {
  return (FUSED_SECTION_IDS as readonly string[]).includes(section);
}
