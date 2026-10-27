import { describe, expect, it } from "vitest";
import {
  calculateEmployeeSocialInsurance,
  calculateIkzeContributionProjection,
  calculatePpkEmployeeContribution,
  calculatePpkEmployerContribution,
  calculatePpkStateContribution,
  projectMonthlySavings,
} from "./index";
import { rules2026 } from "../rules";
import type { VerifiedRule } from "../rules/types";

function syntheticRule(value: number, unit: string): VerifiedRule<number> {
  return {
    value,
    unit,
    taxYear: 2026,
    effectivePeriod: "test fixture only",
    sourceUrl: "https://example.invalid/test-fixture",
    accessedAt: "test fixture only",
    verificationStatus: "verified",
  };
}

describe("employee social insurance", () => {
  it("does not calculate while employee rates remain unverified", () => {
    expect(calculateEmployeeSocialInsurance(5_000, 0, 2026)).toEqual({
      status: "unavailable",
      message: expect.stringContaining("until verified"),
    });
  });

  it("applies the verified annual ceiling only to pension and disability bases", () => {
    const result = calculateEmployeeSocialInsurance(1_000, 9_900, 2026, {
      pension: syntheticRule(0.1, "fraction"),
      disability: syntheticRule(0.02, "fraction"),
      sickness: syntheticRule(0.01, "fraction"),
      annualCeiling: syntheticRule(10_000, "PLN per calendar year"),
    });

    expect(result).toEqual({
      status: "available",
      value: { pension: 10, disability: 2, sickness: 10, total: 22 },
      assumptions: expect.any(Array),
    });
  });

  it("rejects negative income", () => {
    expect(() => calculateEmployeeSocialInsurance(-1, 0, 2026)).toThrow(RangeError);
  });
});

describe("PPK contributions", () => {
  it("keeps employee and employer calculations unavailable without verified rates", () => {
    expect(calculatePpkEmployeeContribution(1_000, 2026).status).toBe("unavailable");
    expect(calculatePpkEmployerContribution(1_000, 2026).status).toBe("unavailable");
  });

  it("calculates contributions only from an explicitly supplied verified rule", () => {
    expect(calculatePpkEmployeeContribution(1_000, 2026, syntheticRule(0.1, "fraction"))).toMatchObject({
      status: "available",
      value: 100,
    });
    expect(calculatePpkEmployerContribution(1_000, 2026, syntheticRule(0.05, "fraction"))).toMatchObject({
      status: "available",
      value: 50,
    });
  });

  it("does not assume eligibility for state payments", () => {
    expect(calculatePpkStateContribution(undefined, 2026).status).toBe("unavailable");
    expect(calculatePpkStateContribution(true, 2026).status).toBe("unavailable");
    expect(calculatePpkStateContribution(false, 2026)).toMatchObject({
      status: "available",
      value: 0,
    });
  });
});

describe("IKZE contribution projection", () => {
  it("limits planned contributions to remaining verified 2026 headroom", () => {
    expect(
      calculateIkzeContributionProjection(
        500,
        3,
        11_000,
        rules2026.ikzeAnnualContributionLimit,
        2026,
      ),
    ).toMatchObject({
      status: "available",
      value: {
        plannedContribution: 1_500,
        allowedAdditionalContribution: 304,
        projectedYearTotal: 11_304,
      },
    });
  });

  it("does not apply the 2026 limit to another tax year", () => {
    expect(
      calculateIkzeContributionProjection(
        100,
        1,
        0,
        rules2026.ikzeAnnualContributionLimit,
        2027,
      ).status,
    ).toBe("unavailable");
  });

  it("rejects an invalid remaining-month count", () => {
    expect(() =>
      calculateIkzeContributionProjection(
        100,
        13,
        0,
        rules2026.ikzeAnnualContributionLimit,
        2026,
      ),
    ).toThrow(RangeError);
  });

  it("includes source and effective-period metadata on every stored rule", () => {
    for (const rule of Object.values(rules2026).filter((value) => typeof value === "object")) {
      expect(rule).toMatchObject({
        unit: expect.any(String),
        taxYear: 2026,
        effectivePeriod: expect.any(String),
        sourceUrl: expect.stringMatching(/^https:\/\/(www\.)?(gov\.pl|zus\.pl)/),
        accessedAt: "2026-10-27",
        verificationStatus: "verified",
      });
    }
  });

  it("does not project additional contributions when reported payments exceed the limit", () => {
    expect(
      calculateIkzeContributionProjection(
        100,
        1,
        11_305,
        rules2026.ikzeAnnualContributionLimit,
        2026,
      ).status,
    ).toBe("unavailable");
  });
});

describe("monthly savings projections", () => {
  it("projects monthly contributions with no assumed return when the user enters zero", () => {
    expect(projectMonthlySavings(100, 0, 1)).toMatchObject({
      status: "available",
      value: { years: 1, contributions: 1_200, projectedBalance: 1_200 },
    });
  });

  it("returns all requested supported horizons", () => {
    expect([1, 5, 10, 15, 20].map((years) => projectMonthlySavings(10, 0, years))).toMatchObject([
      { value: { years: 1, contributions: 120, projectedBalance: 120 } },
      { value: { years: 5, contributions: 600, projectedBalance: 600 } },
      { value: { years: 10, contributions: 1_200, projectedBalance: 1_200 } },
      { value: { years: 15, contributions: 1_800, projectedBalance: 1_800 } },
      { value: { years: 20, contributions: 2_400, projectedBalance: 2_400 } },
    ]);
  });

  it("rejects invalid return assumptions and unsupported horizons", () => {
    expect(() => projectMonthlySavings(100, -100, 1)).toThrow(RangeError);
    expect(() => projectMonthlySavings(100, 0, 2)).toThrow(RangeError);
    expect(() => projectMonthlySavings(Number.MAX_VALUE, 0, 20)).toThrow(RangeError);
  });
});
