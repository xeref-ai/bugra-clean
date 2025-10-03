# Changelog

## [v43] - 2025-10-03
### Added
- **CI/CD:** Created a foundational GitHub Actions workflow (`.github/workflows/deploy.yml`) to automate the build process for the Next.js application.
- **Docs:** Significantly updated `docs/blueprint.md` with a comprehensive architectural overview, including a Mermaid diagram, component breakdown, and technology stack.
- **DX:** Added a `.gitignore` file to prevent sensitive information and local development artifacts from being committed to version control.
- **DX:** Created a `.env.example` file to serve as a template for environment variables, improving the setup process for new developers.
### Fixed
- **Changelog:** Corrected version number formatting in `changelog-data.ts` and `CHANGELOG.md`.

## [v42] - 2025-08-28
### Added
- **Chat:** Enhanced Chat with Citations: When an AI agent uses a web source, the response will now include a clickable link to that source.
### Improved
- **Backend:** Consolidated Webhook Logic: Moved the youtube-webhook logic from the legacy startup directory to the active backend.

## [v18] - 2025-07-10
### Added
- **Tasks:** Added support for task checklists to the backend.
### Improved
- **Database:** Updated the database schema to include checklists.
