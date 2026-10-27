# Product Development Backlog

This backlog translates [REQUIREMENTS.md](./REQUIREMENTS.md) and [ARCHITECTURE.md](./ARCHITECTURE.md) into epics, user stories, and verifiable acceptance criteria.

## Current application baseline

The repository currently contains a React, TypeScript, and Vite frontend with a responsive profile questionnaire. It collects core income and personal details and provides optional PPK, IKE, and IKZE participation and contribution fields. Submitting the form only displays a notice; there are no tax rules, calculation functions, result views, automated tests, or AI features yet.

## Priority definitions

- **MVP** — The initial reliable UoP experience: official-source-backed rules, deterministic tax and contribution calculations, monthly and annual results, PPK, IKZE, retirement projections, validation, tests, and essential safety disclosures.
- **Phase 2** — Extend the verified calculation and results experience to Umowa Zlecenie and B2B, and add IKE.
- **Future** — Capabilities that are not needed to deliver the initial estimation workflow, including AI assistance and optional product enhancements.

Stories are ordered within each phase approximately by dependency. A story may be split into smaller implementation tasks when work begins.

## MVP

### Epic MVP-1 — Establish a verified UoP rule set

**Goal:** Research the official rules needed for the initial UoP estimate, then store reviewed rule data separately from calculation code.

#### Story MVP-1.1 — Research official Polish tax rules

**As a** product maintainer, **I want** to research official Polish personal income tax rules applicable to UoP, **so that** the MVP calculations use verified rules for a clearly identified period.

**Acceptance criteria**

- Research uses official Polish government or other authoritative public-sector sources relevant to the specific rule.
- The research records the official source URL, rule description, applicability and eligibility conditions, effective start and end dates when available, and date checked.
- Any interpretation that remains uncertain, conflicting, or out of scope is recorded as unresolved rather than converted into a presumed rule.
- A reviewer can trace each proposed tax value or condition back to its source.

#### Story MVP-1.2 — Research ZUS rules for UoP

**As a** product maintainer, **I want** to research the mandatory ZUS contributions applicable to UoP, **so that** contribution estimates use verified rules and conditions.

**Acceptance criteria**

- Research covers the contribution types and UoP conditions required by the MVP calculation scope.
- Each researched rule has an official source URL, effective date range, applicability notes, and verification date.
- Relevant exceptions, eligibility limits, and interactions are documented or explicitly marked unresolved.
- No value is inferred when an official source or applicable rule has not been verified.

#### Story MVP-1.3 — Research PPK rules

**As a** product maintainer, **I want** to research official PPK contribution and eligibility rules, **so that** employee and employer contribution estimates can be traced to current applicable sources.

**Acceptance criteria**

- Research identifies official sources and applicable rules for the MVP's supported PPK calculations.
- Rates, conditions, and effective dates are recorded with their official source URLs and verification dates.
- Optional, reduced, or otherwise conditional contributions are not treated as universal.
- Unresolved eligibility or rule details are made visible as limitations and are not guessed.

#### Story MVP-1.4 — Research IKZE rules

**As a** product maintainer, **I want** to research official IKZE rules relevant to contributions and tax treatment, **so that** the MVP's IKZE scenario is grounded in verifiable sources.

**Acceptance criteria**

- Research records the official sources, applicable effective dates, contribution-limit rules, eligibility conditions, and relevant tax treatment needed for the selected MVP scope.
- Annual limits are associated with the applicable year or period.
- Any calculation inputs or tax consequences that depend on a user's circumstances are identified.
- Unverified interpretation or eligibility is documented as unknown, not presented as a confirmed benefit.

#### Story MVP-1.5 — Store reviewed rules with source and effective-date metadata

**As a** maintainer, **I want** each researched tax, ZUS, PPK, and IKZE rule stored as separate typed, version-controlled data, **so that** calculations can select and display the correct rule set for a period.

**Acceptance criteria**

