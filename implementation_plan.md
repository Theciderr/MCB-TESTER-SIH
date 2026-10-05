# Implementation Plan

## Phase 0 — Project bootstrap
**Goal:** working shell.

Tasks:
- initialize Next.js + TypeScript;
- install Tailwind/shadcn;
- configure ESLint/Prettier;
- configure Prisma/PostgreSQL;
- add Zod;
- establish route/module conventions;
- create `.env.example`;
- add seed script.

Deliverable:
- app boots;
- DB connects;
- CI passes.

## Phase 1 — Design system
Build:
- app shell;
- sidebar;
- top status bar;
- cards;
- buttons;
- badges;
- tables;
- chart containers;
- modal/drawer;
- toast/alert system.

Match the reference screenshots closely, but improve spacing, hierarchy and consistency.

## Phase 2 — Data layer
Implement:
- Prisma schema;
- migrations;
- seed data;
- MCB catalog;
- test profiles;
- users/roles;
- devices/sensors;
- test sessions;
- telemetry;
- events;
- reports;
- alerts;
- audit logs.

## Phase 3 — Dashboard
Build:
- KPI cards;
- current device state;
- current test;
- recent tests;
- active alerts;
- pass-rate chart;
- trip-latency chart.

Seed realistic data so the dashboard looks complete on first launch.

## Phase 4 — Live Test simulator
Build simulator first.

Simulator should support:
- normal trip;
- delayed trip;
- no-trip;
- unstable current;
- temperature anomaly;
- sensor dropout;
- emergency stop.

Simulator output must be deterministic by scenario + seed so demos are repeatable.

## Phase 5 — Test engine
Implement:
- precheck;
- test state machine;
- target-current calculation;
- timer;
- trip event;
- timeout;
- rule evaluation;
- finalization.

Keep domain logic independent of React components.

## Phase 6 — Telemetry
Implement:
- SSE stream;
- live chart;
- current/target;
- voltage;
- temperature;
- contact state;
- trip marker;
- event timeline.

## Phase 7 — AI inspection
Start with feature-based anomaly scoring.

Features:
- trip latency;
- peak current;
- current stability;
- current overshoot;
- temperature slope;
- max temperature;
- deviation from golden curve;
- batch median deviation.

Then optionally add an LLM explanation layer that converts structured evidence into readable QC commentary.

Never let an LLM calculate the official verdict.

## Phase 8 — History / reports
Build:
- searchable history;
- filters;
- detail page;
- comparison;
- report generation;
- CSV export;
- report hash.

## Phase 9 — Device page
Build:
- ESP32 status;
- IP;
- firmware;
- heartbeat;
- sensor health;
- calibration;
- last readings;
- connection state.

Use a mock gateway unless the real device protocol is confirmed.

## Phase 10 — Alerts
Build:
- critical/warning/info;
- acknowledgement;
- source;
- related test;
- related device.

## Phase 11 — Polish
- loading states;
- empty states;
- error states;
- responsive behavior;
- accessibility;
- keyboard navigation;
- demo data;
- seeded accounts;
- judge flow.

## Phase 12 — Deployment
Recommended:
- web/API: Vercel or Node host;
- database: managed PostgreSQL;
- hardware gateway: local laptop/Raspberry Pi/industrial PC;
- tunnel only if required for demo;
- simulation mode always available.

## Suggested repository structure

```text
mcb-tester/
├── app/
│   ├── (auth)/
│   ├── dashboard/
│   ├── live-test/
│   ├── test-history/
│   ├── tests/[id]/
│   ├── mcb-database/
│   ├── reports/
│   ├── analytics/
│   ├── alerts/
│   ├── ai-inspector/
│   ├── devices/
│   └── settings/
├── components/
│   ├── ui/
│   ├── charts/
│   ├── telemetry/
│   ├── tests/
│   └── layout/
├── lib/
│   ├── auth/
│   ├── db/
│   ├── validation/
│   ├── rules/
│   ├── ai/
│   ├── telemetry/
│   ├── reports/
│   └── audit/
├── domain/
│   ├── test-engine/
│   ├── mcb/
│   └── devices/
├── simulator/
├── prisma/
├── public/
├── tests/
├── project.md
├── architecture.md
├── design.md
├── security.md
├── data_model.md
├── api.md
├── implementation_plan.md
├── ai_rules.md
├── README.md
└── env.example
```

## Agent execution order
1. Read all markdown instructions.
2. Build shell.
3. Build schema.
4. Seed.
5. Build dashboard.
6. Build simulator.
7. Build test engine.
8. Build telemetry.
9. Build results.
10. Build AI.
11. Build reports.
12. Build device/alerts.
13. Test entire judge flow.
