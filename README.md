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

- gate-approval e2e 2026-05-17T23:32Z
<!-- titan discovery e2e probe: 2026-05-18T14:00:39Z -->

## Per-primitive pipelines

`titan-pipeline.yml` at the root is the full two-stack monorepo build. For
focused E2E coverage of individual PDL primitives the repo also ships a set of
small pipelines under `.titan/pipelines/` — one primitive per file, each pinned
to a known assertion contract so a Playwright/IT spec can drive it on the rig
and assert a single behavior.

| Pipeline                                  | Primitive exercised             | Assertion contract                                                                                              |
|-------------------------------------------|---------------------------------|------------------------------------------------------------------------------------------------------------------|
| `.titan/pipelines/simple-build.yml`       | `sh` + `archiveArtifacts:`      | Build SUCCESS; one artifact `out.txt` attached.                                                                  |
| `.titan/pipelines/with-params.yml`        | `parameters:` (string/choice/boolean) + `when:` | Trigger with `VERBOSE=true` produces 2 echo lines; with `VERBOSE=false` produces 1. Choice validation rejects MODE not in `[dev, prod]`. |
| `.titan/pipelines/with-approval.yml`      | `approval:` step                | Build parks on `Approval` in PENDING; POST `/approvals/{id}/decide` APPROVED drains Deploy → SUCCESS.            |
| `.titan/pipelines/with-retry.yml`         | `retry: {maxAttempts}`          | Build SUCCESS; flow-node attempt count == 2 (fail then pass). Assumes fresh worker; see file header.             |
| `.titan/pipelines/with-matrix.yml`        | `matrix:` (stage fan-out)       | 3 cell stages spawned (`JAVA_VERSION ∈ {11,17,21}`); each cell's stdout includes its own `java=<v>`.             |
| `.titan/pipelines/with-setBuildName.yml`  | `setBuildName:`                 | After run, `builds.display_name` starts with `deploy-` (default => `deploy-v0.0.0-dev`).                          |
| `.titan/pipelines/with-gitTag.yml`        | `gitTag:` (push:false)          | Build SUCCESS; gitTag node `result_json` carries the resolved tag. `TAG` is required at trigger.                 |
| `.titan/pipelines/with-httpRequest.yml`   | `httpRequest:`                  | Build SUCCESS; httpRequest node `result_json.status == 200`. Default URL is httpbin.org/post.                    |

These files are NOT discovered as build jobs unless the rig is configured to
scan `.titan/pipelines/`. E2E specs typically load the YAML directly and POST
to `POST /pipelines` (definition) + `POST /builds` (trigger).
