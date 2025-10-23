# UI Components (base)

Overview
- This directory contains the base UI primitives used across the app: buttons, inputs, form controls, layout primitives, icons, and small helpers (theme, tokens, utilities).
- These components are intended to be stable, reusable building blocks for the app UI.

Important: Do not edit this folder directly
- Treat this folder as a shared component library. Avoid making ad-hoc edits here from feature branches.
- If you need changes, either:
    - Add new components in a feature-specific folder, or
    - Open a PR against this folder with tests and a clear changelog entry.
- Unexpected edits here can break multiple screens. Confirm with the team before modifying core primitives.

Common base components (examples)
- Button — primary/secondary/ghost variants, loading states.
- Input / Textarea / Select — controlled/uncontrolled patterns with validation hooks.
- Modal / Dialog — accessible focus management and close behaviors.
- Layout primitives — Stack, Grid, Container for consistent spacing.
- Icons — centralized icon set or wrapper around react-icons/SVG sprites.
- Theme & tokens — color, spacing, typography values and helpers.

Libraries frequently used by these components
- React — component model.
- Styling utilities — styled-components, Emotion, or utility-first tools like Tailwind (check package.json for exact choice).
- Class helpers — clsx or classnames.
- Accessibility & primitives — Radix UI, Headless UI, or react-aria for a11y patterns.
- Motion/animation — framer-motion (where animations are required).
- Icon sets — react-icons or custom SVG components.

Notes about unused / legacy files
- You may find files that are present for reference, legacy implementations, or experimental features. Common indicators:
    - filenames with .old, .bak, or .legacy
    - directories named legacy, experimental, or unused
    - stories/examples that aren't imported by the app
- Before removing or refactoring such files, confirm they are not imported anywhere (search the repo) and open a PR explaining the cleanup.

How to verify dependencies and usage
- Inspect package.json to confirm which libraries are actually installed.
- Use your editor/grep to find imports of a file before changing or deleting it.
- Run the local app and tests after any change to core UI components.

Contact / contribution
- If unsure about changes, add a note in your PR describing risk and run the design/QA checklist.
- For large refactors, coordinate with frontend maintainers to avoid breaking consumers.

Quick checks
- Check package.json: `cat package.json | jq .dependencies`
- Find consumers: `git grep "components/ui" -- src || true`

Keep UI primitives small, well-documented, and backward-compatible where possible.