# UoP Rule Research Gaps

This review covers the rules and every URL cited in [TAX_RULES_RESEARCH.md](./TAX_RULES_RESEARCH.md). Sources were checked on **2026-10-27**. The third verification pass inspected current Ministry of Finance pages and current consolidated legal texts. It closed G-6 for the standard PPK legal rules as of the access date. G-1 through G-5 remain blocked: PIT amendment Dz.U. 2026 poz. 846, social-insurance amendments 2026/252, 426, 473, 734, and healthcare amendments 2025/1537, 1739 and 2026/203, 791, 972, 986, 1007 have not all been conclusively checked against their cited articles. G-7 through G-11 also remain open. This is a dated legal-source snapshot; re-check future effective amendments before later use.

## Severity key

- **BLOCKER** — Do not calculate or display a personalized amount that depends on this rule until verified.
- **IMPORTANT** — Scope the feature, gather additional inputs, or expose a limitation before relying on the rule; the gap may block a particular scenario or result component.
- **NON-BLOCKING** — Does not prevent the narrowly scoped standard UoP estimate, but must be addressed before supporting the affected user or edge case.

## Blockers checked in the third pass

G-1 through G-5 remain unresolved. G-6 is **closed for the standard PPK legal rule set as of 2026-10-27**. The source findings below do not cover monthly payroll advances, exceptional profiles, individual eligibility, or future legislative changes.

### G-1 — OPEN: 2026 general-scale PIT brackets

