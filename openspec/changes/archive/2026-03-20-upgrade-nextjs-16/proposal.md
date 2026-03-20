## Why

The project is currently behind the latest Next.js major version, which limits access to platform improvements, security updates, and ecosystem compatibility. Upgrading now reduces migration risk later and keeps the stack aligned with current tooling.

## What Changes

- Upgrade the application from its current Next.js version to Next.js 16.
- Update related dependencies and configuration required for Next.js 16 compatibility.
- Resolve breaking changes in framework APIs, runtime behavior, and build/deploy settings.
- Validate local development, production build, and deployment configuration after migration.

## Capabilities

### New Capabilities
- `nextjs-16-upgrade`: Defines requirements for upgrading and validating the app on Next.js 16.

### Modified Capabilities
- None.

## Impact

- Affected code: Next.js app configuration and framework integration points across the repository.
- Dependencies: `next`, potentially `react`, `react-dom`, and tooling coupled to Next.js.
- Systems: local dev server, CI build pipeline, and Netlify deployment settings.
