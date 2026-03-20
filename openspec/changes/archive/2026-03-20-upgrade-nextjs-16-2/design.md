## Context

The project has already completed a migration to Next.js 16.1.x and now needs a follow-up upgrade to Next.js 16.2.x. This is a smaller, in-major update focused on dependency refresh and compatibility verification across local dev, build pipelines, and Netlify deployment behavior.

## Goals / Non-Goals

**Goals:**
- Upgrade from Next.js 16.1.x to 16.2.x with no regression in core user flows.
- Keep dependency compatibility intact with the existing React 19 setup.
- Validate build/runtime/deployment parity after the version bump.
- Capture outcomes and any minor follow-up work needed.

**Non-Goals:**
- New product features or UI changes.
- Broad refactors unrelated to framework upgrade.
- Re-defining previously accepted Next.js 16 baseline behavior.

## Decisions

- Reuse and extend the existing `nextjs-16-upgrade` capability via a delta spec instead of introducing a new capability.
  - Rationale: 16.2 upgrade is a continuation of the same framework-upgrade behavior contract.
  - Alternative considered: new capability per patch/minor update. Rejected as unnecessarily fragmented.

- Keep upgrade scope narrow: package bump + compatibility verification.
  - Rationale: minimizes risk and keeps rollback straightforward.
  - Alternative considered: batch additional tooling upgrades. Rejected to avoid mixed root causes.

- Treat deployment parity validation as required even for minor updates.
  - Rationale: runtime/build integrations can change subtly in minor versions.
  - Alternative considered: local-only verification. Rejected due to production mismatch risk.

## Risks / Trade-offs

- [Minor-version behavioral changes in routing/build output] -> Mitigation: run targeted smoke checks on locale routes and key pages after upgrade.
- [Peer dependency drift from transitive updates] -> Mitigation: reinstall and validate lockfile resolution with no blocking conflicts.
- [Netlify runtime assumptions becoming stale] -> Mitigation: review `netlify.toml` and run CI-style build validation.

## Migration Outcomes

- Dependency upgrade completed: `next` is now `16.2.0` in `package.json`; `react` and `react-dom` remain `19.2.3`.
- Install check passed: `pnpm install` completed with no lockfile or peer-conflict failures.
- Build checks passed:
  - `pnpm build` passed on Next.js 16.2.0.
  - `CI=1 pnpm build` passed (deployment-oriented CI style).
- Runtime smoke checks passed with dev server:
  - `/` -> `307` redirect to locale route.
  - `/zh` -> `200`.
  - `/en/nianli` -> `200`.
- Configuration review result:
  - `next.config.ts` requires no changes for 16.2.0 in current setup.
  - `netlify.toml` remains compatible for current build flow.

## Follow-ups / Rollback

- Follow-up: repository-wide `pnpm check:ci` still reports existing Biome formatting/config diagnostics unrelated to this version bump; handle in a separate cleanup change.
- Rollback: pin `next` back to the prior 16.1.x version and restore corresponding lockfile snapshot, then rerun install/build/smoke checks.
