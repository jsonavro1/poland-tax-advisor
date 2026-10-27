# UoP Rule Research Gaps

This review covers the rules and every URL cited in [TAX_RULES_RESEARCH.md](./TAX_RULES_RESEARCH.md). Sources were checked on **2026-10-27**. A second pass opened official PIT, Social Insurance System, healthcare, and PPK legal texts published by Dziennik Ustaw, along with relevant official government/agency pages. The statutes support candidate values in the cited historical consolidations, but none expressly establishes all requested blocker rules as applicable to tax year 2026. No blocker below is closed by this pass; this document does not supply replacement values or authorize implementation.

## Severity key

- **BLOCKER** — Do not calculate or display a personalized amount that depends on this rule until verified.
- **IMPORTANT** — Scope the feature, gather additional inputs, or expose a limitation before relying on the rule; the gap may block a particular scenario or result component.
- **NON-BLOCKING** — Does not prevent the narrowly scoped standard UoP estimate, but must be addressed before supporting the affected user or edge case.

## Gaps requiring resolution

### G-1 — 2026 general-scale PIT brackets

- **Classification:** BLOCKER
- **Unresolved rule/value:** The document lists 12% up to PLN 120,000 and 32% on the excess, but marks 2026 applicability unverified.
- **Why evidence is insufficient:** The second pass opened the official [Dz.U. 2025 poz. 163 PIT Act PDF](https://dziennikustaw.gov.pl/DU/2025/163). Article 27(1) supports the candidate wording “do 120 000 — 12%” and “ponad 120 000 — 10 800 zł + 32% nadwyżki ponad 120 000 zł” in that consolidated text. The consolidation was published in 2025; neither it nor the inspected current basic PIT information page expressly confirms the scale for tax year 2026. Later changes effective in 2026 were not cleared.
- **Official institution to confirm:** Ministry of Finance / National Revenue Administration (KAS); legal text from the official Journal of Laws / ELI.
- **Exact official page or legal document to locate:** The PIT Act Article 27 and official Ministry of Finance/KAS tax-scale guidance explicitly applicable to 2026; if a 2026 consolidation is unavailable, inspect every official amending Act effective by 2026-10-27 that could affect Article 27. The 2025 text inspected is [Dz.U. 2025 poz. 163](https://dziennikustaw.gov.pl/DU/2025/163), Art. 27(1).
- **Blocks implementation:** Yes. This rule controls annual PIT under the general scale.
- **Safe behavior until verified:** Do not use either rate or the threshold in code, estimates, examples, or tests as a 2026 fact. Mark PIT results unavailable. Do not substitute remembered rates or carry the 2025 wording forward.

### G-2 — 2026 tax-free amount and annual tax-reducing amount

- **Classification:** BLOCKER
- **Unresolved rule/value:** PLN 30,000 tax-free amount and PLN 3,600 annual tax-reducing amount are derived from the unverified PIT scale values.
- **Why evidence is insufficient:** The inspected [Dz.U. 2025 poz. 163 PIT Act PDF](https://dziennikustaw.gov.pl/DU/2025/163), Art. 27(1), expressly says “kwota zmniejszająca podatek 3600 zł” alongside the 12% bracket, but does not state this is the amount for tax year 2026. The PLN 30,000 tax-free amount is derived as PLN 3,600 divided by 12%; it is not separately named in the inspected statutory clause. No 2026-specific confirmation was found.
- **Official institution to confirm:** Ministry of Finance / KAS; legal text from the official Journal of Laws / ELI.
- **Exact official page or legal document to locate:** The PIT Act Article 27 and Ministry of Finance/KAS guidance explicitly identifying the tax-free amount and tax-reducing amount applicable to 2026. The 2025 consolidation inspected is [Dz.U. 2025 poz. 163](https://dziennikustaw.gov.pl/DU/2025/163), Art. 27(1).
- **Blocks implementation:** Yes. It affects annual PIT and may affect payroll advances.
- **Safe behavior until verified:** Do not use these amounts or derive a substitute from another year. Suppress PIT and net-income estimates that require them.

### G-3 — 2026 standard employee tax-deductible costs (KUP)

- **Classification:** BLOCKER
- **Unresolved rule/value:** PLN 250 per month / PLN 3,000 per year for the stated ordinary workplace, single-employer case; related commuter and multiple-employment variants are also not confirmed for 2026.
- **Why evidence is insufficient:** The second pass opened [Dz.U. 2025 poz. 163](https://dziennikustaw.gov.pl/DU/2025/163), Art. 22(2)(1), which explicitly states PLN 250 monthly and a PLN 3,000 annual maximum for one employment relationship. This consolidation was published in 2025 and does not expressly establish these fixed costs for 2026. The ordinary workplace assumption and 2026 applicability therefore remain unverified.
- **Official institution to confirm:** Ministry of Finance / KAS; current legal text from official ELI.
- **Exact official page or legal document to locate:** The PIT Act Article 22(2)–(2b) effective for 2026 and official podatki.gov.pl/MF guidance explicitly identifying 2026 employee cost amounts and eligibility for ordinary workplace, commuting, and multiple-employer cases. The inspected 2025 text is [Dz.U. 2025 poz. 163](https://dziennikustaw.gov.pl/DU/2025/163).
- **Blocks implementation:** Yes, for a taxable-income estimate that applies standard KUP.
- **Safe behavior until verified:** Do not subtract PLN 250, PLN 300, or any annual cap from income. Mark the tax-base/PIT result unavailable; do not assume the user's workplace or employer-count category.

### G-4 — Current employee shares of pension, disability, and sickness contributions

- **Classification:** BLOCKER
- **Unresolved rule/value:** Employee shares listed as 9.76% pension, 1.50% disability, and 2.45% sickness.
- **Why evidence is insufficient:** The second pass opened [Dz.U. 2025 poz. 350](https://dziennikustaw.gov.pl/DU/2025/350), the consolidated Social Insurance System Act text. Articles 16 and 22 support the candidate employee shares in that text: pension is split equally from 19.52% (9.76% each), disability is 1.5% for the insured person, and sickness is 2.45% and fully financed by covered insured persons. However, the consolidation is from 2025 and does not expressly confirm that these shares apply to a UoP employee in 2026. The inspected [ZUS 2026 rates page](https://www.zus.pl/-/nowe-wysoko%C5%9Bci-sk%C5%82adek-na-ubezpieczenia-spo%C5%82eczne-w-2026-r.?redirect=%2Fo-zus%2Faktualnosci) is expressly for 2026 but its displayed schedules cover specified groups, including non-agricultural business activity; it does not establish these UoP employee shares.
- **Official institution to confirm:** Social Insurance Institution (ZUS); legal text from the official Journal of Laws / ELI.
- **Exact official page or legal document to locate:** A current 2026 consolidated Social Insurance System Act or Articles 16 and 22 in [Dz.U. 2025 poz. 350](https://dziennikustaw.gov.pl/DU/2025/350) together with every later official amendment effective in 2026, plus ZUS guidance explicitly applying the employee/employer split to UoP in 2026.
- **Blocks implementation:** Yes. These values are required for an employee mandatory-contribution breakdown and affect health-contribution base as well.
- **Safe behavior until verified:** Do not apply these percentages to user income. Mark the employee social-contribution breakdown and dependent net-income result unavailable; do not substitute the self-employed rates shown on ZUS pages.

### G-5 — UoP health-contribution rate and assessment base

- **Classification:** BLOCKER
- **Unresolved rule/value:** 9% health contribution and the exact ordinary employee assessment-base rule, including the interaction with employee-financed social contributions.
- **Why evidence is insufficient:** The previous research citation was incorrect: [Dz.U. 2024 poz. 1461](https://dziennikustaw.gov.pl/DU/2024/1461) is a regulation concerning early local elections, not the healthcare Act. The second pass corrected the reference and opened the official [Dz.U. 2024 poz. 146 healthcare Act PDF](https://dziennikustaw.gov.pl/DU/2024/146). Articles 79(1) and 81(1) state the 9% contribution and cross-reference the relevant social-insurance assessment base, subject to statutory exceptions. That consolidation covers changes only through 2024-01-15 and does not establish the rate/base after all amendments effective in 2026. The ZUS 2026 page is not an employee-specific base explanation.
- **Official institution to confirm:** Ministry of Health / National Health Fund (NFZ) for health-insurance rules, and ZUS; legal text from official ELI.
- **Exact official page or legal document to locate:** The healthcare Act Articles 79 and 81 as effective for 2026, beginning with the corrected official consolidated text [Dz.U. 2024 poz. 146](https://dziennikustaw.gov.pl/DU/2024/146) and all subsequent applicable official amendments, together with current NFZ/ZUS guidance specifically for UoP employees.
- **Blocks implementation:** Yes. It affects mandatory contributions, net income, and effective-rate results.
- **Safe behavior until verified:** Do not calculate or display an employee health-contribution amount or net income dependent on it. Do not use business-owner minima or bases as an employee proxy.

### G-6 — 2026 applicability and eligibility terms for PPK contributions and state payments

- **Classification:** BLOCKER
- **Unresolved rule/value:** Standard employee contribution 2%, employer contribution 1.5%, possible reduction of the employee basic contribution to at least 0.5% where monthly remuneration from different sources is at most 1.2 times the minimum wage, welcome payment PLN 250, annual state payment PLN 240, and the eligibility conditions for state payments.
- **Why evidence is insufficient:** The second pass opened [Dz.U. 2024 poz. 427](https://dziennikustaw.gov.pl/DU/2024/427), the PPK Act consolidated in 2024, and the [MojePPK FAQ](https://www.mojeppk.pl/faq.html). The Act supports 2% employee and 1.5% employer basic contributions (Arts. 27(1), 26(1)); PLN 250 welcome payment and its three-full-month/three-contribution-month conditions, including no duplicate credit (Art. 31); and PLN 240 annual payment with the six-times-minimum-wage threshold in Art. 32(1)–(2). The Act consolidation predates 2026; the FAQ is unversioned. Neither source expressly confirms 2026 applicability. The complete current annual-payment exception/eligibility text and individual account history were also not established.
- **Official institution to confirm:** PFR Portal PPK / MojePPK and the official Journal of Laws / ELI.
- **Exact official page or legal document to locate:** The PPK Act Articles 26, 27, 31, and 32 as effective in tax year 2026, including all amendments after the 2024 consolidation; current MojePPK guidance explicitly applicable to 2026 for basic rates, reduced contributions, welcome-payment eligibility, and annual-payment thresholds/exclusions.
- **Blocks implementation:** Yes for a 2026 PPK employee/employer contribution scenario and for projecting a 2026 state payment. PPK applies only when participant enrollment/participation is established; state-payment entitlement additionally depends on contributions and prior credit history.
- **Safe behavior until verified:** Show employee/employer PPK amounts and state payments as unavailable. Do not assume participation, include state payments, or treat the 2024 text/unversioned FAQ as 2026 rule data.

### G-7 — Current IKZE deduction and payout tax treatment

- **Classification:** BLOCKER
- **Unresolved rule/value:** Tax deduction of IKZE contributions from the tax base, tax treatment of a qualifying withdrawal at 10%, and tax treatment of an early refund under the tax scale.
- **Why evidence is insufficient:** The cited MRPiPS IKZE overview is an official page but is explicitly last modified 2018-08-27 and discusses historical legislative changes. It does not establish that the current tax treatment, eligibility rules, or all relevant conditions remained unchanged through 2026. The linked PIT Act record is a 2025 consolidated-text announcement that is no longer in force as an announcement and does not expose current 2026 operative text at that URL.
- **Official institution to confirm:** Ministry of Finance / KAS for PIT treatment; Ministry of Family, Labour and Social Policy (MRPiPS) for the IKZE framework; official ELI legal text.
- **Exact official page or legal document to locate:** Current PIT Act provisions on IKZE deductions and qualifying payouts/refunds, effective for tax year 2026; current Act on Individual Retirement Accounts and Individual Retirement Security Accounts (*ustawa o indywidualnych kontach emerytalnych oraz indywidualnych kontach zabezpieczenia emerytalnego*) provisions governing deposits and qualifying withdrawals; current official podatki.gov.pl and gov.pl guidance that cites those provisions.
- **Blocks implementation:** Yes, for calculating an IKZE tax benefit, withdrawal tax, or after-tax retirement scenario. It does not invalidate the separately date-specific annual contribution ceiling.
- **Safe behavior until verified:** Do not calculate or claim a tax saving, tax refund, qualifying-withdrawal tax, or net IKZE benefit. The verified 2026 contribution cap may be shown only as a sourced limit, not as evidence of tax savings or eligibility.

### G-8 — Monthly PIT advance, PIT-2 allocation, and annual-to-monthly model

- **Classification:** IMPORTANT
- **Unresolved rule/value:** Monthly payroll PIT advance treatment, including application/allocation of the tax-reducing amount and interaction with annual reconciliation.
- **Why evidence is insufficient:** The research notes that monthly reduction depends on an employee statement/authorization but does not cite or verify the applicable 2026 advance-calculation provisions, statement form, allocation among payers, or withholding rules. Annual PIT scale information alone does not determine monthly withholding.
- **Official institution to confirm:** Ministry of Finance / KAS; current PIT Act and official payroll-advance guidance.
- **Exact official page or legal document to locate:** PIT Act provisions effective in 2026 for employment income advances (including Article 32 and relevant Article 31a/31b provisions as currently amended), the current PIT-2 form/instructions, and official podatki.gov.pl guidance for employers/payers on tax-reducing amount allocation.
- **Blocks implementation:** It blocks claiming that a modelled monthly withholding amount reproduces a user's payslip. Annual PIT may be a separate feature once its own blockers are resolved.
- **Safe behavior until verified:** Do not present an annual liability estimate as the employee's exact monthly payroll advance. If monthly tax cannot be modelled from verified rules and required declarations, label it unavailable or clearly separate an annual estimate from actual withholding.

### G-9 — Scope exceptions affecting social/health contribution bases

- **Classification:** IMPORTANT
- **Unresolved rule/value:** Exact handling of atypical remuneration components, periods of benefits or leave, cross-border coordination, multiple employments/payers, and other exceptions to the ordinary UoP contribution bases.
- **Why evidence is insufficient:** The research explicitly leaves these cases unestablished and does not cite the relevant current statutory exceptions or ZUS guidance.
- **Official institution to confirm:** ZUS and NFZ; Ministry of Health where health-insurance law applies.
- **Exact official page or legal document to locate:** Current 2026 ZUS employee guidance on contribution bases/exclusions and annual-base aggregation; Social Insurance System Act and health-services Act provisions applicable to each selected exception; official cross-border coordination guidance if that case is supported.
- **Blocks implementation:** No for a deliberately narrow, validated standard-employee case with explicit exclusions; yes before claiming support for any affected exception or for a user whose answers indicate one.
- **Safe behavior until verified:** Limit supported profiles to the verified ordinary case, ask about scope-relevant exceptions where needed, and return an explicit unsupported/unavailable result rather than treating atypical income as ordinary salary.

### G-10 — Participant-specific PPK eligibility/history

- **Classification:** IMPORTANT
- **Unresolved rule/value:** Whether a particular participant qualifies for a one-time welcome payment or annual state payment, has already received a welcome payment, or meets the contribution conditions for a given year.
- **Why evidence is insufficient:** The research itself says individual eligibility requires enrollment and contribution history; none of those facts are currently collected or evidenced. The values alone do not establish entitlement.
- **Official institution to confirm:** PFR Portal PPK / MojePPK; participant's PPK institution/account records for personal history.
- **Exact official page or legal document to locate:** Current MojePPK state-contribution eligibility guidance and PPK Act Articles 31–32; for an individual estimate, the participant's relevant annual contribution history and confirmation of previous welcome-payment credit.
- **Blocks implementation:** No for a base-contribution-only estimate that excludes state subsidies; yes for including a participant's welcome or annual payment in a personalized projection.
- **Safe behavior until verified:** Exclude state payments from personal projections or show them as a separate conditional possibility without adding them to the total.

### G-11 — IKZE user-specific eligibility, remaining annual headroom, and deduction availability

- **Classification:** IMPORTANT
- **Unresolved rule/value:** The user's remaining 2026 IKZE contribution capacity, eligibility for the ordinary versus higher limit, and actual tax-base deduction benefit.
- **Why evidence is insufficient:** The gov.pl source explicitly states both 2026 caps, but the profile may not capture qualifying business activity, prior deposits during the year, taxable income, filing position, or other relevant facts. An annual cap alone cannot establish remaining contribution headroom or tax savings.
- **Official institution to confirm:** MRPiPS for the statutory annual limit; Ministry of Finance / KAS for deduction requirements; the user/account provider for deposits already made.
- **Exact official page or legal document to locate:** The 2026 MRPiPS IKZE-limit notice (Monitor Polski 2025 poz. 1156) and current official PIT Act deduction provisions for 2026; personal 2026 contribution history from the IKZE account provider.
- **Blocks implementation:** No for displaying the sourced annual cap as general information; yes for asserting a user's remaining limit or a personalized tax saving.
- **Safe behavior until verified:** Show the general 2026 limit with a warning that personal available capacity and tax benefit are unknown. Do not infer the higher business-activity cap from a UoP employment selection.

## URL and source audit

All linked domains in the research file are official government, public institution, or public legal-information domains. **No non-official domain was found.** A domain being official does not by itself make a particular page current or sufficient evidence for a specific rule.

| URL cited in `TAX_RULES_RESEARCH.md` | Domain/status | Support and effective-date review |
|---|---|---|
| `https://eli.gov.pl/api/acts/DU/2025/163` | Official ELI; accessible as a metadata record | The record identifies the 2025 consolidated PIT text but does not return the consolidated article wording at this endpoint. ELI metadata marks the announcement no longer in force from 2026-04-29. It does **not** establish the PIT values for tax year 2026. See G-1, G-2, G-3, and G-7. |
| `https://dziennikustaw.gov.pl/DU/2025/163` | Official Dziennik Ustaw record and PDF; opened and inspected | The 2025 PIT consolidated text directly supports the candidate bracket, tax-reducing amount, and employee KUP wording in Arts. 27(1) and 22(2)(1), but its publication does not expressly establish applicability in tax year 2026. See G-1 through G-3. |
| `https://eli.gov.pl/api/acts/DU/1991/350/text.html` | Official ELI; accessible historical act text | This is the original 1991 PIT Act text, not a current consolidated statute. It is not sufficient evidence for current PIT brackets, tax-free amount, tax-reducing amount, or current fixed KUP values. It cannot establish 2026 applicability. See G-1 through G-3. |
| `https://eli.gov.pl/api/acts/DU/2025/350` | Official ELI; accessible as a metadata record | The record identifies a 2025 consolidated Social Insurance System Act announcement but returns metadata rather than the cited Art. 16/22 wording. ELI marks the announcement no longer in force from 2026-02-22. It does not establish current 2026 employee contribution shares. See G-4 and G-9. |
| `https://dziennikustaw.gov.pl/DU/2025/350` | Official Dziennik Ustaw record and PDF; opened and inspected | Arts. 16 and 22 support the candidate employee social-insurance rates in this 2025 consolidation, but do not expressly establish their UoP applicability in 2026. See G-4. |
| `https://www.zus.pl/baza-wiedzy/skladki-wskazniki-odsetki/skladki/wysokosc-skladek-na-ubezpieczenia-spoleczne` | Official ZUS; accessible | The accessible 2026 page is principally organized around contribution rules for people conducting non-agricultural business activity and related payer amounts. It does not explicitly establish the employee-financed UoP rates listed in the register. It does contain 2026 information, but that does not make every UoP application in the register verified. See G-4 and G-5. |
| `https://eli.gov.pl/api/acts/DU/2024/1461/text.html` | Official ELI domain; wrong legal item for the healthcare Act | Position 1461 is an unrelated regulation concerning an early local election; do not cite it for healthcare contribution rules. It is not evidence for the values. The health Act citation was corrected to Dz.U. 2024 poz. 146. See G-5. |
| `https://dziennikustaw.gov.pl/DU/2024/146` | Official Dziennik Ustaw record and PDF; opened and inspected | Healthcare Act Arts. 79(1) and 81(1) support the 9% rate and assessment-base cross-reference in this consolidation. The consolidation predates 2026 and does not establish applicability after all amendments effective in 2026. See G-5. |
| `https://www.zus.pl/-/nowe-wysoko%C5%9Bci-sk%C5%82adek-na-ubezpieczenia-spo%C5%82eczne-w-2026-r.?redirect=%2Fo-zus%2Faktualnosci` | Official ZUS; accessible | Explicitly states the 2026 annual pension/disability base ceiling of PLN 282,600 and dates the information 2025-12-30. It supports that value and tax/calendar year. The page focuses on certain insured groups/payer guidance, so use the statutory rule to confirm employee scope; it does not support the employee percentage rows. |
| `https://www.mojeppk.pl/faq.html` | Official PFR Portal PPK / MojePPK; opened and inspected | The FAQ is not date-versioned for 2026. It is corroborative but does not establish current 2026 applicability or complete eligibility conditions. See G-6 and G-10. |
| `https://dziennikustaw.gov.pl/DU/2024/427` | Official Dziennik Ustaw record and PDF; opened and inspected | The 2024 PPK Act consolidation supports the candidate basic contribution rates and state-payment provisions in Arts. 26, 27, 31, and 32. It predates 2026 and does not establish current 2026 applicability or all current eligibility exceptions. See G-6 and G-10. |
| `https://www.mojeppk.pl/` | Official PFR Portal PPK / MojePPK; accessible | The homepage displays candidate standard rates and state-payment values but does not specify an effective year or detailed eligibility conditions. It is not sufficient evidence for personalized 2026 implementation. See G-6 and G-10. |
| `https://www.gov.pl/web/rodzina/ikze-limit-wplat` | Official MRPiPS gov.pl page; accessible | Explicitly gives PLN 11,304 ordinary limit and PLN 16,956 qualifying-business limit for 2026 and identifies the notice dated 2025-11-10, Monitor Polski poz. 1156. It supports both exact annual caps and the year. It does not establish a user's personal remaining allowance or tax benefit. See G-11. |
| `https://www.gov.pl/web/rodzina/ikze-indywidualne-konto-zabezpieczenia-emerytalnego` | Official MRPiPS gov.pl page; accessible | The page explains IKZE deduction and 10% treatment of qualifying payouts, but its displayed last modification is 2018-08-27 and it describes historic legislative changes. It does not clearly establish that the tax rules and conditions remain current for 2026. See G-7. |

### Link-review summary

- **Non-official domains:** None found.
- **Broken links:** No URL was established to be a definite HTTP 404 during this review. The earlier healthcare citation at position 1461 was an accessible but unrelated legal item, not a broken health Act link; the corrected Dz.U. 2024 poz. 146 PDF was opened.
- **Official sources that do not explicitly support the attached claim:** The ELI API endpoints for the 2025 PIT/SS consolidations return metadata rather than article text; the original PIT Act text is historical; the ZUS contribution page is chiefly about business/self-employed calculations rather than UoP employee shares; and MojePPK pages do not establish 2026 effective-date or complete eligibility details. The direct Dziennik Ustaw PDFs support the quoted values in their respective consolidations but do not themselves establish 2026 applicability.
- **Sources without a clearly applicable effective date/year:** PIT, employee KUP, social-insurance, health-insurance, and PPK legal texts inspected are consolidations published before or during earlier years and do not expressly establish applicability for tax year 2026. The MojePPK FAQ does not state a year. The IKZE overview is dated 2018 and lacks a clear 2026 applicability statement.
- **Date accessed:** `TAX_RULES_RESEARCH.md` gives a shared access date of 2026-10-27 for its register URLs. This is adequate as a document-level access date, but source publication/effective dates must still be recorded per rule when rules are eventually stored.

## Safe implementation boundary

Until blockers G-1 through G-7 are resolved, the application must not generate a UoP net-income, PIT, employee-contribution, PPK, or IKZE tax-benefit estimate from these unverified values. The second pass verified candidate wording in prior-year legal consolidations but verified **none of the requested blockers for tax year 2026**. In particular, PIT values marked provisional in `TAX_RULES_RESEARCH.md` must not be used in implementation. The independently sourced IKZE 2026 annual cap and ZUS 2026 annual ceiling may be retained as research facts with their source and period metadata, but must not be used to imply that the dependent calculation is complete.
