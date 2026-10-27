# Poland Tax & Pension Advisor — Architecture

## Goals

Build a small, beginner-friendly web application that can be run locally in VS Code. The first version focuses on a guided questionnaire and transparent estimates. It has no server, database, account system, or AI dependency: calculations run in the browser using deterministic TypeScript functions and a locally stored, versioned set of rules.

The architecture keeps the user interface, financial calculations, rule data, and any future AI features separate. See [REQUIREMENTS.md](./REQUIREMENTS.md) for the product requirements.

## First-version technology

- **React** for the user interface.
- **TypeScript** for typed profile, rules, scenarios, and calculation results.
- **Vite** for a simple local development server and production build.
- **Vitest** for focused tests of deterministic calculation functions.
- **Git** for versioning code and changes to tax-rule data.

Use the standard Node.js package manager workflow selected when the project is scaffolded. Keep dependencies limited to what the first version needs.

## High-level design

```text
User
  |
  v
React application
  |-- Questionnaire and input validation
  |-- Results, scenarios, sources, and recommendations
  |
  v
Application orchestration
  |-- Selects applicable rule set
  |-- Calls deterministic calculation functions
  |-- Builds result and provenance data
  |
  +----------------------+
  |                      |
  v                      v
Calculation functions    Versioned rule data
                         (values, source URLs, effective dates)
```

In the first version, all of these pieces are part of one frontend project. Keep clear module boundaries so a backend or AI service could be added later without moving calculation logic into a language model.

## Suggested project structure

```text
src/
  app/
    App.tsx
    appState.ts
  components/
    Questionnaire/
      Questionnaire.tsx
      ProfileForm.tsx
    Results/
      ResultsPage.tsx
      MonthlyBreakdown.tsx
      AnnualSummary.tsx
      ScenarioComparison.tsx
      RetirementProjection.tsx
    Sources/
      SourceReferences.tsx
    Recommendations/
      Recommendations.tsx
    Disclaimer.tsx
  domain/
    profile.ts
    results.ts
    scenarios.ts
  rules/
    types.ts
    index.ts
    pl/
      2026.ts
  calculations/
    index.ts
    income.ts
    contributions.ts
    tax.ts
    pension.ts
    projections.ts
  services/
    calculateEstimate.ts
  test/
    calculations/
```

This is a proposed organization, not a requirement to create every file at once. Start with only the files needed for the first working questionnaire and estimate. Keep modules small and use plain TypeScript; do not introduce a framework for state management or data fetching until the application needs one.

## Main responsibilities

### Questionnaire

The questionnaire collects the profile described in the requirements, including income amount and gross/net basis, employment type, tax residency, labour-market access basis, age, marital status, number of children, and PPK/IKE/IKZE participation and inputs.

It should:

- Group related questions into a clear, reviewable flow.
- Validate required inputs and numeric ranges before calculation.
- Allow the user to see and correct their answers.
- Preserve the distinction between an unanswered value and a confirmed answer; do not silently fill unknown profile details with assumptions.
- Explain when an answer affects eligibility or which calculations can be shown.

The profile is application state in the first version. Do not persist sensitive profile information in browser storage by default.

### Calculation service

`calculateEstimate` is the boundary between the interface and the calculation modules. It receives a validated profile, a selected calculation period, and the applicable rule set. It returns a typed result containing calculated amounts, scenario results, assumptions, and references to the rules used.

Calculation modules are pure deterministic functions: identical inputs and rule versions produce identical outputs. They must not read from the DOM, make network calls, inspect current time implicitly, or call AI services. Pass any required period or assumptions explicitly. Keep currency precision and rounding behavior explicit and test it.

Tax, mandatory contributions, PPK, IKE, IKZE, and retirement projections should be separate concerns, even if early versions implement only a subset. Do not present incomplete calculations as complete results.

### Rule data and source references

Keep tax, ZUS, and pension rule values separate from calculation logic, in typed, version-controlled data modules under `src/rules/`. A rule record should include at least:

- A stable identifier and a human-readable description.
- The value or parameters used by calculations, with units where relevant.
- The applicable rule area and any relevant eligibility conditions.
- The effective start date and, when known, effective end date.
- The official source URL.
- A retrieval or verification date and a status indicating whether the source has been reviewed.

Use the rule set applicable to the selected calculation period, not merely the newest data in the repository. If no verified rule applies, return an explicit unavailable/uncertain result instead of substituting a guessed value. Keep source metadata attached to each rule so the interface can show which references support each result. A rule change should be reviewable as a normal code change, with its source and effective dates updated together.

### Results and explanations

The results view presents:

- Monthly tax and mandatory-contribution breakdown.
- Annual summary and estimated net income.
- Effective rate and the amounts used to derive it.
- PPK employee and employer contributions.
- IKE and IKZE scenarios.
- Projections for 1, 5, 10, 15, and 20 years.
- Side-by-side scenario comparisons.
- Potential legal optimization options, eligibility notes, and limitations.

Show calculation period, inputs, assumptions, and applicable rule references alongside the results. Clearly label user-provided facts, assumptions, and calculated estimates. Recommendations must be conditional and grounded in verified rules; do not imply that a user is eligible when eligibility is unknown. Show the estimate and professional-advice disclaimer prominently.

## Data flow

1. The user completes and reviews the questionnaire.
2. The application validates the profile and identifies missing or uncertain inputs.
3. The user selects or confirms the calculation period and any disclosed assumptions.
4. The calculation service selects rules whose effective dates cover that period.
5. Pure calculation functions produce typed monthly, annual, savings, and projection outputs.
6. The results interface renders amounts, assumptions, limitations, and the rule/source references used.
7. If required information or a verified applicable rule is unavailable, the application explains what cannot be estimated and why.

## Future AI agents

AI functionality is not required for the first version. If added later, keep it behind a separate service boundary, for example `services/ai/`, and do not give it authority to calculate, modify, or silently fill in financial values.

Potential future agent responsibilities:

- **Official-source research:** find relevant official Polish sources, extract candidate rule details, and propose source URLs, effective dates, and a concise change summary for human review. Research should be restricted to trusted official sources. Proposed rule changes must not become active until reviewed and approved, with a record of the source and effective period.
- **Result explanation:** explain already-computed results in plain language using the calculation output, disclosed assumptions, and rule/source references supplied by the application. The agent may clarify what a deterministic result means but must not change its values or invent missing facts.

AI output should be labeled as explanatory, grounded in traceable references, and treated as potentially fallible. If evidence is missing or conflicting, the agent should state that uncertainty and defer to the verified deterministic result or report that no reliable estimate is available. The application must continue to work when AI is disabled or unavailable.

## Local development and verification

Once the project is scaffolded, a beginner should be able to open the repository in VS Code, install the project dependencies, start the Vite development server, and open the local address it prints. The README should document the exact commands for the chosen package manager.

Before showing a calculation change, run the focused Vitest tests for its pure functions. Tests should cover representative employment types, gross/net handling, applicable rule periods, rounding, and unavailable or uncertain inputs as those features are implemented. The frontend build and TypeScript checks should also pass.

## Initial scope boundaries

The first version is a local, single-user web application. It does not need authentication, cloud storage, a database, online tax-rule synchronization, or AI. It must not claim comprehensive tax coverage until the relevant rule data, eligibility conditions, and deterministic calculations have been implemented and verified against official sources.
