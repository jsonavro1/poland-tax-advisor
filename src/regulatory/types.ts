export type RegulatoryCheckMode = "quick" | "deep";

export type RegulatoryCheckStatus =
  | "VERIFIED_CURRENT"
  | "CHANGE_DETECTED"
  | "REVIEW_REQUIRED"
  | "APPROVED_PENDING_TESTS"
  | "ACTIVE"
  | "REJECTED"
  | "SOURCE_UNAVAILABLE";

export type RegulatorySource = {
  id: string;
  institution: string;
  category: string;
  url: string;
  deepOnly?: boolean;
};

export type RegulatoryCheckRequest = {
  mode: RegulatoryCheckMode;
  lastSuccessfulVerificationDate: string;
  sourceIds: string[];
  legalTopics: string[];
};

export type RegulatorySourceResult = {
  sourceId: string;
  status: "SOURCE_UNAVAILABLE";
  message: string;
};

export type RegulatoryUpdateReport = {
  mode: RegulatoryCheckMode;
  status: "SOURCE_UNAVAILABLE";
  retrievedAt: string;
  message: string;
  sources: RegulatorySourceResult[];
  candidateChanges: CandidateChange[];
};

export type CandidateChange = {
  ruleId: string;
  status: RegulatoryCheckStatus;
  sourceInstitution: string;
  sourceUrl: string;
  documentTitle: string;
  publicationDate: string | null;
  modificationDate: string | null;
  retrievedAt: string;
  affectedRuleIds: string[];
  existingStoredValue: string;
  proposedNewValue: string | null;
  legalBasis: string | null;
  effectiveDate: string | null;
  evidenceStrength: string;
  confidence: number;
  impactOnCalculations: string;
  implementationBlocking: boolean;
  recommendedHumanAction: string;
};

export type RuleMetadataSnapshot = {
  ruleId: string;
  value: string;
  unit: string;
  legalBasis: string;
  effectivePeriod: string;
  sourceUrl: string;
  contentFingerprint: string;
  publicationDate?: string | null;
  modificationDate?: string | null;
  retrievedAt?: string;
  pageTitle?: string;
};

export interface RegulatoryUpdateService {
  check(request: RegulatoryCheckRequest): Promise<RegulatoryUpdateReport>;
}