- Rule values and metadata live separately from deterministic calculation functions.
- Each rule record has a stable identifier, description, rule area, value and units or parameters, eligibility/applicability information, effective start date, effective end date when known, official source URL, verification date, and review status.
- Rule sets can be selected by calculation period; a newer record is not silently applied to an earlier period.
- A rule with no verified applicable source or effective period is not used as if confirmed.
- Every result can identify the exact rule records and source references used.
- Updates to rule values include the corresponding source and effective-date metadata in the same reviewable change.

### Epic MVP-2 — Validate the UoP questionnaire and calculation inputs

**Goal:** Collect enough information for an explicitly scoped UoP estimate, preserve unknowns, and prevent invalid inputs from reaching the calculation engine.

#### Story MVP-2.1 — Complete and validate the UoP profile

**As a** person working in Poland under UoP, **I want** to enter and review the profile information needed by the supported calculations, **so that** the estimate is based on my answers rather than inferred details.

**Acceptance criteria**

- The questionnaire captures monthly income in PLN, gross or net basis, UoP employment type, Polish tax residency, age, marital status, number of children, and PPK and IKZE information needed for their supported scenarios.
- Inputs required for a supported calculation are identified before calculation; unknown or unanswered information remains distinguishable from a confirmed answer.
- Numeric fields reject invalid negative values and invalid formats; age and child-count limits are validated.
- Conditional questions are shown when needed, with their relevance explained.
- Users can review and correct their answers before calculation.
- The initial supported calculation is explicitly limited to UoP; selecting Umowa Zlecenie or B2B does not imply those calculations are available.

#### Story MVP-2.2 — Report missing inputs and unsupported cases

**As a** user, **I want** to know when required details or verified rules are missing, **so that** I do not mistake an incomplete estimate for a complete one.

**Acceptance criteria**

- The application identifies the missing input or unsupported case and states which result it affects.
- It does not silently substitute default profile facts, tax rules, or eligibility.
- A result that cannot be reliably produced is marked unavailable with a plain-language reason.
- Partial results clearly identify what is included and excluded.

### Epic MVP-3 — Build the deterministic UoP calculation engine

**Goal:** Produce reproducible UoP tax, contribution, PPK, IKZE, and projection outputs from validated inputs and applicable reviewed rules.

#### Story MVP-3.1 — Implement the deterministic calculation engine

**As a** user, **I want** my supported financial estimates calculated consistently from my inputs and the applicable rule set, **so that** the results are reproducible and not invented by AI.

**Acceptance criteria**

- Tax, mandatory-contribution, PPK, IKZE, and projection calculations are deterministic functions separate from React components and any AI functionality.
- The calculation service receives the profile, explicit calculation period, disclosed assumptions, and selected rule set as inputs.
- Identical inputs, assumptions, and rule versions produce identical results.
- Calculation functions do not call AI, use network responses, read implicit current time, or silently fetch changing rules.
- Currency precision and rounding points are explicit and tested.
- Output identifies its calculation period, input basis, assumptions, limitations, and rule references.
- If an applicable verified rule is absent or the profile is outside supported conditions, the engine returns an explicit unavailable/uncertain result rather than a guessed amount.

#### Story MVP-3.2 — Calculate UoP taxes and mandatory contributions

**As a** UoP user, **I want** an estimate of my taxes and mandatory contributions, **so that** I can understand the components affecting my income.

**Acceptance criteria**

- The estimate covers only verified UoP tax and mandatory-contribution rules in the supported period.
- Gross-income input is supported for the declared MVP scope.
- Net-income input is supported only if a deterministic, tested method and verified rules allow a reliable gross-up; otherwise the application explains that this calculation is unavailable rather than guessing.
- The output distinguishes each supported tax or contribution item and shows the calculation basis.
- Unsupported personal circumstances or unresolved rule interactions are stated as limitations.

#### Story MVP-3.3 — Calculate PPK employee and employer contributions

**As a** user, **I want** supported PPK contribution amounts shown separately, **so that** I can understand employee and employer contributions in the estimate.

**Acceptance criteria**

- Employee and employer amounts are calculated using the applicable reviewed PPK rules and relevant user-provided participation inputs.
- The result labels the calculation period and the rule/source references used.
- Participation, contribution choices, and eligibility conditions that affect the outcome are disclosed.
- Employer contributions are not presented as employee take-home pay; the UI explains their relationship to the estimate.
- Unknown eligibility or missing contribution choices are not silently assumed.

