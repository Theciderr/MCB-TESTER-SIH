# Smart MCB Tester

AI-assisted engineering dashboard for the Smart India Hackathon 2026 problem:

**Problem Statement 26029 — Intelligent MCB Thermal Testing & Automated Quality Inspection System**

## What this project demonstrates

The platform provides:
- MCB test configuration;
- simulated/live device status;
- current/voltage/temperature telemetry;
- automatic trip detection;
- deterministic PASS/FAIL evaluation;
- thermal/current anomaly analysis;
- batch and serial traceability;
- test history;
- reports;
- alerts;
- device health;
- audit trail.

The supplied concept deck describes automated high-current/low-voltage MCB testing, precision current sensing, PID current control, automatic trip timing, temperature measurement and stored quality records. fileciteturn0file0L17-L28

## Documentation hierarchy

Read in this order:

1. `project.md` — product truth
2. `architecture.md` — system structure
3. `design.md` — visual/UX truth
4. `security.md` — security/safety boundary
5. `data_model.md` — persistence model
6. `api.md` — application contracts
7. `implementation_plan.md` — build order
8. `ai_rules.md` — coding-agent rules
9. `env.example` — configuration

## Stack

- Next.js + TypeScript
- Tailwind CSS
- shadcn/ui
- PostgreSQL
- Prisma
- Zod
- Recharts
- SSE/WebSocket for telemetry
- Local hardware gateway abstraction
- Optional AI provider

## Local setup

```bash
npm install
cp env.example .env
npx prisma migrate dev
npm run db:seed
npm run dev
```

## Demo accounts

Seed development-only accounts:
- operator@example.com
- qc@example.com
- supervisor@example.com

Use a clearly documented development password and never ship it to production.

## Demo path

1. Login as Operator.
2. Open Dashboard.
3. Select `Simulation Mode`.
4. Open Live Test.
5. Select an MCB.
6. Enter serial/batch.
7. Run the `Normal Trip` scenario.
8. Watch live current/voltage/temperature.
9. Observe trip marker.
10. Review PASS/FAIL.
11. Open AI Inspector.
12. Open generated report.
13. Open Test History.
14. Open Alerts and Device pages.

## Important safety boundary

Simulation mode is software-only.

Physical hardware must be controlled through a local authenticated gateway with independent device-side safety limits, interlocks and emergency-stop mechanisms.

Do not connect a public internet endpoint directly to high-current hardware.

## Certification boundary

The application can demonstrate a standards-oriented test workflow and generate a digital test report. It must not represent the hackathon simulation or prototype report as accredited certification.

## Testing

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Environment

See `env.example`.

## Source alignment

The source deck identifies the intended workflow as:
Select → Initialize → Soft Start → Control → Detect → Analyze, producing controlled current, trip detection, trip-time measurement, temperature analysis, PASS/FAIL and data logging. fileciteturn0file0L49-L60
