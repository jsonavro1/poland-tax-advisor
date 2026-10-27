import type { CalculationResult, VerifiedRule } from "../rules/types";

export type SocialInsuranceRates = {
  pension: VerifiedRule<number>;
  disability: VerifiedRule<number>;
  sickness: VerifiedRule<number>;
  annualCeiling: VerifiedRule<number>;
};

function assertNonNegativeFinite(value: number, label: string) {
  if (!Number.isFinite(value) || value < 0) {
    throw new RangeError(`${label} must be a finite, non-negative number.`);
  }
}

function roundToGrosz(value: number) {
  const rounded = Math.round((value + Number.EPSILON) * 100) / 100;
  if (!Number.isFinite(rounded)) {
    throw new RangeError("Calculated amount exceeds supported currency precision.");
  }
  return rounded;
}

function unavailable<T>(message: string): CalculationResult<T> {
  return { status: "unavailable", message };
}

function contribution(
  monthlyGross: number,
  rate: VerifiedRule<number> | undefined,
  name: string,
): CalculationResult<number> {
  assertNonNegativeFinite(monthlyGross, "Monthly gross income");
  if (!rate) {
    return unavailable(`${name} is unavailable until its rule is verified.`);
  }
  if (rate.unit !== "fraction") {
    throw new RangeError(`${name} rule must use the fraction unit.`);
  }
  if (!Number.isFinite(rate.value) || rate.value < 0 || rate.value > 1) {
    throw new RangeError(`${name} rule must be a fraction between 0 and 1.`);
  }
  return {
    status: "available",
    value: roundToGrosz(monthlyGross * rate.value),
    assumptions: ["The supplied verified contribution rate applies to the full monthly gross base."],
  };
}

export function calculateEmployeeSocialInsurance(
  monthlyGross: number,
  annualBaseUsedBeforeMonth: number | undefined,
  taxYear: number,
  rates?: SocialInsuranceRates,
): CalculationResult<{
  pension: number;
  disability: number;
  sickness: number;
  total: number;
}> {
  assertNonNegativeFinite(monthlyGross, "Monthly gross income");
  if (!rates) {
    return unavailable(
      "Employee social-insurance rates are unavailable until verified. The year-to-date contribution base is also required to apply the annual ceiling.",
    );
  }
  if (annualBaseUsedBeforeMonth === undefined) {
    return unavailable(
      "The year-to-date pension/disability contribution base is required to apply the annual ceiling.",
    );
  }
  assertNonNegativeFinite(annualBaseUsedBeforeMonth, "Annual contribution base already used");
  if (
    rates.pension.taxYear !== taxYear ||
    rates.disability.taxYear !== taxYear ||
    rates.sickness.taxYear !== taxYear ||
    rates.annualCeiling.taxYear !== taxYear
  ) {
    return unavailable(`No complete verified employee social-insurance rule set is available for ${taxYear}.`);
  }
  if (rates.annualCeiling.unit !== "PLN per calendar year") {
    throw new RangeError("The annual contribution ceiling must use PLN per calendar year.");
  }
  if (!Number.isFinite(rates.annualCeiling.value) || rates.annualCeiling.value < 0) {
    throw new RangeError("The annual contribution ceiling must be non-negative.");
  }

  const cappedBase = Math.max(
    0,
    Math.min(
      monthlyGross,
      rates.annualCeiling.value - annualBaseUsedBeforeMonth,
    ),
  );
  const pension = contribution(cappedBase, rates.pension, "Employee pension contribution");
  const disability = contribution(
    cappedBase,
    rates.disability,
    "Employee disability contribution",
  );
  const sickness = contribution(monthlyGross, rates.sickness, "Employee sickness contribution");
  if (
    pension.status === "unavailable" ||
    disability.status === "unavailable" ||
    sickness.status === "unavailable"
  ) {
    return unavailable(
      "Employee social-insurance rates are unavailable until verified.",
    );
  }

  return {
    status: "available",
    value: {
      pension: pension.value,
      disability: disability.value,
      sickness: sickness.value,
      total: roundToGrosz(pension.value + disability.value + sickness.value),
    },
    assumptions: [
      "The entered gross income is an ordinary monthly UoP contribution base.",
      "The annual pension/disability ceiling already used was provided by the user.",
      "Sickness contributions are not limited by the annual pension/disability ceiling.",
    ],
  };
}

export function calculatePpkEmployeeContribution(
  monthlyPpkBase: number,
  taxYear: number,
  verifiedRate?: VerifiedRule<number>,
): CalculationResult<number> {
  if (verifiedRate && verifiedRate.taxYear !== taxYear) {
    return unavailable(`No verified PPK employee rate is available for ${taxYear}.`);
  }
  return contribution(monthlyPpkBase, verifiedRate, "PPK employee contribution");
}

export function calculatePpkEmployerContribution(
  monthlyPpkBase: number,
  taxYear: number,
  verifiedRate?: VerifiedRule<number>,
): CalculationResult<number> {
  if (verifiedRate && verifiedRate.taxYear !== taxYear) {
    return unavailable(`No verified PPK employer rate is available for ${taxYear}.`);
  }
  return contribution(monthlyPpkBase, verifiedRate, "PPK employer contribution");
}

