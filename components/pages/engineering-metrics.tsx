import { Activity, AlertTriangle, BatteryCharging, CircleGauge, Clock3, Gauge, ShieldCheck, Thermometer, Zap } from "lucide-react";

type MetricGroupName = "Electrical efficiency" | "Current control quality" | "Measurement accuracy" | "Repeatability and reproducibility" | "Throughput and operating efficiency" | "Reliability and safety";

type EngineeringMetric = { label: string; value: string; formula: string; meaning: string; icon: React.ReactNode; tone?: "green" | "orange" | "blue" };

const metricGroups: Record<MetricGroupName, EngineeringMetric[]> = {
  "Electrical efficiency": [
    { label: "Overall power efficiency", value: "86.4%", formula: "P DUT ÷ P mains × 100", meaning: "Mains power becoming useful test heat", icon: <Zap size={15} />, tone: "blue" },
    { label: "Transformer efficiency", value: "91.8%", formula: "P out ÷ P in", meaning: "Losses in the step-down transformer", icon: <BatteryCharging size={15} /> },
    { label: "Variac loss", value: "118 W", formula: "P in − P out", meaning: "Waste in the current-control stage", icon: <Activity size={15} />, tone: "orange" },
    { label: "Cable and lug loss", value: "42 W", formula: "I² × R leads", meaning: "Heat lost outside the DUT", icon: <Gauge size={15} /> },
    { label: "Power factor", value: "0.94 cos φ", formula: "cos φ", meaning: "Reactive power drawn but not used", icon: <CircleGauge size={15} /> },
    { label: "No-load loss", value: "76 W", formula: "P with DUT removed", meaning: "Standing cost of an energised bench", icon: <BatteryCharging size={15} /> },
    { label: "Voltage regulation", value: "2.8%", formula: "(V no-load − V full-load) ÷ V full-load", meaning: "Supply hold-up under high current", icon: <Activity size={15} />, tone: "green" },
  ],
  "Current control quality": [
    { label: "Setting accuracy", value: "+0.18 A", formula: "I target − I measured", meaning: "Gap from the configured 1.45 × In target", icon: <Gauge size={15} />, tone: "green" },
    { label: "Current stability", value: "±0.42%", formula: "Drift over test duration", meaning: "Stability during long thermal tests", icon: <Activity size={15} />, tone: "green" },
    { label: "Ripple / distortion", value: "1.7% THD", formula: "Waveform distortion", meaning: "Purity of injected current", icon: <Zap size={15} /> },
    { label: "Ramp time", value: "420 ms", formula: "Time to target current", meaning: "How quickly the bench reaches target", icon: <Clock3 size={15} /> },
  ],
  "Measurement accuracy": [
    { label: "CT accuracy class", value: "Class 0.5", formula: "Current measurement error", meaning: "Accuracy of current sensing", icon: <CircleGauge size={15} />, tone: "green" },
    { label: "Thermocouple accuracy", value: "±1.5 °C", formula: "K-type probe tolerance", meaning: "Confidence around the 65 K limit", icon: <Thermometer size={15} /> },
    { label: "Timer resolution", value: "1 ms", formula: "Trip-time clock resolution", meaning: "Timing precision in the 1–60 s window", icon: <Clock3 size={15} /> },
    { label: "Data logger rate", value: "2 kS/s", formula: "Telemetry samples per second", meaning: "Captures the trip moment", icon: <Activity size={15} /> },
    { label: "Measurement uncertainty", value: "±2.1%", formula: "Combined error / 95% confidence", meaning: "Combined instrument uncertainty", icon: <AlertTriangle size={15} />, tone: "orange" },
    { label: "Calibration status", value: "Valid · 18 days", formula: "Last traceable calibration", meaning: "Time remaining before review", icon: <ShieldCheck size={15} />, tone: "green" },
  ],
  "Repeatability and reproducibility": [
    { label: "Repeatability", value: "±3.2 ms", formula: "Same unit / same conditions", meaning: "Spread across repeated tests", icon: <Activity size={15} />, tone: "green" },
    { label: "Reproducibility", value: "±6.8 ms", formula: "Different operator / day", meaning: "Spread across operating conditions", icon: <Gauge size={15} /> },
    { label: "Standard deviation", value: "4.6 ms", formula: "σ of trip time", meaning: "Numeric measure of result spread", icon: <CircleGauge size={15} /> },
    { label: "Coefficient of variation", value: "2.6%", formula: "σ ÷ mean × 100", meaning: "Spread relative to the mean", icon: <Activity size={15} /> },
    { label: "Ambient influence", value: "+1.2 ms/°C", formula: "Trip shift vs room temperature", meaning: "Room temperature effect on results", icon: <Thermometer size={15} />, tone: "orange" },
  ],
  "Throughput and operating efficiency": [
    { label: "Time per test", value: "18.4 min", formula: "Setup + run + cooldown", meaning: "End-to-end cycle time", icon: <Clock3 size={15} /> },
    { label: "Cooldown time", value: "9.2 min", formula: "Trip end to ready state", meaning: "Thermal bottleneck between tests", icon: <Thermometer size={15} />, tone: "orange" },
    { label: "Tests per day", value: "42", formula: "Practical bench capacity", meaning: "Expected daily output", icon: <Activity size={15} />, tone: "blue" },
    { label: "Energy per test", value: "0.84 kWh", formula: "Bench energy / completed test", meaning: "Running cost of the bench", icon: <Zap size={15} /> },
    { label: "Automation level", value: "82%", formula: "Automated steps / all steps", meaning: "Manual intervention remaining", icon: <Gauge size={15} />, tone: "green" },
  ],
  "Reliability and safety": [
    { label: "Component temperature rise", value: "+31 °C", formula: "Transformer / contactor / leads", meaning: "Margin within component ratings", icon: <Thermometer size={15} />, tone: "green" },
    { label: "Contactor life", value: "84.2k ops", formula: "Operations before wear review", meaning: "Remaining switching life", icon: <Activity size={15} /> },
    { label: "Backup protection", value: "READY", formula: "Trip response verified", meaning: "Protection if the DUT fails", icon: <ShieldCheck size={15} />, tone: "green" },
    { label: "Uptime", value: "99.1%", formula: "Available bench time", meaning: "Overall dependability", icon: <CircleGauge size={15} />, tone: "blue" },
    { label: "Failure rate", value: "0.9%", formula: "Unplanned faults / sessions", meaning: "Bench failure frequency", icon: <AlertTriangle size={15} />, tone: "orange" },
  ],
};

export function MetricsMatrix({ groups, compact = false }: { groups: MetricGroupName[]; compact?: boolean }) {
  return <div className={`metrics-matrix ${compact ? "compact" : ""}`}>{groups.map((group) => <section className="metric-group" key={group}><div className="metric-group-heading"><h3>{group}</h3><span>SIMULATION DATA</span></div><div className="metric-cards">{metricGroups[group].map((metric) => <article className={`engineering-metric ${metric.tone ?? ""}`} key={metric.label}><div className="engineering-metric-top"><span className="engineering-icon">{metric.icon}</span><span className="engineering-label">{metric.label}</span></div><strong>{metric.value}</strong><small>{metric.formula}</small><p>{metric.meaning}</p></article>)}</div></section>)}</div>;
}

export type { MetricGroupName };