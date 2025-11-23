# Supabase integration — Editing policy

Important: files under `src/integrations/supabase` must NOT be changed except when a documented migration policy allows it. This README explains when edits are permitted and the required process.

## When edits are allowed
Edits are allowed only for one of the following, and only after following the approval process below:
- Critical bug fix that cannot be implemented safely from outside the directory.
- Security patch required to remediate a vulnerability.
- Schema or runtime migration that must modify integration code to remain compatible with a platform upgrade, and where no adapter or wrapper can be used.
- Legal / license changes that require code updates.

If your change is purely refactor, non-breaking improvement, or new feature that can be implemented outside this subdirectory (e.g., via wrappers, adapters, or higher-level code), do it outside this directory.

## Required approvals and process
1. Create an issue describing:
    - The problem and why the change must touch `src/integrations/supabase`.
    - A migration plan describing required edits, rollbacks, and migration timing.
    - Risk assessment and test plan.
2. Obtain explicit approval from the repository migration owners (see the repository Migrations README).
3. Open a PR that:
    - References the issue and the migration plan.
    - Limits changes only to the minimum necessary files.
    - Includes tests and migration scripts (if applicable).
    - Includes CI green status and a reviewer from migration owners.
4. Label the PR with the repository migration label (see Migrations README) and wait for final sign-off.
5. After merge, follow any post-deploy verification steps in the migration plan and document the outcome in the issue.

## Required artifacts
Every allowed change must include:
- Issue with migration plan and rollback steps.
- PR with clear scope and tests.
- CI passing.
- Approval from migration owners recorded in PR/issue.
- Changelog entry or migration log.

## Where to find the policy and owners
Refer to the repository Migrations README for full policy, labels, owner list, and templates:
- docs/MIGRATIONS.md or MIGRATIONS/README.md (repository root)
Also check CONTRIBUTING.md for general contribution rules.

## Contact
If unsure whether a change is allowed, open an issue and tag the migration owners or maintainers for guidance before editing this directory.

Failure to follow this process may result in the PR being rejected or reverted.