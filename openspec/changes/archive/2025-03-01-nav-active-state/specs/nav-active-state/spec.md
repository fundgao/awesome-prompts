# Nav Active State · Spec

## ADDED Requirements

### Requirement: Desktop nav highlights current page

The desktop navigation bar SHALL show an active state on the menu item that matches the current route: when the user is on the home page, the "Home" link SHALL be active; when the user is on a section page (e.g. `/[locale]/overview`), the corresponding section link SHALL be active. All other links SHALL not show the active state.

#### Scenario: Home page active on desktop

- **WHEN** the user is on the home page (`/` or `/[locale]`)
- **THEN** the "Home" link in the desktop nav is visually active (e.g. distinct color or weight), and no section link is active

#### Scenario: Section page active on desktop

- **WHEN** the user is on a section page such as `/[locale]/people`
- **THEN** the "People" (or localized equivalent) link in the desktop nav is visually active, and the "Home" link is not active

#### Scenario: Only one item active on desktop

- **WHEN** the user is on any single page
- **THEN** exactly one menu item in the desktop nav (either Home or one section) is active at a time

---

### Requirement: Mobile nav highlights current page

The mobile navigation (hamburger menu) SHALL show the same active state on the menu item that matches the current route: when the user is on the home page, the "Home" link SHALL be active; when the user is on a section page, the corresponding section link SHALL be active.

#### Scenario: Home page active on mobile

- **WHEN** the user is on the home page and opens the mobile menu
- **THEN** the "Home" link in the mobile menu is visually active, and no section link is active

#### Scenario: Section page active on mobile

- **WHEN** the user is on a section page (e.g. `/[locale]/customs-faith`) and opens the mobile menu
- **THEN** the corresponding section link in the mobile menu is visually active

#### Scenario: Desktop and mobile active state consistent

- **WHEN** the user is on a given page
- **THEN** the same menu item (Home or the same section) is active in both the desktop nav and the mobile menu

---

### Requirement: Active state is accessible

The active menu item SHALL be exposed to assistive technologies so that screen readers can identify the current page.

#### Scenario: Active link has aria-current

- **WHEN** a menu item is the active item for the current page
- **THEN** that link has `aria-current="page"`; non-active links SHALL NOT have `aria-current` or SHALL have it removed
