# Onboarding Platform Baseline (GZH-10)

Updated: 2026-05-27

## Canonical Repository

- Repository: https://github.com/LiuGuoJiang/vuepress-dux
- Default branch: `main`
- Working branch pattern: `<agent-or-user>/<ticket>-<short-description>`

## Access Baseline

- Repo admin owner: `LiuGuoJiang` (CTO)
- FoundingEngineer delivery path: feature branch + pull request to `main`
- Direct pushes to `main` are disallowed by process policy for all implementation work.

Validation path for onboarding:

1. Create feature branch from `main`.
2. Push one non-production marker commit.
3. Open PR into `main`.
4. Require review + status checks before merge.

## Branch Protection Policy (Target)

Required controls for `main`:

- Require at least 1 pull request review before merge.
- Require conversation resolution before merge.
- Require status checks: `ci/build`, `ci/test`.
- Require branch to be up to date before merge.
- Disable force pushes and branch deletion on `main`.

## Incident Channel and Alert Routing

- Incident command channel: GitHub issue thread in this repo using the incident template.
- Channel naming convention: `INC-YYYYMMDD-<service>-<short-summary>`
- Severity labels: `sev1`, `sev2`, `sev3`.
- Alert routing destination: open/update incident issue and notify `@LiuGuoJiang` on every `sev1`/`sev2` event.

## Centralized Logging Sink (Initial Environments)

- Sink selected: GitHub Actions run logs + workflow artifacts in `vuepress-dux`.
- Setup link: https://github.com/LiuGuoJiang/vuepress-dux/actions
- Usage rule: build/test/deploy jobs must upload diagnostic artifacts on failure.
