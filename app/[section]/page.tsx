import { notFound } from "next/navigation";
import { DashboardShell } from "@/components/layout/dashboard-shell";

const sections = new Set([
  "dashboard",
  "live-test",
  "test-history",
  "mcb-database",
  "reports",
  "analytics",
  "alerts",
  "ai-inspector",
  "devices",
]);

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;

  if (!sections.has(section)) {
    notFound();
  }

  return <DashboardShell />;
}