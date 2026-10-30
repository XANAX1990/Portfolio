import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(__dirname, "..");

describe("public/resume.pdf carries no metadata (SECURITY.md: author and file paths clean)", () => {
  // Byte-level on purpose: no PDF library needed, and any of these keys means metadata is back.
  const pdf = readFileSync(path.join(root, "public", "resume.pdf")).toString("latin1");

  it.each(["/Author", "/Keywords", "/Subject", "/Title", "/Creator", "/Producer", "/CreationDate", "/ModDate"])(
    "has no %s entry",
    (key) => {
      expect(pdf).not.toContain(key);
    }
  );

  it("has no XMP packet and no /Metadata stream", () => {
    expect(pdf).not.toMatch(/<x:xmpmeta|<\?xpacket|\/Metadata/);
  });

  it("does not mention the old Canva account alias or design ids", () => {
    expect(pdf).not.toMatch(/PrettyAnNiceGirl|DAHPeNcRjEA|BAEGFap7MgQ/);
  });

  it("is still a real, one-page PDF", () => {
    expect(pdf.startsWith("%PDF-")).toBe(true);
    expect(pdf).toMatch(/\/Type\s*\/Page[^s]/);
  });
});
