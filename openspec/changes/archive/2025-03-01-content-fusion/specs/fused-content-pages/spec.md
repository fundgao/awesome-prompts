# Fused Content Pages · Spec

## ADDED Requirements

### Requirement: Four top-level section routes

The site SHALL expose exactly four section routes under `[locale]`: `overview`, `people`, `customs-faith`, and `gongluoling`. Navigation, footer, and home entry buttons SHALL link only to these four paths.

#### Scenario: Valid section routes resolve

- **WHEN** user visits `/{locale}/overview`, `/{locale}/people`, `/{locale}/customs-faith`, or `/{locale}/gongluoling`
- **THEN** the corresponding section page is rendered with correct locale and content

#### Scenario: Invalid section returns 404

- **WHEN** user visits `/{locale}/location` or any other legacy single-topic path not configured as a redirect
- **THEN** after redirect logic is applied, if the path is still unknown, the response is 404

---

### Requirement: Fused page content structure

Each fused page (`overview`, `people`, `customs-faith`) SHALL render multiple content blocks in order. Each block SHALL have a title and one or more paragraphs. Content SHALL be sourced from i18n (e.g. `sections.<fusedId>.*`) and SHALL support zh, zh-Hant, and en.

#### Scenario: Overview page shows three blocks

- **WHEN** user opens the overview page
- **THEN** the page displays in order: block for 地理位置, block for 交通情况, block for 经济情况, each with a title and paragraphs

#### Scenario: People page shows three blocks

- **WHEN** user opens the people page
- **THEN** the page displays in order: block for 人口组成, block for 风土人情, block for 美食人文, each with a title and paragraphs

#### Scenario: Customs-faith page shows two blocks

- **WHEN** user opens the customs-faith page
- **THEN** the page displays in order: block for 习俗, block for 年例与信仰, each with a title and paragraphs

#### Scenario: Gongluoling page unchanged

- **WHEN** user opens the gongluoling page
- **THEN** the page displays the single 宫罗岭 content block as it does today (title + paragraphs)

---

### Requirement: Redirects from legacy paths

Legacy single-topic paths SHALL redirect (301 or 302) to the corresponding fused page so that old links and bookmarks still land on the correct content.

#### Scenario: Legacy paths redirect to overview

- **WHEN** user requests `/{locale}/location`, `/{locale}/transport`, or `/{locale}/economy`
- **THEN** server responds with a redirect to `/{locale}/overview` (same locale)

#### Scenario: Legacy paths redirect to people

- **WHEN** user requests `/{locale}/population`, `/{locale}/culture`, or `/{locale}/food`
- **THEN** server responds with a redirect to `/{locale}/people` (same locale)

#### Scenario: Legacy paths redirect to customs-faith

- **WHEN** user requests `/{locale}/customs` or `/{locale}/faith`
- **THEN** server responds with a redirect to `/{locale}/customs-faith` (same locale)

---

### Requirement: Nav and footer show four links

The main navigation and footer SHALL each show exactly four section links: the labels for overview, people, customs-faith, and gongluoling (localized).

#### Scenario: Desktop nav has four section links

- **WHEN** user views the site on desktop
- **THEN** the header nav shows Home plus four section links (overview, people, customs-faith, gongluoling) and the language switcher

#### Scenario: Mobile menu has four section links

- **WHEN** user opens the mobile hamburger menu
- **THEN** the menu lists the same four section links as on desktop

#### Scenario: Footer has four section links

- **WHEN** user scrolls to the footer
- **THEN** the footer lists Home and the same four section links

---

### Requirement: Home page entry buttons

The home page SHALL show exactly four entry buttons (or links) that navigate to the four section pages (overview, people, customs-faith, gongluoling).

#### Scenario: Four entry buttons on home

- **WHEN** user is on the home page
- **THEN** four entry controls are visible, each linking to one of the four section routes