#### Story MVP-3.4 — Calculate IKZE scenarios

**As a** user, **I want** to compare a supported IKZE contribution scenario with my baseline, **so that** I can understand its estimated effect under disclosed assumptions.

**Acceptance criteria**

- The user-provided or explicitly selected contribution amount is checked against the applicable verified limit for the selected period.
- The scenario uses only researched IKZE rules and shows the source, effective period, and eligibility assumptions.
- The baseline and IKZE scenario use the same profile and rule-set version except for the stated IKZE input.
- Estimated effects are not guaranteed outcomes, and unsupported eligibility is not implied.
- If the contribution amount, applicable limit, or required tax detail is unavailable, the application explains which part cannot be estimated.

#### Story MVP-3.5 — Project retirement savings at required horizons

**As a** user, **I want** retirement-savings projections at 1, 5, 10, 15, and 20 years, **so that** I can compare how a disclosed contribution scenario changes over time.

**Acceptance criteria**

- Results include all five required horizons.
- Projected contributions, PPK, and IKZE components are labeled separately where supported.
- The projection states its contribution schedule and every assumption that affects it.
- The application does not invent an investment return, fee, inflation rate, or contribution increase; assumptions must be explicitly supplied or the projection must be presented as a contribution-only projection.
- Results clearly state that projections are scenarios, not guaranteed balances.
- Tests cover each horizon and contribution-only behavior.

### Epic MVP-4 — Present traceable monthly and annual results

**Goal:** Show users understandable UoP results, scenario comparisons, official references, assumptions, and limitations.

#### Story MVP-4.1 — Present monthly breakdown and annual summary

**As a** user, **I want** monthly and annual UoP results, **so that** I can understand both a typical month and the selected year's totals.

**Acceptance criteria**

- Results include the supported monthly breakdown, estimated net income, and an annual summary for the selected calculation period.
- Effective tax and contribution rates show the numerator, denominator, and included items used to derive them.
- Monthly and annual values are clearly distinguished as estimates and use consistent, tested rounding.
- Results identify excluded or unavailable amounts instead of silently omitting them.
- The user can see the profile inputs and assumptions used to produce the result.

#### Story MVP-4.2 — Show official source references

**As a** user, **I want** to inspect the official sources behind each rule-based result, **so that** I can trace why an estimate was produced.

**Acceptance criteria**

- Each rule-backed result links to the official source URL associated with the rule record.
- The reference includes the rule description and its effective date or date range.
- Source links are distinguishable from general explanatory text and open the intended source.
- Results do not display a source as support for a rule it did not inform.
- Missing, outdated, or unreviewed sources are surfaced as limitations, not hidden.

#### Story MVP-4.3 — Compare baseline and supported scenarios

**As a** user, **I want** to compare a baseline with supported PPK and IKZE scenarios, **so that** I can understand the effect of changing one input.

**Acceptance criteria**

- The comparison identifies the inputs that differ between scenarios.
- All other profile inputs, assumptions, calculation period, and rule-set versions are held constant or explicitly disclosed.
- Monthly and annual effects and the supported retirement projection horizons are comparable.
- Comparisons contain no fabricated or unsupported financial values.

### Epic MVP-5 — Validate correctness and provide safety guardrails

**Goal:** Verify calculations and input handling, protect user information, and communicate the limits of estimates.

#### Story MVP-5.1 — Create calculation test cases and edge cases

**As a** maintainer, **I want** automated tests for normal, boundary, and unsupported cases, **so that** changes do not silently break estimates.

**Acceptance criteria**

- Tests cover representative supported UoP profiles, gross/net handling, applicable rule periods, and each implemented tax and contribution component.
- Tests cover rounding boundaries, zero or very small inputs, large inputs within supported limits, annual/monthly consistency, and PPK and IKZE eligibility or limit boundaries.
- Tests cover missing answers, unverified rules, expired or not-yet-effective rules, and unsupported cases.
- Projection tests verify 1-, 5-, 10-, 15-, and 20-year output horizons and disclosed contribution-only assumptions where applicable.
- Tests verify that identical inputs and rule versions produce identical outputs.
- CI or the documented local workflow runs the test suite and production TypeScript/Vite build successfully.

