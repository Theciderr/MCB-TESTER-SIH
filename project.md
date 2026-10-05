# Smart MCB Tester — Product North Star

## 1. Product identity
**Name:** Smart MCB Tester  
**Hackathon:** Smart India Hackathon 2026  
**Problem Statement:** 26029 — Intelligent MCB Thermal Testing & Automated Quality Inspection System  
**Team:** Absolut Coders

The product is a digital control, monitoring, testing and quality-inspection platform for an automated MCB test bench. The website must make the physical tester understandable and operable through one engineering-grade interface.

The source deck describes a flow of controlled current → trip detection → trip-time measurement → temperature analysis → PASS/FAIL → data logging. It also specifies preset test points of 1.13×In, 1.45×In and 2.55×In, with QR/serial/batch traceability.

## 2. Product north star
> Make every MCB test repeatable, observable, traceable and explainable — from test setup to digitally verified result.

The website is not the high-current power-control firmware itself. It is the operator/QC layer that:
- configures a test;
- communicates with a local hardware gateway;
- visualizes telemetry;
- detects and records trips;
- evaluates results against configured test rules;
- highlights anomalies;
- stores the complete test record;
- generates a report/certificate marked as a demonstration result unless an accredited certification workflow is actually connected.

## 3. Primary users

### Operator
Needs:
- fast test setup;
- device/sensor health;
- safe start/stop;
- live current/voltage/temperature;
- trip detection;
- clear PASS/FAIL;
- minimal ambiguity.

### QC Engineer
Needs:
- historical tests;
- batch and serial traceability;
- curve comparison;
- thermal trends;
- failed/marginal units;
- downloadable reports;
- audit trail.

### Supervisor / Plant Manager
Needs:
- throughput;
- pass rate;
- failure reasons;
- model/batch trends;
- operator performance;
- equipment health;
- quality KPIs.

### Demo/Judge
Needs:
- a polished simulation mode;
- visible end-to-end workflow;
- realistic telemetry;
- clear AI value;
- report generation;
- architecture transparency.

## 4. MVP scope

### Must have
1. Authentication with roles.
2. Dashboard.
3. Live Test setup.
4. Simulation mode.
5. Real-device connection abstraction.
6. MCB database/catalog.
7. Test history.
8. Live waveform chart.
9. Test-result detail page.
10. PASS/FAIL rules.
11. Thermal/current anomaly scoring.
12. Reports.
13. Alerts.
14. Device/sensor health page.
15. Audit trail.
16. CSV export.
17. QR/serial/batch lookup.

### Should have
- compare two tests;
- golden-curve overlay;
- AI explanation panel;
- calibration records;
- configurable thresholds;
- dark/light mode;
- command confirmation for hardware actions.

### Defer
- multi-machine orchestration;
- production ERP integration;
- real cloud-to-hardware control;
- advanced predictive maintenance;
- automated model training in the browser.

## 5. Core workflows

### Workflow A — Run a test
1. Operator selects MCB model.
2. System loads rating, curve, poles and voltage class.
3. Operator enters batch/serial or scans QR.
4. Operator chooses test mode.
5. System performs pre-flight checks.
6. Operator confirms safe fixture/interlock state.
7. Test enters `ARMED`.
8. Hardware gateway performs soft-start.
9. Telemetry streams to the UI.
10. Current controller maintains target current.
11. Trip event is detected.
12. Current is stopped.
13. Trip time and thermal data are finalized.
14. Rule engine evaluates the result.
15. AI layer analyzes the signature and provides an explanation.
16. Result is persisted.
17. Report can be generated.

### Workflow B — No trip
1. Test runs until configured time limit.
2. No trip event arrives.
3. Current is stopped.
4. Result becomes `NO_TRIP` / `FAIL` according to the configured test rule.
5. Operator sees reason and evidence.

### Workflow C — Failure investigation
1. Open failed result.
2. View target vs actual current.
3. View trip marker.
4. View temperature curve.
5. View rule failures.
6. View AI anomaly explanation.
7. Compare with golden curve.
8. Export report.

## 6. Test modes
- 1.13 × In
- 1.45 × In
- 2.55 × In
- Instantaneous / curve-specific test
- Custom current + duration for demonstration/research mode

The exact acceptance window must come from the configured test profile. Do not hard-code a generic pass/fail rule in UI components.

## 7. Product rules
- Hardware safety state always overrides UI intent.
- A disconnected or unhealthy safety-critical sensor blocks test start.
- Simulation mode must never send physical hardware commands.
- Every test has an immutable test ID.
- Every result stores the exact configuration used at test time.
- Reports are generated from stored test data, never from live mutable state.
- AI can recommend/flag; the deterministic rules engine owns the official application result.
- A report must not claim regulatory certification unless an accredited certification process actually produced it.

## 8. Definition of done
A hackathon-ready build is complete when a judge can:
1. sign in;
2. select an MCB;
3. enter serial/batch;
4. run a simulation;
5. see live telemetry;
6. see a trip event;
7. see rule evaluation;
8. see AI explanation;
9. inspect history;
10. open a generated report;
11. trace the result back to the MCB/batch;
12. see device health and alerts.

## 9. Source alignment
The source deck explicitly positions the system around automated testing, precision current measurement, PID/current control, trip-time measurement, temperature monitoring, automatic assessment and quality traceability. See the solution description and workflow on pages 2–3 of the supplied deck. fileciteturn0file0L17-L28
