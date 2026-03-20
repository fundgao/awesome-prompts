## 1. Dependency and Configuration Upgrade

- [x] 1.1 Update `next` to version 16 and align required peer dependencies (`react`, `react-dom`) in package manifests.
- [x] 1.2 Reinstall dependencies and resolve lockfile or peer dependency conflicts introduced by the upgrade.
- [x] 1.3 Review and update `next.config.ts` for Next.js 16 compatibility.
- [x] 1.4 Review and update `netlify.toml` and related build settings for Next.js 16 deployment support.

## 2. Compatibility Fixes

- [x] 2.1 Identify and fix compile/runtime breakages caused by Next.js 16 API or behavior changes.
- [x] 2.2 Verify core routes and critical user flows still behave as expected after migration.
- [x] 2.3 Remove or replace deprecated framework patterns that are no longer supported.

## 3. Validation and Handoff

- [x] 3.1 Run install, development server, and production build checks; ensure all pass on the upgraded stack.
- [x] 3.2 Run deployment-oriented build validation matching Netlify/CI environment.
- [x] 3.3 Document migration outcomes, known follow-ups, and rollback notes in the change context.
