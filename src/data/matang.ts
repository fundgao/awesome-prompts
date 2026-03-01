/** 马踏镇介绍站 - 子页面路径与 i18n key */
export const SECTION_IDS = [
  "location",
  "population",
  "culture",
  "customs",
  "faith",
  "food",
  "economy",
  "gongluoling",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

/** 是否为有效子页面路径 */
export function isSectionId(slug: string): slug is SectionId {
  return (SECTION_IDS as readonly string[]).includes(slug);
}
