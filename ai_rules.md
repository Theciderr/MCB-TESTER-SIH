# AI Coding Agent Rules

These rules are for Codex / Claude Code / Cursor-style agents working on this repository.

## 1. First rule: read the docs
Before editing code, read:
- `README.md`
- `project.md`
- `architecture.md`
- `design.md`
- `security.md`
- `data_model.md`
- `api.md`
- `implementation_plan.md`

Do not begin implementation from a chat prompt alone if these files exist.

## 2. Product boundaries
The website is an engineering monitoring/testing application for an MCB test bench.

Do not:
- invent hardware capabilities;
- claim physical testing is happening when simulation is running;
- claim regulatory certification;
- allow an AI model to control current directly;
- replace safety interlocks with UI logic.

## 3. Simulation first
All hardware-dependent features must work in `SIMULATION` mode.

The simulator must be:
- deterministic;
- resettable;
- scenario-based;
- visually indistinguishable from live telemetry except for the explicit mode indicator.

## 4. Domain-first implementation
Do not put test rules inside React components.

Correct:
```text
UI -> application service -> domain rule engine -> persistence
```

Incorrect:
```text
button onClick -> calculate PASS/FAIL -> save random object
```

## 5. Type safety
- TypeScript strict mode.
- No `any` unless unavoidable and documented.
- Zod at external boundaries.
- Share API types where practical.
- Prefer discriminated unions for state machines.

## 6. State machine
Never add ad-hoc test states.

Use the defined state machine:
`DRAFT -> PRECHECK -> ARMED -> RUNNING -> TRIPPED/NO_TRIP -> ANALYZING -> PASS/FAIL -> FINALIZED -> REPORTED`

All transitions must have explicit guards.

## 7. Safety
Any code that can start/stop physical hardware requires extra review.

Rules:
- server-side authorization;
- server-side bounds;
- device-side limits;
- command audit;
- timeout;
- fail-safe behavior;
- no arbitrary device command endpoint.

## 8. AI implementation
AI is advisory.

Required:
- structured output;
- schema validation;
- model/provider version logging;
- evidence-based explanation;
- confidence;
- deterministic fallback.

AI must not:
- invent sensor values;
- invent standards;
- change test configuration;
- modify a finalized result;
- issue hardware commands.

## 9. UI rules
Use existing design tokens/components.

Do not:
- create random gradients;
- use generic SaaS purple;
- introduce a different sidebar pattern;
- make every card glow;
- hide critical status in tooltips;
- use color alone to communicate PASS/FAIL.

## 10. Data rules
- Never delete finalized test results from the UI.
- Never mutate historical test configuration.
- Store profile version with every test.
- Store simulation/live mode.
- Use UTC timestamps.
- Use database transactions for result finalization.

## 11. Reports
Reports must be generated from persisted data.

A report should include:
- test ID;
- MCB model;
- rating/curve;
- test profile;
- serial/batch;
- measured telemetry summary;
- trip time;
- verdict;
- rule evidence;
- AI analysis if present;
- mode;
- generation timestamp;
- report hash.

## 12. Coding workflow
For each task:
1. inspect existing code;
2. identify affected modules;
3. make the smallest coherent change;
4. run typecheck;
5. run lint;
6. run relevant tests;
7. inspect UI;
8. summarize files changed and remaining risks.

## 13. Do not over-engineer
Hackathon priority:
1. working judge flow;
2. visual quality;
3. believable simulation;
4. clear AI value;
5. traceability;
6. architecture quality.

Do not introduce Kubernetes, microservices, Kafka, event sourcing or complex MLOps unless a real requirement appears.

## 14. Commit discipline
Use small commits:
- `feat: add test simulator`
- `feat: add live telemetry chart`
- `feat: add test result rules`
- `feat: add ai inspector`
- `fix: block start when device offline`

## 15. When requirements conflict
Priority:
1. safety/security;
2. `project.md`;
3. `architecture.md`;
4. `data_model.md`;
5. `api.md`;
6. `design.md`;
7. implementation convenience.

Ask for clarification rather than silently inventing requirements when the conflict affects safety or product behavior.