- **Classification:** BLOCKER
- **Unresolved values:** Candidate 12% up to PLN 120,000 and 32% on the excess.
- **Why evidence is insufficient:** The Ministry of Finance rates page (published/updated 2025-12-15) and [PIT Act, Dz.U. 2026 poz. 592](https://dziennikustaw.gov.pl/DU/2026/592), Art. 27(1), support the quoted scale, but Dz.U. 2026 poz. 846 amended the PIT Act effective 2026-10-01. The exact effect on Art. 27 has not been conclusively inspected. A separate Act, Dz.U. 2026 poz. 1371, is scheduled to enter into force 2026-11-05 and also requires rechecking before later use.
- **Exact material to inspect:** [Dz.U. 2026 poz. 846](https://dziennikustaw.gov.pl/DU/2026/846), every amendment to the PIT Act, especially whether Art. 27 was changed or is affected; then verify the effective wording in the current PIT Act. Also review 2026/1371 before use after its effective date.
- **Blocks implementation:** Yes, annual PIT and any dependent net-income estimate.
- **Safe behavior:** Keep PIT unavailable; do not use the candidate rates until the amendment check is complete.

### G-2 — OPEN: 2026 tax-free and tax-reducing amounts

- **Classification:** BLOCKER
- **Unresolved values:** Candidate PLN 3,600 annual tax-reducing amount; PLN 30,000 descriptive tax-free amount derived by dividing by 12%.
- **Why evidence is insufficient:** Art. 27(1) of Dz.U. 2026 poz. 592 and the Ministry rates page support the candidate values, but the effect of Dz.U. 2026 poz. 846, effective 2026-10-01, on Art. 27 has not been conclusively inspected.
- **Exact material to inspect:** [Dz.U. 2026 poz. 846](https://dziennikustaw.gov.pl/DU/2026/846), amendment text affecting the PIT Act and Art. 27; confirm the current operative clause. The PLN 30,000 figure must remain identified as a derivation, not a quoted statutory amount.
- **Blocks implementation:** Yes, annual PIT and any dependent net-income estimate.
- **Safe behavior:** Do not use the candidate values or derive a substitute from another year; monthly allocation separately remains G-8.

### G-3 — OPEN: 2026 standard employee KUP

- **Classification:** BLOCKER
- **Unresolved values:** Candidate PLN 250/month and PLN 3,000/year for one ordinary employment relationship.
- **Why evidence is insufficient:** The Ministry employment-income page explicitly gives 2026 values but was updated 2026-09-30, before Dz.U. 2026 poz. 846 became effective on 2026-10-01. The effect of that Act on PIT Act Art. 22 has not been conclusively inspected.
- **Exact material to inspect:** [Dz.U. 2026 poz. 846](https://dziennikustaw.gov.pl/DU/2026/846), amendments to the PIT Act, especially Art. 22; then confirm the current operative KUP provisions and the Ministry page's applicability.
- **Blocks implementation:** Yes, a taxable-income/PIT estimate applying standard KUP.
- **Safe behavior:** Do not apply the candidate KUP until the post-amendment Art. 22 text is confirmed. Validate commuter and multiple-employer variants separately.

### G-4 — OPEN: 2026 UoP employee social-insurance shares

- **Classification:** BLOCKER
- **Candidate values:** Pension 9.76% employee / 19.52% total; disability 1.50% employee / 8.00% total; sickness 2.45% employee / 2.45% total.
- **Why evidence is insufficient:** [Social Insurance System Act, Dz.U. 2026 poz. 199](https://dziennikustaw.gov.pl/DU/2026/199), Arts. 16(1), 16(1b), 16(2), and 22(1)(1)–(3), supports these shares in the consolidation. However, the subsequent Acts 2026/252, 426, 473, and 734 have not all been checked against these articles.
- **Exact material to inspect:** The cited provisions and amendment clauses in [Dz.U. 2026 poz. 252](https://dziennikustaw.gov.pl/DU/2026/252), [poz. 426](https://dziennikustaw.gov.pl/DU/2026/426), [poz. 473](https://dziennikustaw.gov.pl/DU/2026/473), and [poz. 734](https://dziennikustaw.gov.pl/DU/2026/734); confirm whether any changes apply to Arts. 16 or 22 by the 2026 date.
- **Blocks implementation:** Yes, mandatory employee contributions and dependent net income.
- **Safe behavior:** Do not calculate from these candidate shares until the amendment check is complete; do not substitute self-employed ZUS rates.

### G-5 — OPEN: 2026 UoP health-contribution rate and base

- **Classification:** BLOCKER
- **Candidate rule:** 9% of the employee health-insurance base; the ordinary base follows the relevant pension/disability base rules and is reduced by employee-funded pension, disability, and sickness contributions withheld by the payer.
- **Why evidence is insufficient:** The current consolidation [Health Care Services Financed from Public Funds Act, Dz.U. 2025 poz. 1461](https://dziennikustaw.gov.pl/DU/2025/1461), Arts. 79(1), 81(1), and 81(6), supports the candidate rule. The listed subsequent amendments 2025/1537, 2025/1739, 2026/203, 2026/791, 2026/972, 2026/986, and 2026/1007 have not all been checked against Arts. 79 and 81.
- **Exact material to inspect:** The cited articles and amendment clauses in those post-consolidation Acts; determine whether the ordinary employee rate/base changed by the 2026 date.
- **Blocks implementation:** Yes, health contribution and dependent net income.
- **Safe behavior:** Do not calculate the employee health contribution from the candidate rule until the amendments are checked. Atypical remuneration and cross-border cases remain G-9.

### G-6 — CLOSED: 2026 PPK basic contributions and state-payment rules

- **Former classification:** BLOCKER
- **Verified values/conditions:** Employee basic contribution 2% and employer basic contribution 1.5%; welcome payment PLN 250 subject to Article 31 conditions; annual state payment PLN 240 subject to Article 32 thresholds/exclusions, including the reduced-rate provisions.
- **Official evidence:** [PPK Act, Dz.U. 2026 poz. 192](https://dziennikustaw.gov.pl/DU/2026/192), Arts. 26(1), 27(1)–(2), 31(1)–(3), and 32(1)–(6). Art. 26(1) states “1,5% wynagrodzenia”; Art. 27(1) states “2% wynagrodzenia”; Art. 31(1) states “w wysokości 250 zł” and gives participation/payment conditions; Art. 32(1) states “w wysokości 240 zł”. The only post-consolidation amendment, Dz.U. 2026 poz. 989, changes Art. 8, not these provisions.
- **Safe boundary:** The law’s amounts and conditions are verified, but a person’s participation, contribution record, prior welcome-payment credit, and annual entitlement remain user-specific (G-10).

## Gaps requiring resolution

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

## Third-pass current source audit

The source audit covers the URLs in the current rule register and the historical URLs retained in the second-pass evidence log. **No non-official domains were found.** Current support and older/superseded references are distinguished below.

| Official URL | Domain/status | Support, date, and limitation |
|---|---|---|
| `https://www.podatki.gov.pl/podatki-osobiste/pit/stawki-i-limity` | Official Ministry of Finance; opened and inspected | “Skala podatkowa” gives the 12%/PLN 120,000 and 32% scale and PLN 3,600 reduction, describes it as applying from 2022, and is dated 2025-12-15. It supports the candidate wording, but G-1/G-2 remain blocked because the effect of Dz.U. 2026 poz. 846 has not been checked. |
| `https://www.podatki.gov.pl/podatki-osobiste/pit/informacje-podstawowe/co-jest-opodatkowane/dochody-z-pracy` | Official Ministry of Finance; opened and inspected | Employment-income page explicitly gives 2026 KUP values and was updated 2026-09-30, before Dz.U. 2026 poz. 846 took effect. Supports the candidate wording but does not close G-3. |
| `https://dziennikustaw.gov.pl/DU/2026/592` | Official Dziennik Ustaw record/PDF; current PIT consolidation opened and inspected | Art. 27(1) supports the candidate scale/reduction; Art. 22(2) supports candidate KUP. In force with legal status 2026-04-01. Dz.U. 2026 poz. 846 amended the PIT Act effective 2026-10-01; its effect on Arts. 22 and 27 is unresolved, so these rules remain blocked. Dz.U. 2026 poz. 1371 is scheduled to enter into force 2026-11-05 and requires rechecking before later use. |
| `https://dziennikustaw.gov.pl/DU/2026/199` | Official Dziennik Ustaw record/PDF; current Social Insurance System Act consolidation opened and inspected | Arts. 16 and 22 support candidate UoP employee/payer allocations and total rates. The post-consolidation amendments 2026/252, 426, 473, and 734 have not all been checked for those articles; G-4 remains blocked. |
| `https://dziennikustaw.gov.pl/DU/2025/1461` | Official Dziennik Ustaw record/PDF; current healthcare Act consolidation opened and inspected | Arts. 79(1), 81(1), and 81(6) support the candidate employee rate/base. The later listed amendments 2025/1537, 2025/1739 and 2026/203, 791, 972, 986, 1007 have not all been checked for Arts. 79 and 81; G-5 remains blocked. |
| `https://dziennikustaw.gov.pl/DU/2026/192` | Official Dziennik Ustaw record/PDF; current PPK Act consolidation opened and inspected | Arts. 26, 27, 31, and 32 support PPK rates and state-payment conditions. The sole later amendment, [Dz.U. 2026 poz. 989](https://dziennikustaw.gov.pl/DU/2026/989), changes Art. 8, not these provisions. Supports legal rules in G-6; personal entitlement remains G-10. |
| `https://www.mojeppk.pl/faq.html` | Official PFR Portal PPK; opened and inspected | Corroborates standard contribution/state-payment headline values but is not year-versioned and does not replace the current Act or establish personal entitlement. |
| `https://www.zus.pl/-/nowe-wysoko%C5%9Bci-sk%C5%82adek-na-ubezpieczenia-spo%C5%82eczne-w-2026-r.?redirect=%2Fo-zus%2Faktualnosci` | Official ZUS; opened and inspected | Dated 2025-12-30; supports the 2026 annual ceiling (PLN 282,600). The contribution schedules concern specified groups and are not used to establish UoP employee contribution shares. |
| `https://www.gov.pl/web/rodzina/ikze-limit-wplat` | Official MRPiPS; opened and inspected | Explicitly states the 2026 ordinary and qualifying-business IKZE caps and cites Monitor Polski 2025 poz. 1156. Supports general limit facts only, not personal headroom or tax savings (G-11). |
| `https://www.gov.pl/web/rodzina/ikze-indywidualne-konto-zabezpieczenia-emerytalnego` | Official MRPiPS; accessible, but last modified 2018-08-27 | Its deduction/10% treatment overview does not establish current 2026 tax conditions. Insufficient for G-7. |
| `https://api.sejm.gov.pl/eli/acts/DU/2026/592` and corresponding 2026/199, 2025/1461, and 2026/192 metadata endpoints | Official ELI API; accessible metadata | Metadata identifies legal records and status, but it is not the article text. Use the linked Dziennik Ustaw PDF records above for statutory quotations. |
| Historical second-pass URLs: Dz.U. 2025 poz. 163, Dz.U. 2025 poz. 350, Dz.U. 2024 poz. 146, Dz.U. 2024 poz. 427 and related ELI API records | Official sources, but superseded for current legal-status evidence | These links in the historical second-pass log remain official and support the quoted text for their own versions. They do not prove 2026 applicability. `https://eli.gov.pl/api/acts/DU/2024/1461/text.html` is an accessible but unrelated early-election regulation and is not the healthcare Act; do not rely on it. `https://eli.gov.pl/api/acts/DU/1991/350/text.html` is the historical original PIT Act, not a current consolidation. |

### Link-review summary

- **Non-official domains:** None found.
- **Broken/inaccessible links:** No cited URL was confirmed as a definite broken link during the checks. The old position-1461 healthcare citation is not a broken URL; it resolves to an unrelated legal instrument. Some ELI API URLs return metadata only, not the statutory text.
- **Sources that do not support the associated claim:** Old PIT/social/health/PPK consolidations support only their own text versions, not current 2026 applicability. The old election regulation at position 1461 does not support healthcare rules. ZUS self-employed contribution schedules do not establish UoP employee shares. MojePPK pages corroborate but do not replace the statute or establish an individual’s account history. The 2018 IKZE overview is not sufficient for current tax treatment.
- **Sources with applicable date/effective period:** The Ministry pages provide date context (scale “from 2022”, page date 2025-12-15; KUP explicitly for 2026, updated 2026-09-30), but the October 2026 PIT amendment leaves G-1 through G-3 blocked. PPK legal text and amendment check establish G-6 for the 2026-10-27 snapshot. Social and health rates remain candidate values until the listed post-consolidation amendments are checked. The 2026/1371 PIT amendment is not effective until 2026-11-05, so later use requires rechecking.
- **Access date:** 2026-10-27. Per-rule publication/effective information is recorded in [TAX_RULES_RESEARCH.md](./TAX_RULES_RESEARCH.md).

## Historical second-pass URL audit

The following table and summary record the second-pass findings only. Their statements that 2026 applicability was unverified are historical and are superseded by the third-pass status above, except for PIT G-1 through G-3, which remain blocked pending review of Dz.U. 2026 poz. 846.

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

G-6 is closed for the standard PPK legal rules as of 2026-10-27 and may be used as a rule input for that dated scope. G-1 through G-5 remain blockers; do not calculate PIT, employee social contributions, health contributions, or dependent net income until their post-consolidation amendment checks are complete. The separate G-7 IKZE tax-treatment blocker, monthly payroll withholding (G-8), atypical profiles (G-9), and individual PPK/IKZE entitlement (G-10/G-11) also remain open. Re-check the legislation before use after 2026-11-05, when Dz.U. 2026 poz. 1371 is scheduled to enter into force. The second-pass PIT values remain provisional pending the 2026/846 check; current-source findings do not override the unresolved amendments.
