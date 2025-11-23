# DO NOT EDIT: src/hooks

**Policy:** Files in `src/hooks` MUST NOT be edited except to implement a prominent UI change to the application.

**Permissions:** Any change to files under `src/hooks` requires Repository Admin Permissions and explicit approval from the repository admins or designated code owners.

**When changes are allowed**
- Only for broad, visible UI changes (e.g., new screens, major redesigns, or UI behavior changes that cannot be implemented via components or feature flags).
- Not for small bugfixes, refactors, or internal cleanups.

**Required process**
1. Open an Issue describing the UI change, rationale, and impacted hooks.
2. Attach designs, screenshots, and a migration plan (if applicable).
3. Tag repository admins / code owners and request approval.
4. After approval, create a draft PR that references the Issue. An admin must review and merge.
5. Include tests, documentation updates, and a changelog entry in the PR.

**Checklist for PRs touching src/hooks**
- [ ] Admin approval recorded in Issue/PR
- [ ] Design artifacts attached
- [ ] Tests updated/added
- [ ] Migration notes (if needed)
- [ ] Changelog updated

If in doubt, open an Issue and request guidance from the repository admins.