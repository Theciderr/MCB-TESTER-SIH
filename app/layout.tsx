import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart MCB Tester",
  description: "Engineering monitoring and quality inspection for MCB test benches.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}