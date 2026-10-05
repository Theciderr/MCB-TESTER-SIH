import { describe, expect, it } from "vitest";

describe("Phase 0 bootstrap", () => {
  it("uses simulation mode as the documented default", () => {
    expect(process.env.NEXT_PUBLIC_APP_MODE ?? "SIMULATION").toBe("SIMULATION");
  });
});