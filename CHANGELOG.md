# Changelog

## [2.0.1] - 2025-07-04
### Added
- **CI/CD:** Created a foundational GitHub Actions workflow (`.github/workflows/deploy.yml`) to automate the build process for the Next.js application.
- **Docs:** Significantly updated `docs/blueprint.md` with a comprehensive architectural overview, including a Mermaid diagram, component breakdown, and technology stack.
- **DX:** Added a `.gitignore` file to prevent sensitive information and local development artifacts from being committed to version control.
- **DX:** Created a `.env.example` file to serve as a template for environment variables, improving the setup process for new developers.

## [2.0.0] - 2025-07-03
### Added
- feat(backend): Enhanced Firestore user model to support a detailed 'userContext' object.
- feat(backend): Implemented a new context-aware API endpoint that injects user-specific context into AI prompts.
- feat(frontend): Upgraded AuthProvider to fetch and globally provide the 'userContext'.
- feat(ui): Created a new 'User Context' view in the right panel to display user goals and skills.
- docs: Initialized CHANGELOG.md for daily development tracking.
