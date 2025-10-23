/*
Supabase Migrations — Overview and Repository Policy

Overview:
- Supabase migrations are ordered, versioned database change files (SQL or migration files) that modify schema and/or data. They are executed against a database in the sequence they were created and are used to reproduce and synchronize database state across environments.
- All migration files for this project are stored in the supabase/migrations directory and together represent the repository's canonical migration history.

Important Rules:
1. Do NOT edit any existing files inside supabase/migrations.
    - Editing existing migration files changes historical migration history and can break other contributors' environments and CI/CD pipelines. Always preserve committed migration files as an immutable record of past changes.

2. Only ADD new migration files.
    - When you need to change the schema or data, create a new migration that performs the required change. Name and order migrations per the project's migration conventions.

3. Test migrations before committing or merging.
    - Run every new migration against a local or staging database (using your normal Supabase/CLI workflow) and verify that it applies cleanly and rolls back (if applicable). Ensure the migration performs its intended changes without errors and does not cause data loss or corruption in existing environments.

Enforcement:
- Any migration that is non-pretested, faulty, or produces errors when applied will be removed from the repository.
- The author(s) of such migrations will receive a formal warning.
- Repeated offenses may result in temporary or permanent revocation of repository editing privileges for the offending user(s).

If you are unsure whether a proposed change belongs in a migration or how to test it, consult the maintainers before committing. Preserving a reliable, testable migration history protects everyone who uses this repository.
*/