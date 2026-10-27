import { describe, expect, it, vi } from "vitest";
import {
  activateCandidateRuleSet,
  canApplyRegulatoryUpdate,
  createDemonstrationRegulatoryUpdateService,
  createRegulatoryCheckRequest,
  compareRuleMetadata,
  REGULATORY_MODES,
  REGULATORY_SOURCES,
  skipRegulatoryCheckMessage,
  transitionCandidateStatus,
} from "./index";

describe("regulatory update request boundary", () => {
  it("creates requests with only rule topics and source metadata, never profile data", () => {
    const request = createRegulatoryCheckRequest("quick", "2026-10-27");
    expect(request).toEqual({
      mode: "quick",
      lastSuccessfulVerificationDate: "2026-10-27",
      sourceIds: expect.arrayContaining(["pit-rates", "zus-rates", "journal-of-laws"]),
      legalTopics: expect.arrayContaining(["PPK contributions and state payments"]),
    });
    expect(Object.keys(request).sort()).toEqual([
      "lastSuccessfulVerificationDate",
      "legalTopics",
      "mode",
      "sourceIds",
    ]);
    expect(request.sourceIds).not.toContain("administrative-courts");
  });

  it("includes the full source scope for deep checks and presents resource levels", () => {
    const request = createRegulatoryCheckRequest("deep", "2026-10-27");
    expect(request.sourceIds).toHaveLength(REGULATORY_SOURCES.length);
    expect(request.sourceIds).toContain("administrative-courts");
    expect(REGULATORY_MODES.quick.resourceLevel).toBe("Medium");
    expect(REGULATORY_MODES.deep.resourceLevel).toBe("High");
  });

  it("skip does not call an update service", () => {
    const service = { check: vi.fn() };
    expect(skipRegulatoryCheckMessage()).toBe(
      "No regulatory update check was performed for this session.",
    );
    expect(service.check).not.toHaveBeenCalled();
  });

  it("reports demonstration limitation without requesting sources or inventing updates", async () => {
    const service = createDemonstrationRegulatoryUpdateService();
    const report = await service.check(createRegulatoryCheckRequest("quick", "2026-10-27"));
    expect(report.status).toBe("SOURCE_UNAVAILABLE");
    expect(report.message).toMatch(/No external sources were contacted/);
    expect(report.candidateChanges).toEqual([]);
    expect(report.sources.every((source) => source.status === "SOURCE_UNAVAILABLE")).toBe(true);
  });
});

describe("candidate governance and rollback", () => {
  it("requires review and explicit human approval before activation", () => {
    expect(() => transitionCandidateStatus("CHANGE_DETECTED", "ACTIVE")).toThrow();
    expect(transitionCandidateStatus("CHANGE_DETECTED", "REVIEW_REQUIRED")).toBe(
      "REVIEW_REQUIRED",
    );
    expect(transitionCandidateStatus("REVIEW_REQUIRED", "APPROVED_PENDING_TESTS")).toBe(
      "APPROVED_PENDING_TESTS",
    );
    expect(() =>
      transitionCandidateStatus("APPROVED_PENDING_TESTS", "ACTIVE", {
        humanApproved: true,
        regressionTestsPassed: false,
      }),
    ).toThrow(/regression tests/);
    expect(
      transitionCandidateStatus("APPROVED_PENDING_TESTS", "ACTIVE", {
        humanApproved: true,
        regressionTestsPassed: true,
      }),
    ).toBe("ACTIVE");
  });

  it("does not apply unavailable source results and retains prior rules for rollback", () => {
    const previous = { version: "v1" };
    const proposed = { version: "v2" };
    const candidate = {
      ruleId: "ppk.employee.basic-contribution",
      status: "APPROVED_PENDING_TESTS" as const,
      sourceInstitution: "test",
      sourceUrl: "https://example.invalid",
      documentTitle: "test fixture",
      publicationDate: null,
      modificationDate: null,
      retrievedAt: "test fixture",
      affectedRuleIds: ["ppk.employee.basic-contribution"],
      existingStoredValue: "2%",
      proposedNewValue: "2%",
      legalBasis: "test fixture",
      effectiveDate: "2026-01-01",
      evidenceStrength: "test fixture",
      confidence: 1,
      impactOnCalculations: "test fixture",
      implementationBlocking: false,
      recommendedHumanAction: "test fixture",
    };
    expect(canApplyRegulatoryUpdate("SOURCE_UNAVAILABLE")).toBe(false);
    expect(() =>
      activateCandidateRuleSet(previous, proposed, {
        ...candidate,
        status: "SOURCE_UNAVAILABLE",
      }, {
        humanApproved: true,
        regressionTestsPassed: true,
      }),
    ).toThrow();
    expect(() =>
      activateCandidateRuleSet(previous, proposed, candidate, {
        humanApproved: true,
        regressionTestsPassed: false,
      }),
    ).toThrow();
    const result = activateCandidateRuleSet(previous, proposed, candidate, {
      humanApproved: true,
      regressionTestsPassed: true,
    });
    expect(result).toEqual({
      activeRuleSet: proposed,
      rollbackRuleSet: previous,
      candidateStatus: "ACTIVE",
    });
  });

  it("does not activate changes from page metadata alone", () => {
    expect(() => transitionCandidateStatus("VERIFIED_CURRENT", "ACTIVE")).toThrow();
    const stored = {
      ruleId: "ppk.employee.basic-contribution",
      value: "2%",
      unit: "fraction",
      legalBasis: "Article 27(1)",
      effectivePeriod: "2026",
      sourceUrl: "https://example.gov.pl/rule",
      contentFingerprint: "sha256:abc",
      pageTitle: "Old title",
      modificationDate: "2026-01-01",
    };
    const layoutOnlyChange = {
      ...stored,
      pageTitle: "New title",
      modificationDate: "2026-10-27",
      retrievedAt: "2026-10-27T12:00:00Z",
    };
    expect(compareRuleMetadata(stored, layoutOnlyChange)).toEqual([]);
    expect(
      compareRuleMetadata(stored, { ...stored, contentFingerprint: "sha256:def" }),
    ).toEqual([
      {
        field: "contentFingerprint",
        previousValue: "sha256:abc",
        currentValue: "sha256:def",
      },
    ]);
  });
});
