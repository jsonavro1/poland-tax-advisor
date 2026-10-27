export type RuleVerificationStatus =
  | "VERIFIED_CURRENT"
  | "CHANGE_DETECTED"
  | "REVIEW_REQUIRED"
  | "APPROVED_PENDING_TESTS"
  | "ACTIVE"
  | "REJECTED"
  | "SOURCE_UNAVAILABLE";

export type VerifiedRule<T> = {
  id: string;
  legalBasis: string;
  value: T;
  unit: string;
  taxYear: number;
  effectivePeriod: string;
  effectiveFrom: string;
  effectiveTo?: string;
  sourceUrl: string;
  accessedAt: string;
  verificationStatus: RuleVerificationStatus;
};

export type RuleSet = {
  version: string;
  taxYear: number;
  lastSuccessfulVerificationDate: string;
  sourcesCovered: string[];
  socialInsuranceAnnualCeiling: VerifiedRule<number>;
  ikzeAnnualContributionLimit: VerifiedRule<number>;
  ppkEmployeeBasicContribution: VerifiedRule<number>;
  ppkEmployerBasicContribution: VerifiedRule<number>;
  ppkWelcomePayment: VerifiedRule<number>;
  ppkAnnualStatePayment: VerifiedRule<number>;
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