#### Story MVP-5.2 — Add input validation and accessible error handling

**As a** user, **I want** invalid or incomplete inputs explained clearly, **so that** I can correct them before relying on an estimate.

**Acceptance criteria**

- The app validates both browser form inputs and calculation-service inputs.
- Validation errors identify the affected field and how to correct it.
- The calculation engine rejects invalid or unsupported input rather than coercing it into a plausible financial result.
- Form labels, keyboard navigation, focus indication, and error announcements are accessible.
- Calculation failures are shown as errors or unavailable results, not success-shaped empty values.

#### Story MVP-5.3 — Apply security and legal guardrails

**As a** user, **I want** clear privacy and advice limitations, **so that** I understand how my information is handled and what the estimates mean.

**Acceptance criteria**

- The application states prominently that results are estimates and do not replace professional tax, legal, or investment advice.
- Recommendations and scenario outputs are not represented as guaranteed outcomes or definitive eligibility decisions.
- The first version does not transmit or persist sensitive profile data without explicit user consent and a documented need.
- Rule data and calculation results are not changed by AI-generated arithmetic or unreviewed external content.
- Official-source references and material assumptions are available with relevant results.
- Unsupported or uncertain cases are explained and not disguised as advice.

## Phase 2

### Epic P2-1 — Support Umowa Zlecenie

**Goal:** Extend the verified, tested questionnaire, rule set, and results workflow to contract-of-mandate calculations.

#### Story P2-1.1 — Research and store Umowa Zlecenie tax and ZUS rules

**As a** product maintainer, **I want** to research applicable official tax and ZUS rules for Umowa Zlecenie and store each reviewed rule with source and effective-date metadata, **so that** the extension is traceable and period-correct.

**Acceptance criteria**

- Official tax and ZUS sources, effective periods, conditions, exceptions, and verification dates are recorded.
- Rule records follow the same metadata and review requirements as MVP rules.
- Unresolved interactions or missing applicability information remain explicitly unresolved.
- The rule set does not alter UoP results unless a shared rule is intentionally changed and separately tested.

#### Story P2-1.2 — Calculate and present Umowa Zlecenie scenarios

**As a** person working under Umowa Zlecenie, **I want** supported tax, contribution, and net-income estimates, **so that** I can view a breakdown relevant to my contract type.

**Acceptance criteria**

- Questionnaire inputs identify the additional information necessary for supported contract scenarios.
- Deterministic calculations use verified rules effective for the selected period.
- Monthly and annual results, assumptions, source references, and unsupported cases are presented consistently with the UoP experience.
- Automated tests cover applicable eligibility combinations, rule boundaries, and differences from UoP.

### Epic P2-2 — Support B2B

**Goal:** Add a clearly scoped and sourced estimate for business-to-business users without implying comprehensive accounting or tax advice.

#### Story P2-2.1 — Research and store B2B tax and ZUS rules

**As a** product maintainer, **I want** to research official B2B tax and ZUS rules and store each reviewed rule with source and effective-date metadata, **so that** B2B estimates are based on traceable rules.

**Acceptance criteria**

- Research identifies the B2B regimes and user inputs actually supported by the product; it does not imply every regime is supported.
- Each stored rule includes official source URL, effective period, conditions, verification date, and review status.
- Required business inputs and unresolved eligibility or interpretation questions are documented.
- No unsupported regime or rule is selected by default.

#### Story P2-2.2 — Calculate and present supported B2B scenarios

**As a** B2B user, **I want** an estimate for a supported and explicitly selected B2B scenario, **so that** I can see its calculated tax and contribution breakdown.

**Acceptance criteria**

- Users provide the additional inputs required by the selected supported scenario.
- Deterministic calculations use applicable reviewed rules and clearly identify the selected regime and period.
- Monthly and annual results disclose assumptions, exclusions, source references, and limitations.
- Unavailable regimes or missing business-specific details produce an explicit unavailable result.
- Automated tests cover supported regime selection, limits, and representative edge cases.