export function calculatePpkStateContribution(
  participantIsEligible: boolean | undefined,
  taxYear: number,
  verifiedPayment?: VerifiedRule<number>,
): CalculationResult<number> {
  if (participantIsEligible === undefined) {
    return unavailable("PPK state-payment eligibility is not established.");
  }
  if (!participantIsEligible) {
    return {
      status: "available",
      value: 0,
      assumptions: ["The participant was explicitly confirmed as ineligible."],
    };
  }
  if (!verifiedPayment) {
    return unavailable("PPK state-payment rules are unavailable until verified.");
  }
  if (verifiedPayment.taxYear !== taxYear) {
    return unavailable(`No verified PPK state-payment rule is available for ${taxYear}.`);
  }
  if (verifiedPayment.unit !== "PLN") {
    throw new RangeError("PPK state payment must use PLN.");
  }
  assertNonNegativeFinite(verifiedPayment.value, "PPK state payment");
  return {
    status: "available",
    value: roundToGrosz(verifiedPayment.value),
    assumptions: ["Participant-specific eligibility was confirmed."],
  };
}

export function calculateIkzeContributionProjection(
  monthlyContribution: number,
  monthsRemainingInYear: number,
  alreadyContributedThisYear: number,
  annualLimit: VerifiedRule<number>,
  taxYear: number,
): CalculationResult<{
  plannedContribution: number;
  allowedAdditionalContribution: number;
  projectedYearTotal: number;
}> {
  assertNonNegativeFinite(monthlyContribution, "Monthly IKZE contribution");
  assertNonNegativeFinite(alreadyContributedThisYear, "IKZE contributions already made");
  if (!Number.isInteger(monthsRemainingInYear) || monthsRemainingInYear < 0 || monthsRemainingInYear > 12) {
    throw new RangeError("Months remaining in the year must be an integer from 0 to 12.");
  }
  if (!Number.isFinite(annualLimit.value) || annualLimit.value < 0) {
    throw new RangeError("The IKZE annual limit must be non-negative.");
  }
  if (annualLimit.unit !== "PLN per calendar year") {
    throw new RangeError("The IKZE annual limit must use PLN per calendar year.");
  }
  if (annualLimit.taxYear !== taxYear) {
    return unavailable(`No verified IKZE annual limit is available for ${taxYear}.`);
  }
  if (alreadyContributedThisYear > annualLimit.value) {
    return unavailable(
      "Reported contributions already exceed the verified annual limit; confirm the personal contribution history before projecting.",
    );
  }

  const remainingLimit = Math.max(0, annualLimit.value - alreadyContributedThisYear);
  const plannedContribution = roundToGrosz(monthlyContribution * monthsRemainingInYear);
  const allowedAdditionalContribution = roundToGrosz(
    Math.min(plannedContribution, remainingLimit),
  );
  return {
    status: "available",
    value: {
      plannedContribution,
      allowedAdditionalContribution,
      projectedYearTotal: roundToGrosz(
        alreadyContributedThisYear + allowedAdditionalContribution,
      ),
    },
    assumptions: [
      `The verified ${taxYear} general IKZE limit applies; no higher business-activity limit is assumed.`,
      "The user-provided contributions-to-date and months remaining are accurate.",
      "This is a contribution-limit scenario, not a tax-saving or investment-return estimate.",
    ],
  };
}

export type SavingsProjection = {
  years: number;
  contributions: number;
  projectedBalance: number;
};

export function projectMonthlySavings(
  monthlyContribution: number,
  annualReturnPercent: number,
  years: number,
): CalculationResult<SavingsProjection> {
  assertNonNegativeFinite(monthlyContribution, "Monthly savings contribution");
  if (!Number.isFinite(annualReturnPercent) || annualReturnPercent <= -100 || annualReturnPercent > 100) {
    throw new RangeError("Annual return assumption must be greater than -100% and no more than 100%.");
  }
  if (![1, 5, 10, 15, 20].includes(years)) {
    throw new RangeError("Projection period must be 1, 5, 10, 15, or 20 years.");
  }

  const monthlyRate = (1 + annualReturnPercent / 100) ** (1 / 12) - 1;
  let projectedBalance = 0;
  const months = years * 12;
  for (let month = 0; month < months; month += 1) {
    projectedBalance = (projectedBalance + monthlyContribution) * (1 + monthlyRate);
  }

  return {
    status: "available",
    value: {
      years,
      contributions: roundToGrosz(monthlyContribution * months),
      projectedBalance: roundToGrosz(projectedBalance),
    },
    assumptions: [
      "The starting balance is PLN 0; existing account balances are excluded.",
      "The same contribution is deposited at each month-end.",
      "The user-entered annual return is treated as an effective rate and converted to a monthly rate.",
      "Fees, inflation, taxes, and future statutory contribution limits are not modelled.",
    ],
  };
}
