# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-06-20

### Added
- Initial release of the GeaJS Library Scaffolder (`gea-lib`).
- Interactive CLI wizard for setting up new JavaScript and TypeScript libraries.
- Templates for both JavaScript and TypeScript with support for interactive demo sandboxes (`npm run dev`) and production builds (`npm run build`).
- Automated Git initialization (`git init`) and dependency installation.
- Support for multiple package managers: `npm`, `yarn`, `pnpm`, and `bun`.
- CLI flags for non-interactive/silent configurations (e.g. `--ts`, `--js`, `--git`, `--no-install`, `-y`).
