# Architecture

## 1. Architecture decision
Use a **modular monolith** for the hackathon:
- Next.js App Router + TypeScript
- PostgreSQL
- Prisma ORM
- Tailwind CSS + shadcn/ui
- Recharts for engineering charts
- Zod for contracts/validation
- Auth.js or equivalent session-based auth
- Local Hardware Gateway adapter
- Optional MQTT adapter
- AI analysis service behind a provider-neutral interface

Do not split into microservices during the hackathon. Keep domain modules isolated so services can be extracted later.

## 2. High-level topology

```text
Browser
  |
  v
Next.js Web App
  |-- UI / dashboards
  |-- Server Actions / Route Handlers
  |-- Auth + RBAC
  |-- Domain services
  |-- Rule engine
  |-- AI analysis adapter
  |
  +---- PostgreSQL
  |
  +---- Report renderer
  |
  +---- Hardware Gateway
           |-- Simulation adapter
           |-- HTTP/REST adapter
           |-- MQTT adapter (optional)
           |
           +---- ESP32/STM32 controller
                    |-- sensors
                    |-- contact state
                    |-- emergency/interlock state
```

The supplied deck describes an ESP32/STM32 controller, RMS current calculation, shunt-based feedback, PID control, automatic trip detection, millisecond timing and thermal analysis. fileciteturn0file0L38-L47

## 3. Modules

### `auth`
- users
- sessions
- roles
- permissions

### `mcb-catalog`
- manufacturers
- MCB models
- rating
- curve
- poles
- voltage class
- standard metadata
- test profiles

### `test-engine`
- test creation
- state machine
- pre-flight checks
- test orchestration
- deterministic evaluation
- result finalization

### `telemetry`
- current
- voltage
- frequency
- terminal temperature
- ambient temperature
- contact state
- hardware status
- timestamps

### `device-gateway`
- device registration
- heartbeat
- telemetry ingest
- command abstraction
- simulation adapter

### `analytics`
- pass rate
- mean trip latency
- distributions
- batch trends
- curve comparisons

### `ai-inspection`
- thermal signature analysis
- waveform anomaly scoring
- golden-curve deviation
- natural-language explanation
- confidence + evidence

### `reports`
- test report
- certificate-like demo report
- CSV export
- immutable result snapshot

### `alerts`
- device offline
- trip detected
- sensor abnormal
- test out of spec
- emergency/fault lockout

### `audit`
- user action log
- hardware command log
- result changes
- report generation
- login/security events

## 4. Test state machine

```text
DRAFT
  |
  v
PRECHECK
  | fail
  +------> BLOCKED
  |
  v
ARMED
  |
  v
RUNNING
  |----------------------|
  | trip                 | timeout
  v                      v
TRIPPED                NO_TRIP
  |                      |
  +----------+-----------+
             v
         ANALYZING
             |
       +-----+-----+
       |           |
      PASS        FAIL
       |           |
       +-----+-----+
             v
          FINALIZED
             |
             v
          REPORTED
```

## 5. Real-time strategy
For the hackathon:
- telemetry transport: WebSocket/SSE from server to browser;
- device ingress: REST initially;
- polling fallback for demo resilience;
- simulation engine emits deterministic time-series events.

Do not stream every raw ADC sample into PostgreSQL. Store:
- test summary;
- sampled telemetry;
- key events;
- derived metrics;
- optional compressed raw trace.

## 6. AI boundary
AI never directly controls current output.

```text
Telemetry
   |
   v
Feature extraction
   |
   +--> deterministic rule engine --> PASS/FAIL
   |
   +--> AI anomaly model/LLM --> explanation
```

AI output schema:
```ts
{
  anomalyScore: number,
  classification: "normal" | "marginal" | "anomalous",
  reasons: string[],
  evidence: {
    metric: string,
    observed: number,
    expected?: number,
    deviation?: number
  }[],
  confidence: number
}
```

## 7. Deployment
Hackathon:
- Vercel/Node-compatible deployment for UI/API;
- managed PostgreSQL;
- local hardware gateway for physical/demo device;
- simulation mode available without hardware.

Production direction:
- plant-local gateway;
- cloud dashboard;
- tenant/site/machine hierarchy;
- private network;
- device certificates;
- MQTT over TLS.
