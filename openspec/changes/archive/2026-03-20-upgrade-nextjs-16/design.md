## Context

This change upgrades the application to Next.js 16 and ensures compatibility across local development, build, and deployment environments. The repository includes framework configuration (`next.config.ts`) and Netlify deployment configuration (`netlify.toml`) that can be affected by major-version runtime and build changes.

## Goals / Non-Goals

**Goals:**
- Upgrade to Next.js 16 with a passing local build and production build.
- Keep existing user-visible behavior stable after migration.
- Align build and deployment configuration with Next.js 16 requirements.
- Document required follow-up fixes if any deprecated APIs are discovered.

**Non-Goals:**
- Large feature refactors unrelated to framework compatibility.
- UI redesign or product-level behavior changes.
- Rewriting application architecture beyond what the migration requires.

## Decisions

- Upgrade framework and tightly coupled dependencies together.
  - Rationale: Next.js major upgrades often require compatible versions of `react` and `react-dom`; upgrading as a set avoids version skew.
  - Alternative considered: upgrading `next` only first. Rejected due to higher risk of transient incompatibility.

- Perform migration in phases: dependency bump, config adaptation, runtime/API fixes, verification.
  - Rationale: isolates breakage sources and makes rollback/triage simpler.
  - Alternative considered: one-shot bulk update. Rejected because it obscures root causes.

- Treat deployment parity as a first-class validation target.
  - Rationale: local-only validation misses framework/adapter issues that surface in Netlify builds.
  - Alternative considered: defer deployment checks to later. Rejected due to high integration risk.

## Risks / Trade-offs

- [Breaking API behavior in Next.js 16] -> Mitigation: run targeted smoke checks for app routes, data fetching, and metadata behavior after code updates.
- [Dependency peer mismatch causing install/build failures] -> Mitigation: upgrade paired dependencies in a controlled set and verify lockfile consistency.
- [Netlify build/runtime mismatch] -> Mitigation: review and adjust `netlify.toml` and build settings during migration validation.
- [Hidden regressions despite successful build] -> Mitigation: execute a focused manual regression checklist for core user flows.

## Migration Outcomes

- Dependency state verified: `next@16.1.6`, `react@19.2.3`, `react-dom@19.2.3` already aligned in `package.json`.
- Install verification: `pnpm install` completed with lockfile up-to-date and no peer-conflict failures.
- Build verification:
  - `pnpm build` passed on Next.js 16.
  - `CI=1 pnpm build` passed (CI-style single-worker page data/static generation path).
- Runtime smoke checks:
  - `pnpm dev` started successfully on `http://localhost:3000`.
  - Route checks returned expected responses:
    - `/` -> `307` redirect to locale route.
    - `/zh` -> `200`.
    - `/en/nianli` -> `200`.
- Deployment configuration review:
  - `netlify.toml` build command (`pnpm build`) and Node version (`20`) are compatible with current Next.js 16 build flow.
  - No additional Netlify config changes were required for this upgrade step.

## Follow-ups / Rollback

- Follow-up: `pnpm check:ci` currently reports existing Biome formatting/import-order diagnostics across the repository. These are pre-existing style/config issues and not introduced by the Next.js 16 upgrade path.
- Rollback option: if regression appears, pin `next`/`react`/`react-dom` back to the previous known-good versions and restore the previous lockfile snapshot, then re-run install/build/deploy validation.
