/** 马踏镇介绍站 - 区块 ID，与 i18n key 对应 */
export const SECTION_IDS = [
  "location",
  "population",
  "culture",
  "customs",
  "food",
  "economy",
  "gongluoling",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

/** 用于滚动锚点 */
export const SECTION_ANCHORS: Record<SectionId, string> = {
  location: "location",
  population: "population",
  culture: "culture",
  customs: "customs",
  food: "food",
  economy: "economy",
  gongluoling: "gongluoling",
};
