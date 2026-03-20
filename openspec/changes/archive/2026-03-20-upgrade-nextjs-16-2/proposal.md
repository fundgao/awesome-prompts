## Why

The project is currently on Next.js 16.1.x, and upgrading to Next.js 16.2 helps keep framework behavior, bug fixes, and ecosystem support current. Performing this upgrade now reduces drift and lowers maintenance risk for future updates.

## What Changes

- Upgrade `next` from 16.1.x to 16.2.x while preserving compatibility with the existing React 19 stack.
- Re-validate build/runtime behavior after the framework patch/minor upgrade.
- Confirm configuration and deployment settings continue to work after the version change.
- Record upgrade verification outcomes and any follow-up actions.

## Capabilities

### New Capabilities
- None.

### Modified Capabilities
- `nextjs-16-upgrade`: Extend the existing upgrade capability requirements to cover migration from Next.js 16.1.x to 16.2.x and post-upgrade validation.

## Impact

- Affected code: package manifest and potentially framework-dependent app/runtime integration points.
- Dependencies: `next` (primary), with compatibility checks against existing `react` and `react-dom`.
- Systems: local development, CI builds, and Netlify deployment flow.
