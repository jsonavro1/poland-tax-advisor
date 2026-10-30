import type {
  CandidateChange,
  RegulatoryCheckMode,
  RegulatoryCheckRequest,
  RegulatoryCheckStatus,
  RegulatorySource,
  RuleMetadataSnapshot,
  RegulatoryUpdateService,
} from "./types";

export const REGULATORY_SOURCES: RegulatorySource[] = [
  {
    id: "mf-tax-news",
    institution: "Ministry of Finance / podatki.gov.pl",
    category: "Tax news",
    url: "https://www.podatki.gov.pl/aktualnosci/",
  },
  {
    id: "pit-rates",
    institution: "Ministry of Finance / podatki.gov.pl",
    category: "PIT rates and limits",
    url: "https://www.podatki.gov.pl/podatki-osobiste/pit/stawki-i-limity",
  },
  {
    id: "employment-income",
    institution: "Ministry of Finance / podatki.gov.pl",
    category: "Employment-income guidance",
    url: "https://www.podatki.gov.pl/podatki-osobiste/pit/informacje-podstawowe/co-jest-opodatkowane/dochody-z-pracy",
  },
  {
    id: "official-tax-guidance",
    institution: "Ministry of Finance / podatki.gov.pl",
    category: "Relevant official tax guidance",
    url: "https://www.podatki.gov.pl/podatki-osobiste/",
  },
  {
    id: "mf-gov-information",
    institution: "Ministry of Finance / gov.pl",
    category: "Ministry of Finance information",
    url: "https://www.gov.pl/web/finanse",
  },
  {
    id: "zus-news",
    institution: "Social Insurance Institution (ZUS)",
    category: "Official news",
    url: "https://www.zus.pl/o-zus/aktualnosci",
  },
  {
    id: "zus-rates",
    institution: "Social Insurance Institution (ZUS)",
    category: "Contribution rates and indicators",
    url: "https://www.zus.pl/baza-wiedzy/skladki-wskazniki-odsetki/skladki",
  },
  {
    id: "zus-employees",
    institution: "Social Insurance Institution (ZUS)",
    category: "Employee-insurance guidance",
    url: "https://www.zus.pl/",
  },
  {
    id: "mojeppk-guidance",
    institution: "PFR Portal PPK / MojePPK",
    category: "Official PPK guidance and news",
    url: "https://www.mojeppk.pl/faq.html",
  },
  {
    id: "journal-of-laws",
    institution: "Dziennik Ustaw / ELI",
    category: "Relevant new acts, amendments, and consolidated legal texts",
    url: "https://dziennikustaw.gov.pl/",
  },
  {
    id: "eureka",
    institution: "Ministry of Finance / EUREKA",
    category: "Official individual and general tax interpretations, where technically and legally accessible",
    url: "https://eureka.mf.gov.pl/",
    deepOnly: true,
  },
  {
    id: "administrative-courts",
    institution: "Supreme Administrative Court / provincial administrative courts",
    category: "Relevant NSA and WSA judgments",
    url: "https://orzeczenia.nsa.gov.pl/",
    deepOnly: true,
  },
];

export const REGULATORY_MODES: Record<
  RegulatoryCheckMode,
  { resourceLevel: "Medium" | "High"; estimatedCategories: string[] }
> = {
  quick: {
    resourceLevel: "Medium",
    estimatedCategories: REGULATORY_SOURCES.filter((source) => !source.deepOnly).map(
      (source) => source.category,
    ),
  },
  deep: {
    resourceLevel: "High",
    estimatedCategories: REGULATORY_SOURCES.map((source) => source.category),
  },
};

const QUICK_SOURCE_IDS = REGULATORY_SOURCES.filter((source) => !source.deepOnly).map(
  (source) => source.id,
);

export function createRegulatoryCheckRequest(
  mode: RegulatoryCheckMode,
  lastSuccessfulVerificationDate: string,
): RegulatoryCheckRequest {
  return {
    mode,
    lastSuccessfulVerificationDate,
    sourceIds:
      mode === "quick" ? [...QUICK_SOURCE_IDS] : REGULATORY_SOURCES.map((source) => source.id),
    legalTopics: [
      "Polish PIT and tax rules",
      "UoP social-insurance contributions",
      "PPK contributions and state payments",
      "IKE, IKZE, and pension rules",
      "employment rules",
    ],
  };
}

