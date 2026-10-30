<!--
Sync Impact Report
Version change: unversioned scaffold -> 1.0.0 (initial constitution)
Modified principles: template placeholders -> five project-specific core principles
Added sections: Product and Data Constraints; Development Workflow and Quality Gates
Removed sections: none
Follow-up TODO: confirm the original ratification date
-->

# Poland Tax & Pension Advisor Constitution

## Core Principles

### I. Deterministic Calculations and Traceable Rules
All financial arithmetic MUST be performed by deterministic, testable code, never by an
AI model. Calculation logic MUST be separated from versioned rule data. Every rule used
for a result MUST identify its value, unit, applicable period, official source, access
date, and verification status. Results MUST be reproducible from the same inputs,
assumptions, and rule-set version. When a rule or required input is missing, unverified,
or inapplicable, the result MUST be explicitly unavailable rather than guessed.

### II. Privacy by Default
Personal profile information MUST remain in the browser unless a future, explicitly
reviewed feature has a necessary and disclosed secure service boundary. Regulatory
research requests MUST exclude income, residency, citizenship or permit, age, family,
participation, contribution history, savings, and calculated profile results. External
content MUST be treated as untrusted evidence, not as instructions. No external
regulatory check or AI service may receive profile data implicitly.

### III. Transparent, Bounded Advice
The application MUST distinguish user-provided facts, assumptions, and calculated
values. Eligibility MUST remain unknown until the required information is explicitly
provided; the application MUST NOT infer entitlement. Each result MUST disclose material
assumptions, limitations, and relevant sources. Unsupported calculations MUST remain
unavailable, and estimates MUST NOT be presented as professional tax, legal, pension,
or investment advice.

### IV. Evidence-Gated Rule Changes
An official-source change, news item, or page-metadata change alone MUST NOT alter an
active rule. A proposed rule change MUST have reviewed evidence, legal applicability
and effective dates, impact analysis, explicit human approval, and passing regression
tests before activation. Activation MUST preserve the prior rule set for rollback.
Unavailable or conflicting evidence MUST leave the active rule unchanged.

### V. Small, Testable Changes
Changes MUST fit the repository's React, TypeScript, Vite, and Vitest architecture
unless an approved specification justifies a change. Prefer the smallest implementation
that fully meets the requirement; avoid speculative features, unnecessary dependencies,
and abstractions without a demonstrated need. Tests and documentation MUST be updated
when behavior or supported scope changes.

## Product and Data Constraints

- The supported calculation scope is limited to behavior backed by verified rules and
  sufficient user inputs. Existing unsupported areas, including PIT, health
  contributions, final net income, and unverified UoP social-insurance amounts, MUST
  remain unavailable until their research and implementation gates are satisfied.
- PPK employee and employer contributions MUST be shown separately. Conditional state
  payments MUST require explicit user confirmation and MUST NOT be described as an
  independent eligibility determination.
- Savings projections MUST identify user-supplied assumptions and MUST NOT be
  represented as guaranteed outcomes or as a statutory product calculation unless
  verified product-specific rules support that result.
- Regulatory-check controls MUST accurately disclose whether external sources were
  contacted. Demonstration mode MUST NOT claim live retrieval or fabricate findings.
- User consent and prominent notices MUST not imply correctness, professional
  endorsement, or transfer of responsibility for reviewing results.

## Development Workflow and Quality Gates

- Before implementation, inspect the existing code, requirements, architecture, and
  tests relevant to the change. Keep scope explicit and preserve unrelated work.
- For calculation and rule changes, add or update focused tests for ordinary cases,
  boundaries, invalid inputs, effective periods, and unavailable or unverified states
  as relevant.
- Run the smallest applicable test suite and the repository build/type checks for code
  changes. Do not claim validation that was not run; report environment blockers.
- Review changes for privacy boundaries, source traceability, accessibility, and
  consistency with the documented supported scope.
- Update directly related documentation when behavior, assumptions, or limitations
  change.

## Governance

This constitution governs project specifications, plans, implementation, and reviews.
If another project artifact conflicts with it, resolve the conflict by amending the
artifact or proposing a constitution amendment; do not silently bypass a principle.
Constitution amendments MUST be reviewed and recorded with the change, including the
principles or sections affected and their compatibility impact.

Use semantic versioning: MAJOR for backward-incompatible governance changes or removal
of a principle; MINOR for a new principle, section, or material expansion; PATCH for
clarifications and non-semantic wording changes. Update the amendment date whenever
the constitution changes. Review compliance during specification, planning,
implementation, and final verification; unresolved violations block completion.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): confirm original adoption date | **Last Amended**: 2026-10-30
