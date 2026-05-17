# titan-e2e-fixture

A deliberately small two-stack monorepo used as the **standing end-to-end
fixture for the Titan CI/CD engine**. The app is dummy on purpose — the point
is the pipeline.

## Layout

| Path                | Stack                | Lint        | Test    | Build         |
|---------------------|----------------------|-------------|---------|---------------|
| `backend/`          | Java 17 / Maven      | Checkstyle  | JUnit 5 | `package` jar |
| `frontend/`         | TypeScript / Node 20 | ESLint      | Vitest  | `tsc` → `dist`|
| `titan-pipeline.yml`| —                    | the Titan pipeline that builds both       |

## The pipeline

`titan-pipeline.yml` is a complete CI/CD run:

- **Checkout** the repo.
- Two **parallel chains** — Backend and Frontend — each `Lint → Test → Build`,
  sequential within the chain. Each runs in its own containerised `image:`
  stage (`maven:` / `node:`) because a Titan worker carries no toolchains.
- **JUnit** reports and **archived artifacts** (the backend jar, the frontend
  `dist/`).
- A **manual approval gate** before the report.
- A **Report** stage publishing build metadata as pipeline outputs, and a
  conditional **Notify** stage that POSTs a webhook when `notifyUrl` is set.

## Run it locally

```sh
# backend
cd backend && mvn verify
# frontend
cd frontend && npm install && npm run lint && npm test && npm run build
```

- e2e trigger smoke test 2026-05-17T22:13Z

- clean e2e run 2026-05-17T22:37Z

- e2e run (shared workspace) 2026-05-17T22:41Z

- e2e run (pool=20) 2026-05-17T22:48Z
