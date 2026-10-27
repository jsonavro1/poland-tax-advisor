import type { RuleSet } from "./types";

export const rules2026: RuleSet = {
  version: "pl-uop-2026-v1",
  taxYear: 2026,
  socialInsuranceAnnualCeiling: {
    value: 282_600,
    unit: "PLN per calendar year",
    taxYear: 2026,
    effectivePeriod: "2026-01-01 to 2026-12-31",
    sourceUrl:
      "https://www.zus.pl/-/nowe-wysoko%C5%9Bci-sk%C5%82adek-na-ubezpieczenia-spo%C5%82eczne-w-2026-r.?redirect=%2Fo-zus%2Faktualnosci",
    accessedAt: "2026-10-27",
    verificationStatus: "verified",
  },
  ikzeAnnualContributionLimit: {
    value: 11_304,
    unit: "PLN per calendar year",
    taxYear: 2026,
    effectivePeriod: "2026-01-01 to 2026-12-31",
    sourceUrl: "https://www.gov.pl/web/rodzina/ikze-limit-wplat",
    accessedAt: "2026-10-27",
    verificationStatus: "verified",
  },
};

export type { RuleSet, VerifiedRule } from "./types";
