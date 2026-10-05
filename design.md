# UX / UI Design System

## 1. Design direction
Use a distinct instrument-ledger interface rather than a generic SaaS dashboard:
- pale graph-paper work surface with a graphite instrument rail;
- blue measurement traces and orange safety actions;
- green for healthy/pass and orange for warning/fail attention;
- one dominant live bench surface instead of a grid of equal cards;
- numbered vertical rail with compact icon navigation;
- compact masthead for device and Simulation Mode status;
- hard rules, tabular readouts, and high-information waveform treatment;
- asymmetric panels with restrained square corners and strong numeric telemetry.

The screenshots show a dashboard, live test, test history, MCB database, reports, analytics, alerts and ESP32/device views. The website should retain this information architecture while making it cleaner and more production-like.

## 2. Brand language
Product name: **MCB TestLab** or **Smart MCB Tester**.

Tone:
- industrial;
- precise;
- confident;
- technical;
- not playful;
- no unnecessary gradients or decorative illustrations.

## 3. Color tokens
```css
--paper: #f4f1e9;
--ink: #20252b;
--rail: #252a30;
--blue: #2457ff;
--orange: #ed6a3a;
--green: #26825e;
--paper-line: #d4cec1;
```

Use color as a semantic signal, not decoration.

## 4. Typography
- IBM Plex Sans for interface text
- IBM Plex Mono for measurements, IDs and status labels
- Numeric telemetry: tabular numbers
- Page heading: 28–36px
- Section heading: 18–22px
- Metric: 32–48px
- Body: 14–16px
- Dense tables: 13–14px

## 5. Layout
Desktop-first because the reference is an engineering workstation.

```text
┌─────────────────────────────────────────────────────────────┐
│ Logo │ Device │ Mode │ V │ I │ MCB │ User │ Alerts         │
├──────────┬──────────────────────────────────────────────────┤
│ Sidebar  │ Page header                           │ actions │
│          ├──────────────────────────────────────────────────┤
│          │ KPI cards                                         │
│          ├───────────────────────┬──────────────────────────┤
│          │ primary engineering   │ device/sensor status     │
│          │ chart                  │                          │
│          ├───────────────────────┴──────────────────────────┤
│          │ history / events / alerts                         │
└──────────┴──────────────────────────────────────────────────┘
```

## 6. Navigation
- Dashboard
- Live Test
- Test History
- MCB Database
- Reports
- Analytics
- Alerts
- AI Inspector
- Device / ESP32
- Settings

## 7. Dashboard
Top KPI cards:
- Total Tests
- Passed
- Failed
- Pass Rate
- Mean Trip Time
- Device Status
- Current Test

Primary area:
- real-time voltage/current waveform
- current target vs actual
- trip marker
- temperature curve

Secondary:
- sensor health
- recent tests
- active alerts

## 8. Live Test page
The live test is the hero interaction.

Top:
- MCB model
- rating
- curve
- test mode
- batch/serial
- simulation/live mode

Center:
- current
- target current
- voltage
- temperature
- MCB state
- elapsed time

Bottom:
- waveform
- event timeline
- rule evaluation
- AI insight

Safety:
- large Start button;
- Stop/E-stop visually dominant;
- clear pre-flight checklist;
- never make dangerous controls look like ordinary navigation.

## 9. Test result page
Use an engineering report layout:
- PASS/FAIL hero;
- test metadata;
- target vs measured;
- trip time;
- current curve;
- thermal curve;
- rule results;
- AI explanation;
- audit trail;
- export.

## 10. AI Inspector
Do not create a generic chatbot.

Show:
- anomaly score;
- classification;
- three strongest reasons;
- evidence values;
- golden curve deviation;
- recommended next inspection step.

Example:
> **Marginal thermal signature**
> Trip occurred later than the configured envelope and terminal temperature rose faster than the batch median.

## 11. Accessibility
- keyboard navigation;
- visible focus;
- minimum AA contrast;
- do not rely on color alone;
- labels on chart markers;
- screen-reader-friendly status text.

## 12. Motion
Use motion only for:
- live telemetry state;
- trip event;
- page transitions;
- alert arrival.

Avoid decorative animations that distract from engineering data.
