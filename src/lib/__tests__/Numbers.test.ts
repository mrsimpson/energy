import { beforeEach, describe, expect, it } from "vitest";
import { euros } from "../Numbers";

describe("Numbers", () => {
  beforeEach(() => {
    process.env.LANG = "de";
  });

  it("should format Euro amounts using an € symbol at the end", () => {
    expect(euros(123.45)).toMatch(/€$/);
  });

  it("should contain thousands separators", () => {
    expect(euros(12345.67)).toEqual("12.345,67 €");
  });

  it("should not show more than 2 fractional digits and use rounding", () => {
    expect(euros(12345.6789)).toEqual("12.345,68 €");
  })

  it("should be possible to specify the desired number of fractional digits", () => {
    expect(euros(12345.6789, 3)).toEqual("12.345,679 €");
    expect(euros(12345.6789, 0)).toEqual("12.346 €");
  })
});
