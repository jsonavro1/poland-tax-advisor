# Poland Tax & Pension Advisor

## Product overview

Poland Tax & Pension Advisor is a web application that interviews a person working in Poland, collects the information needed to estimate their taxes and retirement savings, and presents personalized results. It is an informational estimation tool, not a substitute for professional advice.

## User profile

The application must collect and display the following profile information:

- Monthly income in PLN.
- Whether the entered income is gross or net.
- Employment type: employment contract (UoP), contract of mandate (Umowa Zlecenie), or business-to-business (B2B).
- Whether the user is a tax resident of Poland.
- Legal basis for access to the Polish labour market: temporary residence permit, permanent residence permit, EU long-term resident permit, EU Blue Card, or Polish citizenship.
- Age.
- Marital status.
- Number of children.
- Participation status and relevant inputs for PPK, IKE, and IKZE.

The interview must make clear which information is required to produce each estimate. It must not infer missing profile details or treat unknown information as confirmed.

## Required outputs

Based on the collected profile and clearly disclosed assumptions, the application must provide:

- A monthly breakdown of estimated taxes and mandatory contributions.
- An annual summary of estimated taxes, mandatory contributions, and income.
- Estimated net income.
- The effective tax and contribution rate, with its calculation basis made clear.
- PPK employee and employer contribution estimates.
- IKE and IKZE savings scenarios.
- Retirement savings projections for 1, 5, 10, 15, and 20 years.
- A comparison of the available or selected scenarios.
- Possible legal tax optimization options, with relevant eligibility conditions and limitations explained.

Where the profile or available rules do not support a reliable result, the application must identify the missing or uncertain information rather than present an unsupported estimate.

## Calculation and tax-rule requirements

- Financial calculations must be performed by deterministic calculation functions. AI-generated arithmetic must not be used to calculate or alter financial results.
- Tax, ZUS, and pension rules used in calculations must be traceable to official Polish sources.
- Every rule must include its source URL and effective date. The application must use the applicable rule for the relevant calculation period and make that period clear.
- Calculation results must be reproducible from the same user inputs, assumptions, and rule versions.
- The application must distinguish user-provided facts from assumptions and calculated values.
- Assumptions that affect a result must be visible to the user alongside that result.
- Uncertain, unavailable, or unverified information must never be invented or presented as fact.
- Scenario comparisons must state the inputs and assumptions that differ between scenarios.

## User communication and limitations

- The application must state clearly that all results are estimates.
- The application must state that it does not replace professional tax, legal, or investment advice.
- Results and optimization options must not be presented as guaranteed outcomes or as a substitute for checking individual eligibility.
- The application must explain when a result depends on incomplete information, an assumption, or a rule whose applicability requires confirmation.
