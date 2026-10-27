export type VerifiedRule<T> = {
  value: T;
  unit: string;
  taxYear: number;
  effectivePeriod: string;
  sourceUrl: string;
  accessedAt: string;
  verificationStatus: "verified";
};

export type RuleSet = {
  version: string;
  taxYear: number;
  socialInsuranceAnnualCeiling: VerifiedRule<number>;
  ikzeAnnualContributionLimit: VerifiedRule<number>;
};

export type CalculationResult<T> =
  | {
      status: "available";
      value: T;
      assumptions: string[];
    }
  | {
      status: "unavailable";
      message: string;
    };
