// @vitest-environment node

import { describe, expect, it } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

describe("CI workflow", () => {
  it("runs install, lint, test, and build", () => {
    const workflowPath = resolve(process.cwd(), ".github/workflows/ci.yml");
    expect(existsSync(workflowPath)).toBe(true);

    const content = readFileSync(workflowPath, "utf8");

    expect(content).toMatch(/npm\s+ci/);
    expect(content).toMatch(/npm\s+run\s+lint/);
    expect(content).toMatch(/npm\s+test/);
    expect(content).toMatch(/npm\s+run\s+build/);
  });
});
