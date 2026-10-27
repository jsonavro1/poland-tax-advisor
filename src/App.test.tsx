import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import App, { ApprovalDialog, Results, isCalculationConsentGranted, type SubmittedProfile } from "./App";

describe("transparency and consent UI", () => {
  it("renders the prominent AI banner and complete footer notice", () => {
    const markup = renderToStaticMarkup(createElement(App));
    expect(markup).toContain(
      "AI-assisted application. Verify all calculations, sources, and effective dates before relying on the results.",
    );
    expect(markup).toContain(
      "AI Transparency Notice: This application was created, enhanced, and is maintained with AI assistance.",
    );
    expect(markup).toContain("at your own discretion and risk");
    expect(markup).toContain("does not provide professional tax, legal, pension, or investment advice.");
  });

  it("starts with consent unchecked and disables calculation until accepted", () => {
    const markup = renderToStaticMarkup(createElement(App));
    expect(markup).toContain('name="calculationConsent"');
    expect(markup).toContain('type="submit" disabled=""');
    expect(isCalculationConsentGranted(false)).toBe(false);
    expect(isCalculationConsentGranted(true)).toBe(true);
  });

  it("shows startup rule status and controls without initiating a check", () => {
    const markup = renderToStaticMarkup(createElement(App));
    expect(markup).toContain("pl-uop-2026-v2-ppk");
    expect(markup).toContain("2026-10-27");
    expect(markup).toContain("Skip update check");
    expect(markup).toContain("Quick check");
    expect(markup).toContain("Deep legal check");
    expect(markup).toContain("No regulatory update check was performed for this session.");
  });

  it("previews source categories, approval, and resource warnings before a check", () => {
    const markup = renderToStaticMarkup(
      createElement(ApprovalDialog, {
        mode: "deep",
        isChecking: false,
        onCancel: () => undefined,
        onApprove: () => undefined,
      }),
    );
    expect(markup).toContain("external web access");
    expect(markup).toContain("Relative resource level:</strong> High");
    expect(markup).toContain("Official individual and general tax interpretations");
    expect(markup).toContain("NSA and WSA judgments");
    expect(markup).toContain("Approve Deep legal check");
    expect(markup).toContain("Production rules will not be changed automatically");
  });

  it("provides accessible expandable transparency details with results", () => {
    const profile: SubmittedProfile = {
      monthlyIncome: 15_000,
      incomeType: "gross",
      employmentType: "uop",
      annualBaseUsed: null,
      ppkStatus: "participating",
      welcomeEligibility: "unknown",
      annualEligibility: "unknown",
      ikzeStatus: "",
      ikzeContribution: null,
      ikzeBusinessActivity: "",
      monthsRemaining: null,
      ikzeContributedToDate: null,
      savingsContribution: null,
      annualReturnPercent: null,
    };
    const markup = renderToStaticMarkup(
      createElement(Results, { profile, updateMessage: "No check performed" }),
    );
    expect(markup).toContain("<summary>AI transparency and limitations</summary>");
    expect(markup).toContain("Live regulatory retrieval and AI explanations are not available");
    expect(markup).toContain("300,00");
    expect(markup).toContain("225,00");
    expect(markup).toContain("2% of gross remuneration");
    expect(markup).not.toContain("0.02%");
    expect(markup).toContain("Eligibility requires verification");
  });
});