### Epic P2-3 — Add IKE scenarios

**Goal:** Add a researched and traceable IKE savings scenario alongside the existing retirement comparison.

#### Story P2-3.1 — Research and store IKE rules

**As a** product maintainer, **I want** to research official IKE rules and store each rule with its source and effective dates, **so that** IKE scenarios use reviewed, period-appropriate information.

**Acceptance criteria**

- Research records the official source URL, applicable period, limits, eligibility conditions, and date checked for each rule used.
- Unverified treatment or eligibility is identified as unresolved rather than assumed.
- Reviewed IKE rules are stored separately from calculations using the same metadata convention as other rule areas.

#### Story P2-3.2 — Calculate and compare IKE scenarios

**As a** user, **I want** to compare a supported IKE contribution scenario with baseline, PPK, and IKZE scenarios, **so that** I can review their differences under disclosed assumptions.

**Acceptance criteria**

- The scenario uses the applicable reviewed IKE rules and checks any applicable verified limit.
- Scenario comparisons identify the differing inputs and hold other inputs and assumptions constant or disclose their differences.
- Results and projections do not assume investment returns, fees, or inflation without explicit disclosed inputs.
- IKE calculations, limits, and edge cases have automated tests.

## Future

### Epic F-1 — Add AI-supported official-source research

**Goal:** Help maintainers discover and summarize official rules while keeping final rule publication under human review.

#### Story F-1.1 — Propose source research updates for human review

**As a** rule maintainer, **I want** a future AI agent to identify and summarize candidate official sources, **so that** I can review possible rule updates more efficiently.

**Acceptance criteria**

- The agent is restricted to finding and summarizing candidate official sources and their stated dates; it does not publish or activate rule data.
- Each proposed change includes source URL, quoted or clearly attributed evidence, candidate effective dates, affected rule identifiers, and uncertainty.
- A human reviewer must verify and approve a change before it enters the active rule set.
- Missing, conflicting, inaccessible, or non-official evidence is reported without invented facts.
- The app remains usable when the AI agent is unavailable.

### Epic F-2 — Explain deterministic results with AI

**Goal:** Offer optional plain-language explanations grounded in already-calculated results and reviewed source references.

#### Story F-2.1 — Generate an optional explanation of a result

**As a** user, **I want** an optional AI-generated explanation of my deterministic estimate, **so that** I can better understand its components and assumptions.

**Acceptance criteria**

- The AI receives only the calculated result, relevant disclosed assumptions, limitations, and rule/source references supplied by the application.
- The agent cannot calculate, change, round, or override financial values or fill in missing user facts.
- Explanations distinguish facts, assumptions, and estimates and link back to the relevant sources.
- Uncertain, unsupported, or conflicting evidence is explicitly acknowledged.
- AI output is labeled as explanatory and fallible, and users can still access results with AI disabled or unavailable.

### Epic F-3 — Extend user guidance and product operations

**Goal:** Add optional capabilities only after the supported calculation core and safeguards are reliable.

#### Story F-3.1 — Explore additional scenario and recommendation guidance

**As a** user, **I want** conditional, source-backed explanations of possible legal tax optimization options, **so that** I can identify questions to verify with a professional.

**Acceptance criteria**

- Each option is linked to reviewed rules, states eligibility conditions and limitations, and is clearly not a guarantee or personal legal conclusion.
- Unknown inputs do not produce definitive eligibility claims.
- The user is told when professional confirmation is appropriate.
- The feature is not released until relevant official rules and legal guardrails are reviewed.

#### Story F-3.2 — Evaluate persistence or account features

**As a** product owner, **I want** to evaluate whether users need saved profiles or accounts, **so that** data persistence is introduced only with an explicit privacy and security design.

**Acceptance criteria**

- The need, data fields, retention, access controls, and deletion behavior are documented before implementation.
- Any persistence is opt-in and accompanied by clear user-facing privacy information.
- A security and privacy review is completed before collecting or storing profile data on a server.
- Local-first, no-account use remains available if persistence is introduced.