export function createDemonstrationRegulatoryUpdateService(): RegulatoryUpdateService {
  return {
    async check(request) {
      const requestedSources = REGULATORY_SOURCES.filter((source) =>
        request.sourceIds.includes(source.id),
      );
      return {
        mode: request.mode,
        status: "SOURCE_UNAVAILABLE",
        retrievedAt: new Date().toISOString(),
        message:
          "Demonstration mode — secure backend connection required. No external sources were contacted, so no updates or candidate changes were retrieved.",
        sources: requestedSources.map((source) => ({
          sourceId: source.id,
          status: "SOURCE_UNAVAILABLE",
          message: "Live retrieval is not implemented in this frontend-only application.",
        })),
        candidateChanges: [],
      };
    },
  };
}

export function skipRegulatoryCheckMessage() {
  return "No regulatory update check was performed for this session.";
}

const allowedTransitions: Record<RegulatoryCheckStatus, RegulatoryCheckStatus[]> = {
  VERIFIED_CURRENT: ["CHANGE_DETECTED", "SOURCE_UNAVAILABLE"],
  CHANGE_DETECTED: ["REVIEW_REQUIRED", "REJECTED", "SOURCE_UNAVAILABLE"],
  REVIEW_REQUIRED: ["APPROVED_PENDING_TESTS", "REJECTED", "SOURCE_UNAVAILABLE"],
  APPROVED_PENDING_TESTS: ["ACTIVE", "REJECTED", "SOURCE_UNAVAILABLE"],
  ACTIVE: ["CHANGE_DETECTED", "SOURCE_UNAVAILABLE"],
  REJECTED: [],
  SOURCE_UNAVAILABLE: [],
};

export function transitionCandidateStatus(
  current: RegulatoryCheckStatus,
  next: RegulatoryCheckStatus,
  controls: { humanApproved?: boolean; regressionTestsPassed?: boolean } = {},
): RegulatoryCheckStatus {
  if (!Object.prototype.hasOwnProperty.call(allowedTransitions, current)) {
    throw new Error(`Candidate status ${current} is not recognized.`);
  }
  if (!allowedTransitions[current].includes(next)) {
    throw new Error(`Candidate status cannot transition from ${current} to ${next}.`);
  }
  if (next === "ACTIVE" && !controls.humanApproved) {
    throw new Error("Explicit human approval is required before activation.");
  }
  if (next === "ACTIVE" && !controls.regressionTestsPassed) {
    throw new Error("Passing regression tests are required before activation.");
  }
  return next;
}

export function activateCandidateRuleSet<T>(
  previousRuleSet: T,
  proposedRuleSet: T,
  candidate: CandidateChange,
  controls: { humanApproved: boolean; regressionTestsPassed: boolean },
): { activeRuleSet: T; rollbackRuleSet: T; candidateStatus: RegulatoryCheckStatus } {
  const candidateStatus = transitionCandidateStatus(candidate.status, "ACTIVE", controls);
  return {
    activeRuleSet: proposedRuleSet,
    rollbackRuleSet: previousRuleSet,
    candidateStatus,
  };
}

export function canApplyRegulatoryUpdate(status: RegulatoryCheckStatus) {
  return status === "ACTIVE";
}

export function compareRuleMetadata(
  stored: RuleMetadataSnapshot,
  current: RuleMetadataSnapshot,
) {
  const fields: Array<keyof Pick<
    RuleMetadataSnapshot,
    "value" | "unit" | "legalBasis" | "effectivePeriod" | "sourceUrl" | "contentFingerprint"
  >> = ["value", "unit", "legalBasis", "effectivePeriod", "sourceUrl", "contentFingerprint"];
  return fields
    .filter((field) => stored[field] !== current[field])
    .map((field) => ({
      field,
      previousValue: stored[field],
      currentValue: current[field],
    }));
}

export type {
  CandidateChange,
  RegulatoryCheckMode,
  RegulatoryCheckRequest,
  RegulatoryCheckStatus,
  RegulatorySource,
  RegulatoryUpdateReport,
  RegulatoryUpdateService,
  RuleMetadataSnapshot,
} from "./types";
