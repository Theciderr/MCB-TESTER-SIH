"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlertTriangle, BarChart3, Bell, Check, ChevronRight, CircleGauge, Database, FileText, LayoutDashboard, Play, Settings, ShieldCheck, Terminal, Thermometer, TimerReset, Waves, Wifi } from "lucide-react";
import { SectionView } from "@/components/pages/section-view";

const navigation = [
  { label: "Bench overview", shortLabel: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Live test", shortLabel: "Live", href: "/live-test", icon: Play },
  { label: "Test history", shortLabel: "History", href: "/test-history", icon: FileText },
  { label: "MCB database", shortLabel: "Catalog", href: "/mcb-database", icon: Database },
  { label: "Reports", shortLabel: "Reports", href: "/reports", icon: FileText },
  { label: "Analytics", shortLabel: "Trends", href: "/analytics", icon: BarChart3 },
  { label: "Alerts", shortLabel: "Alerts", href: "/alerts", icon: Bell },
  { label: "AI inspector", shortLabel: "AI", href: "/ai-inspector", icon: CircleGauge },
  { label: "Device / ESP32", shortLabel: "Device", href: "/devices", icon: Terminal },
];

const recentTests = [
  ["TST-2605-0142", "Acti9 iC60N", "16A / C", "1.45 × In", "188 ms", "PASS"],
  ["TST-2605-0141", "S200M", "20A / B", "2.55 × In", "72 ms", "PASS"],
  ["TST-2605-0140", "5SL6", "32A / D", "1.45 × In", "—", "FAIL"],
];

const viewCopy: Record<string, { title: string; subtitle: string; kicker: string }> = {
  "Bench overview": { title: "Bench overview", subtitle: "Repeatable tests, visible signals, traceable results.", kicker: "Live bench signal" },
  "Live test": { title: "Live test", subtitle: "Configure and observe a deterministic simulation run.", kicker: "Test setup / live signal" },
  "Test history": { title: "Test history", subtitle: "Review persisted sessions by unit, batch, and verdict.", kicker: "History / latest sessions" },
  "MCB database": { title: "MCB database", subtitle: "Browse the catalog of rated devices and test profiles.", kicker: "Catalog / active models" },
  Reports: { title: "Reports", subtitle: "Trace every result back to its stored test evidence.", kicker: "Reports / generated records" },
  Analytics: { title: "Analytics", subtitle: "See pass rate, trip latency, and batch signals at a glance.", kicker: "Trends / quality signals" },
  Alerts: { title: "Alerts", subtitle: "Resolve the exceptions that need operator attention.", kicker: "Exceptions / open items" },
  "AI inspector": { title: "AI inspector", subtitle: "Inspect anomalies with evidence-backed advisory analysis.", kicker: "Inspection / advisory signals" },
  "Device / ESP32": { title: "Device / ESP32", subtitle: "Check gateway health and sensor readiness before a run.", kicker: "Gateway / device health" },
};

export function DashboardShell() {
  const pathname = usePathname();
  const activeItem = navigation.find((item) => item.href === pathname) ?? navigation[0];
  const active = activeItem.label;
  const view = viewCopy[active];

  return (
    <div className="app-shell">
      <header className="masthead">
        <div className="masthead-brand"><div className="brand-stamp">MCB<span>/01</span></div><div><div className="brand-name">Smart MCB Tester</div><div className="brand-subtitle">Quality bench console</div></div></div>
        <div className="masthead-center"><span className="live-pulse" /> BENCH 01 <span className="slash">/</span> ESP32-TEST-01 <span className="online-word">ONLINE</span></div>
        <div className="masthead-actions"><div className="sim-chip"><Waves size={13} /> Simulation mode</div><button className="mast-icon" aria-label="View alerts"><Bell size={17} /><span>2</span></button><div className="operator"><div className="operator-initials">AK</div><span>A. Kumar</span></div></div>
      </header>
      <div className="workbench">
        <aside className="rail">
          <div className="rail-top"><span>01</span><div className="rail-rule" /></div>
          <nav aria-label="Primary navigation">{navigation.map((item, index) => <NavItem key={item.label} item={item} index={index} active={active === item.label} />)}</nav>
          <div className="rail-bottom"><Link className="rail-settings" aria-label="Open device settings" href="/devices"><Settings size={17} /></Link><span>v0.1 / SIM</span></div>
        </aside>
        <main className="bench-content">
          <div className="bench-heading"><div><h1>{view.title}</h1><p>{view.subtitle}</p></div><div className="heading-note"><span className="heading-note-label">Local time</span><strong>14:32:08</strong><span>UTC +05:30</span></div></div>
          {active === "Bench overview" ? <>
          <section className="live-layout">
            <div className="live-surface"><div className="section-kicker"><span>{view.kicker}</span><span>Last 24 hours / 82 sessions</span></div><div className="live-title-row"><div><h2>Current profile</h2><p>Acti9 iC60N · C curve · 16A</p></div><div className="signal-state"><span className="signal-dot" /> stable / ready</div></div><div className="waveform-wrap"><TelemetryChart /><div className="wave-marker"><span>trip window</span><i /></div></div><div className="signal-readouts"><Readout label="CURRENT" value="23.2" unit="A" note="target 23.2 A" /><Readout label="VOLTAGE" value="230.8" unit="V" note="within range" /><Readout label="TERMINAL" value="42.1" unit="°C" note="+3.4° / 10 min" tone="warm" /><Readout label="TRIP TIME" value="188" unit="ms" note="profile max 250 ms" /></div></div>
            <aside className="run-panel"><div className="section-kicker"><span>Next run</span><span className="run-index">SIM-0143</span></div><div className="run-panel-title"><h2>Start a controlled test</h2><p>All commands stay inside the deterministic simulator.</p></div><div className="field-list"><Field label="MCB model" value="Acti9 iC60N / 16A" /><Field label="Test profile" value="1.45 × In / thermal" /><Field label="Trace ID" value="BATCH-2609 / —" /></div><div className="scenario-picker"><span>Scenario</span><strong>Normal trip</strong><ChevronRight size={15} /></div><button className="start-button"><Play size={17} fill="currentColor" /> Start simulation</button><div className="run-safety"><ShieldCheck size={15} /><span>Safety gate passed</span><span className="run-safety-value">4 / 4 checks</span></div></aside>
          </section>
          <section className="metric-strip"><Metric label="Inspected" value="1,284" detail="all sessions" /><Metric label="Pass rate" value="90.97%" detail="1,168 passed" accent="green" /><Metric label="Mean trip" value="174.2 ms" detail="-6.8 ms / month" /><Metric label="Open alerts" value="02" detail="1 calibration" accent="orange" /></section>
          <section className="lower-layout"><div className="ledger-panel"><div className="section-kicker"><span>Test ledger</span><button className="text-button">Open full history <ChevronRight size={13} /></button></div><div className="ledger-heading"><h2>Recent sessions</h2><span>Persisted simulation results</span></div><div className="ledger-table"><div className="ledger-row ledger-header"><span>Test ID</span><span>Unit / rating</span><span>Profile</span><span>Trip time</span><span>Verdict</span></div>{recentTests.map(([id, model, rating, profile, time, verdict]) => <div className="ledger-row" key={id}><span className="test-id">{id}</span><span><strong>{model}</strong><small>{rating}</small></span><span>{profile}</span><span className="measurement">{time}</span><span className={`verdict ${verdict === "PASS" ? "pass" : "fail"}`}>{verdict === "PASS" ? <Check size={12} /> : <AlertTriangle size={12} />}{verdict}</span></div>)}</div></div><div className="exception-panel"><div className="section-kicker"><span>Exceptions</span><span className="exception-count">2 open</span></div><h2>Things worth a look</h2><Exception icon={<Thermometer size={15} />} title="Probe calibration drift" detail="Temperature probe · recommended before live test" /><Exception icon={<TimerReset size={15} />} title="Delayed trip pattern" detail="5SL6 / 32A · batch B-2609" /><div className="device-line"><span className="device-icon"><Wifi size={14} /></span><span><strong>Gateway online</strong><small>192.168.4.21 · heartbeat 12 sec ago</small></span><span className="healthy">HEALTHY</span></div></div></section>
          </> : <SectionView section={active as "Live test" | "Test history" | "MCB database" | "Reports" | "Analytics" | "Alerts" | "AI inspector" | "Device / ESP32"} />}
          <footer className="bench-footer"><span><span className="footer-dot" /> Software-only development environment</span><span>Physical hardware control is disabled in Simulation Mode.</span><span>Operator / A. Kumar</span></footer>
        </main>
      </div>
    </div>
  );
}

function NavItem({ item, index, active }: { item: { label: string; shortLabel: string; href: string; icon: React.ComponentType<{ size?: number }> }; index: number; active: boolean }) { const Icon = item.icon; return <Link className={`rail-item ${active ? "active" : ""}`} href={item.href} aria-label={item.label} aria-current={active ? "page" : undefined} title={item.label}><span className="rail-index">{String(index + 1).padStart(2, "0")}</span><Icon size={17} /><span className="rail-label">{item.shortLabel}</span></Link>; }
function Readout({ label, value, unit, note, tone }: { label: string; value: string; unit: string; note: string; tone?: "warm" }) { return <div className={`readout ${tone === "warm" ? "warm" : ""}`}><span className="readout-label">{label}</span><div><strong>{value}</strong><em>{unit}</em></div><small>{note}</small></div>; }
function Metric({ label, value, detail, accent }: { label: string; value: string; detail: string; accent?: "green" | "orange" }) { return <div className={`metric-cell ${accent ?? ""}`}><span>{label}</span><strong>{value}</strong><small>{detail}</small></div>; }
function Field({ label, value }: { label: string; value: string }) { return <div className="field"><span>{label}</span><strong>{value}</strong><ChevronRight size={14} /></div>; }
function Exception({ icon, title, detail }: { icon: React.ReactNode; title: string; detail: string }) { return <div className="exception"><span className="exception-icon">{icon}</span><span><strong>{title}</strong><small>{detail}</small></span><ChevronRight size={14} /></div>; }
function TelemetryChart() { return <div className="chart"><div className="chart-axis"><span>24</span><span>16</span><span>08</span><span>00</span></div><div className="chart-grid"><span /><span /><span /><span /></div><svg className="chart-svg" viewBox="0 0 760 210" preserveAspectRatio="none" aria-label="Simulated current waveform"><defs><linearGradient id="signal-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#2457ff" stopOpacity=".26" /><stop offset="1" stopColor="#2457ff" stopOpacity="0" /></linearGradient></defs><path d="M0 173 C38 171 48 173 78 165 S121 167 147 158 S190 155 218 142 S252 145 277 126 S309 119 337 130 S371 108 396 112 S427 93 455 99 S495 81 522 89 S560 70 588 74 S622 63 650 53 S704 52 760 38 L760 210 L0 210 Z" fill="url(#signal-fill)" /><path d="M0 173 C38 171 48 173 78 165 S121 167 147 158 S190 155 218 142 S252 145 277 126 S309 119 337 130 S371 108 396 112 S427 93 455 99 S495 81 522 89 S560 70 588 74 S622 63 650 53 S704 52 760 38" fill="none" stroke="#2457ff" strokeWidth="3" /><path d="M0 142 L760 45" fill="none" stroke="#ed6a3a" strokeWidth="1.5" strokeDasharray="6 8" /><circle cx="650" cy="53" r="6" fill="#ed6a3a" stroke="#f4f1e9" strokeWidth="3" /></svg><div className="chart-times"><span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>24:00</span></div></div>; }