# UoP Regulatory Research Gaps

**Purpose:** Record the repository-documented evidence gaps that prevent safe implementation of verified UoP employee social-insurance calculations. This artifact uses only the project's existing research and requirements documents; it does not add or independently verify legal rules.

**Research snapshot:** The repository records its third verification pass and source access date as 2026-10-27. Findings are time-bounded and must be rechecked before later use.

## Blocking gaps

### 1. Employee social-insurance shares are not cleared for 2026 (G-4)

`RESEARCH_GAPS.md` lists these only as **candidate values**, not approved production rules: pension 9.76% employee / 19.52% total; disability 1.50% employee / 8.00% total; sickness 2.45% employee / 2.45% total. The cited [Social Insurance System Act, Dz.U. 2026 poz. 199](https://dziennikustaw.gov.pl/DU/2026/199), Arts. 16(1), 16(1b), 16(2), and 22(1)(1)-(3), supports the candidates in that consolidation. The project has not conclusively checked subsequent Acts [2026 poz. 252](https://dziennikustaw.gov.pl/DU/2026/252), [2026 poz. 426](https://dziennikustaw.gov.pl/DU/2026/426), [2026 poz. 473](https://dziennikustaw.gov.pl/DU/2026/473), and [2026 poz. 734](https://dziennikustaw.gov.pl/DU/2026/734) against those provisions. Therefore, their effect and 2026 applicability remain unresolved.

**Safe boundary:** Do not calculate employee contributions using these candidates until the article/amendment review is completed. Do not substitute self-employed ZUS rates.

### 2. Health contribution rate and base are separately blocked (G-5)

The repository records a candidate ordinary-employee rule of 9% of a base derived from the relevant pension/disability base and reduced by employee-funded pension, disability, and sickness contributions withheld by the payer. It does not mark this candidate as cleared for implementation. The listed later healthcare amendments—2025 poz. 1537 and 1739; 2026 poz. 203, 791, 972, 986, and 1007—have not all been checked against the cited Arts. 79 and 81. A health calculation therefore cannot safely be inferred from the candidate social-insurance shares.

**Source-reference issue to resolve:** `RESEARCH_GAPS.md` G-5 cites Dz.U. 2025 poz. 1461, while its historical URL audit says position 1461 is an unrelated regulation and identifies Dz.U. 2024 poz. 146 as the healthcare Act citation. Reconcile this discrepancy and verify the operative text before relying on the health-rule citation.

### 3. Annual ceiling alone is insufficient

`TAX_RULES_RESEARCH.md` records PLN 282,600 as the 2026 annual pension/disability contribution-base ceiling, citing the official [ZUS 2026 rates and limits page](https://www.zus.pl/-/nowe-wysoko%C5%9Bci-sk%C5%82adek-na-ubezpieczenia-spo%C5%82eczne-w-2026-r.?redirect=%2Fo-zus%2Faktualnosci) and Social Insurance System Act Art. 19. The research notes that employee scope still needs confirmation from the statutory rule; this ceiling is not a monthly salary cap and does not establish employee contribution rates or an individual's remaining year-to-date base. The repository says the ceiling is stored but is not used to calculate amounts without verified rates and user-provided year-to-date base.

## Product and implementation constraints already documented

- `REQUIREMENTS.md` says rules used in calculations must be traceable to official Polish sources, include effective dates, and never present uncertain or unverified information as fact. It explicitly prohibits using social/health contribution amounts and rules still marked blocked in `RESEARCH_GAPS.md`.
- `ARCHITECTURE.md` says rule data must carry source/effective-period/verification metadata; when no verified applicable rule exists, the result must be explicitly unavailable rather than guessed. It states the current 2026 rule set activates verified PPK values and sourced limits only, and the implementation must not calculate blocked social-insurance amounts.
- `REGULATORY_UPDATE_AGENT.md` requires inspecting official sources themselves, recording exact articles/amendments and effective periods, treating missing or conflicting evidence as unresolved, and keeping candidate changes inactive until human review and regression tests pass. The current frontend demonstration makes no external requests and cannot complete live research.

## Work needed before implementation

1. Inspect the cited social-insurance amendment clauses against Arts. 16 and 22, and establish the applicable UoP employee shares for the requested period from current official evidence.
2. Reconcile the healthcare statute citation, then inspect the relevant healthcare articles and listed amendments to establish the employee rate and assessment-base rule for that period.
3. Confirm the ceiling's UoP scope and identify the user-provided year-to-date base inputs needed for a capped calculation; do not infer them from monthly gross pay alone.
4. Record source URLs, exact supporting articles/quotations, access and effective dates, applicability/limitations, and verification state in the project rule data/research record.
5. Keep the results unavailable until evidence is resolved, reviewed by a human, and implementation has deterministic regression coverage. No candidate values in this artifact authorize production calculation.

## Project references

- [TAX_RULES_RESEARCH.md](./TAX_RULES_RESEARCH.md)
- [RESEARCH_GAPS.md](./RESEARCH_GAPS.md)
- [REQUIREMENTS.md](./REQUIREMENTS.md)
- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [REGULATORY_UPDATE_AGENT.md](./REGULATORY_UPDATE_AGENT.md)

**Limitations:** This is a synthesis of the repository's dated notes, not new legal research, legal advice, or confirmation that candidate values are currently in force. It intentionally does not resolve the gaps or implement Issue #3.