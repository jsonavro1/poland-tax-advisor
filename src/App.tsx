import { useState, type FormEvent } from "react";
import {
  calculateEmployeeSocialInsurance,
  calculateIkzeContributionProjection,
  calculatePpkEmployeeContribution,
  calculatePpkEmployerContribution,
  calculatePpkStateContribution,
  projectMonthlySavings,
} from "./calculations";
import { rules2026 } from "./rules";

type SubmittedProfile = {
  monthlyIncome: number;
  incomeType: string;
  employmentType: string;
  annualBaseUsed: number | null;
  ppkStatus: string;
  ikzeStatus: string;
  ppkContribution: number | null;
  ikzeContribution: number | null;
  ikzeBusinessActivity: string;
  monthsRemaining: number | null;
  ikzeContributedToDate: number | null;
  savingsContribution: number | null;
  annualReturnPercent: number | null;
};

function optionalNumber(data: FormData, name: string) {
  const value = data.get(name);
  return value === null || value === "" ? null : Number(value);
}

function App() {
  const [profile, setProfile] = useState<SubmittedProfile | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setProfile({
      monthlyIncome: Number(data.get("monthlyIncome")),
      incomeType: String(data.get("incomeType")),
      employmentType: String(data.get("employmentType")),
      annualBaseUsed: optionalNumber(data, "annualBaseUsed"),
      ppkStatus: String(data.get("ppkStatus") ?? ""),
      ikzeStatus: String(data.get("ikzeStatus") ?? ""),
      ppkContribution: optionalNumber(data, "ppkContribution"),
      ikzeContribution: optionalNumber(data, "ikzeContribution"),
      ikzeBusinessActivity: String(data.get("ikzeBusinessActivity") ?? ""),
      monthsRemaining: optionalNumber(data, "monthsRemaining"),
      ikzeContributedToDate: optionalNumber(data, "ikzeContributedToDate"),
      savingsContribution: optionalNumber(data, "savingsContribution"),
      annualReturnPercent: optionalNumber(data, "annualReturnPercent"),
    });
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#" aria-label="Poland Tax & Pension Advisor home">
          <span className="brand-mark" aria-hidden="true">
            P
          </span>
          <span className="brand-name">
            Poland Tax
            <span className="brand-divider">&amp;</span>
            Pension Advisor
          </span>
        </a>
        <span className="header-note">A clearer view of your finances</span>
      </header>

      <main>
        <section className="hero" aria-labelledby="page-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-dot" aria-hidden="true" />
              YOUR FINANCIAL OVERVIEW
            </p>
            <h1 id="page-title">Poland Tax &amp; Pension Advisor</h1>
            <p className="hero-description">
              Start with a few details about your work and circumstances. Your
              information helps shape a personal overview of taxes and retirement
              planning in Poland.
            </p>
          </div>
          <div className="hero-art" aria-hidden="true">
            <span className="art-orbit orbit-one" />
            <span className="art-orbit orbit-two" />
            <span className="art-sun" />
            <span className="art-hill hill-back" />
            <span className="art-hill hill-front" />
            <span className="art-stem" />
            <span className="art-leaf leaf-one" />
            <span className="art-leaf leaf-two" />
          </div>
        </section>

        <div className="content-grid">
          <section className="form-card" aria-labelledby="profile-title">
            <div className="section-heading">
              <div>
                <p className="step-label">YOUR PROFILE <span>01 / 01</span></p>
                <h2 id="profile-title">Tell us about yourself</h2>
                <p className="section-intro">
                  Share a few details to get started. Fields marked with{" "}
                  <span className="required-mark" aria-label="required">*</span>{" "}
                  are required.
                </p>
              </div>
              <span className="form-icon" aria-hidden="true">✳</span>
            </div>

            <form onSubmit={handleSubmit}>
              <fieldset className="form-section">
                <legend>
                  <span className="legend-number">01</span>
                  Work &amp; income
                </legend>
                <div className="field-grid">
                  <label className="field field-wide" htmlFor="monthly-income">
                    <span className="field-label">
                      Monthly income <span className="required-mark">*</span>
                    </span>
                    <span className="input-with-suffix">
                      <input
                        id="monthly-income"
                        name="monthlyIncome"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Enter your monthly amount"
                        required
                      />
                      <span className="input-suffix">PLN</span>
                    </span>
                    <span className="field-hint">Before or after deductions — choose below.</span>
                  </label>

                  <label className="field" htmlFor="income-type">
                    <span className="field-label">
                      Income amount is <span className="required-mark">*</span>
                    </span>
                    <select id="income-type" name="incomeType" defaultValue="" required>
                      <option value="" disabled>Select gross or net</option>
                      <option value="gross">Gross</option>
                      <option value="net">Net</option>
                    </select>
                  </label>

                  <label className="field" htmlFor="employment-type">
                    <span className="field-label">
                      Employment type <span className="required-mark">*</span>
                    </span>
                    <select
                      id="employment-type"
                      name="employmentType"
                      defaultValue=""
                      required
                    >
                      <option value="" disabled>Select your arrangement</option>
                      <option value="uop">Employment contract (UoP)</option>
                      <option value="umowa-zlecenie">Contract of mandate (Umowa Zlecenie)</option>
                      <option value="b2b">Business-to-business (B2B)</option>
                    </select>
                  </label>
                  <label className="field field-wide" htmlFor="annual-base-used">
                    <span className="field-label">
                      Pension/disability contribution base already used in 2026{" "}
                      <span className="optional-label">optional</span>
                    </span>
                    <span className="input-with-suffix">
                      <input
                        id="annual-base-used"
                        name="annualBaseUsed"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Not provided"
                      />
                      <span className="input-suffix">PLN</span>
                    </span>
                    <span className="field-hint">
                      Enter the cumulative base before the current month; include relevant base from other payers if known.
                    </span>
                  </label>
                </div>
              </fieldset>

              <fieldset className="form-section">
                <legend>
                  <span className="legend-number">02</span>
                  Personal details
                </legend>
                <div className="field-grid">
                  <label className="field" htmlFor="tax-residency">
                    <span className="field-label">
                      Tax resident in Poland? <span className="required-mark">*</span>
                    </span>
                    <select id="tax-residency" name="taxResidency" defaultValue="" required>
                      <option value="" disabled>Select an answer</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                      <option value="unsure">I'm not sure</option>
                    </select>
                  </label>

                  <label className="field" htmlFor="market-access">
                    <span className="field-label">Basis for labour market access</span>
                    <select id="market-access" name="marketAccess" defaultValue="">
                      <option value="" disabled>Select if applicable</option>
                      <option value="temporary-residence">Temporary residence permit</option>
                      <option value="permanent-residence">Permanent residence permit</option>
                      <option value="eu-long-term-resident">EU long-term resident permit</option>
                      <option value="eu-blue-card">EU Blue Card</option>
                      <option value="polish-citizenship">Polish citizenship</option>
                      <option value="other-or-unsure">Other or unsure</option>
                    </select>
                  </label>

                  <label className="field" htmlFor="age">
                    <span className="field-label">
                      Age <span className="required-mark">*</span>
                    </span>
                    <span className="input-with-suffix">
                      <input
                        id="age"
                        name="age"
                        type="number"
                        min="0"
                        max="120"
                        step="1"
                        placeholder="Your age"
                        required
                      />
                      <span className="input-suffix">years</span>
                    </span>
                  </label>

                  <label className="field" htmlFor="marital-status">
                    <span className="field-label">
                      Marital status <span className="required-mark">*</span>
                    </span>
                    <select
                      id="marital-status"
                      name="maritalStatus"
                      defaultValue=""
                      required
                    >
                      <option value="" disabled>Select your status</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="widowed">Widowed</option>
                      <option value="other-or-unsure">Other or unsure</option>
                    </select>
                  </label>

                  <label className="field field-half" htmlFor="children">
                    <span className="field-label">
                      Number of children <span className="required-mark">*</span>
                    </span>
                    <input
                      id="children"
                      name="children"
                      type="number"
                      min="0"
                      step="1"
                      placeholder="0"
                      required
                    />
                  </label>
                </div>
              </fieldset>

              <fieldset className="form-section savings-section">
                <legend>
                  <span className="legend-number">03</span>
                  Savings &amp; pension
                </legend>
                <p className="section-intro savings-intro">
                  Add what you know. These details are optional for now.
                </p>
                <div className="savings-grid">
                  <SavingsField name="ppk" title="PPK" description="Employee capital plan" />
                  <SavingsField name="ike" title="IKE" description="Individual retirement account" />
                  <SavingsField
                    name="ikze"
                    title="IKZE"
                    description="Individual retirement security account"
                  />
                </div>
                <div className="projection-inputs">
                  <p className="field-label">Savings projection assumptions</p>
                  <p className="field-hint">
                    These inputs create a generic savings scenario; they are not treated as verified PPK or IKZE rules.
                  </p>
                  <div className="field-grid">
                    <label className="field" htmlFor="savings-contribution">
                      <span className="field-label">
                        Monthly amount to project <span className="optional-label">optional</span>
                      </span>
                      <span className="input-with-suffix">
                        <input
                          id="savings-contribution"
                          name="savingsContribution"
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="Not provided"
                        />
                        <span className="input-suffix">PLN</span>
                      </span>
                    </label>
                    <label className="field" htmlFor="annual-return">
                      <span className="field-label">
                        Assumed annual return <span className="optional-label">optional</span>
                      </span>
                      <span className="input-with-suffix">
                        <input
                          id="annual-return"
                          name="annualReturnPercent"
                          type="number"
                          min="-99.99"
                          max="100"
                          step="0.01"
                          placeholder="Not provided"
                        />
                        <span className="input-suffix">%</span>
                      </span>
                    </label>
                  </div>
                </div>
              </fieldset>

              <div className="form-footer">
                <p>
                  Calculations run locally in your browser. Your answers are not sent to an account or service.
                </p>
                <button className="submit-button" type="submit">
                  Show available results
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </form>
            {profile && <Results profile={profile} />}
          </section>

          <aside className="sidebar">
            <section className="sidebar-card why-card">
              <div className="sidebar-icon" aria-hidden="true">✳</div>
              <p className="sidebar-kicker">A GOOD PLACE TO START</p>
              <h2>Clarity begins with context.</h2>
              <p>
                A few personal details can shape how work, contributions, and
                long-term saving are understood.
              </p>
              <div className="sidebar-divider" />
              <ul className="feature-list">
                <li><span aria-hidden="true">✓</span> A guided profile questionnaire</li>
                <li><span aria-hidden="true">✓</span> Clear assumptions and sources</li>
                <li><span aria-hidden="true">✓</span> Estimates, not guesswork</li>
              </ul>
            </section>

            <section className="sidebar-card note-card">
              <span className="note-icon" aria-hidden="true">i</span>
              <div>
                <h3>Early version</h3>
                <p>
                  PIT, health-insurance, verified PPK, and personalized tax
                  results are unavailable. Only sourced rules and user-entered
                  savings assumptions are used below.
                </p>
              </div>
            </section>
          </aside>
        </div>
      </main>

      <footer className="site-footer">
        <span>Poland Tax &amp; Pension Advisor</span>
        <p>
          This application is in development. It does not provide tax, legal,
          or investment advice.
        </p>
      </footer>
    </div>
  );
}

type SavingsFieldProps = {
  name: "ppk" | "ike" | "ikze";
  title: string;
  description: string;
};

function SavingsField({ name, title, description }: SavingsFieldProps) {
  return (
    <div className="savings-card">
      <div className="savings-card-heading">
        <span className={`savings-badge ${name}`}>{title}</span>
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
      <label className="field" htmlFor={`${name}-status`}>
        <span className="field-label">Participation</span>
        <select id={`${name}-status`} name={`${name}Status`} defaultValue="">
          <option value="">Not provided</option>
          <option value="participating">Participating</option>
          <option value="not-participating">Not participating</option>
          <option value="unsure">I'm not sure</option>
        </select>
      </label>
      <label className="field" htmlFor={`${name}-contribution`}>
        <span className="field-label">Monthly contribution <span className="optional-label">optional</span></span>
        <span className="input-with-suffix">
          <input
            id={`${name}-contribution`}
            name={`${name}Contribution`}
            type="number"
            min="0"
            step="0.01"
            placeholder="Not provided"
          />
          <span className="input-suffix">PLN</span>
        </span>
      </label>
      {name === "ikze" && (
        <>
          <label className="field" htmlFor="ikze-business-activity">
            <span className="field-label">Qualifying business activity</span>
            <select id="ikze-business-activity" name="ikzeBusinessActivity" defaultValue="">
              <option value="">Not provided</option>
              <option value="no">No</option>
              <option value="yes">Yes</option>
              <option value="unsure">I'm not sure</option>
            </select>
          </label>
          <label className="field" htmlFor="months-remaining">
            <span className="field-label">Planned monthly payments remaining in 2026</span>
            <input
              id="months-remaining"
              name="monthsRemaining"
              type="number"
              min="0"
              max="12"
              step="1"
              placeholder="Not provided"
            />
          </label>
          <label className="field" htmlFor="ikze-contributed-to-date">
            <span className="field-label">IKZE paid in 2026 so far</span>
            <span className="input-with-suffix">
              <input
                id="ikze-contributed-to-date"
                name="ikzeContributedToDate"
                type="number"
                min="0"
                step="0.01"
                placeholder="Not provided"
              />
              <span className="input-suffix">PLN</span>
            </span>
          </label>
        </>
      )}
    </div>
  );
}

function Results({ profile }: { profile: SubmittedProfile }) {
  const savingsContribution = profile.savingsContribution;
  const annualReturnPercent = profile.annualReturnPercent;
  const socialInsurance =
    profile.employmentType === "uop" && profile.incomeType === "gross"
      ? calculateEmployeeSocialInsurance(
          profile.monthlyIncome,
          profile.annualBaseUsed ?? undefined,
          2026,
        )
      : {
          status: "unavailable" as const,
          message: "Available only for a gross UoP profile after employee rates are verified.",
        };
  const ppkEmployee = calculatePpkEmployeeContribution(profile.monthlyIncome, 2026);
  const ppkEmployer = calculatePpkEmployerContribution(profile.monthlyIncome, 2026);
  const ppkState = calculatePpkStateContribution(undefined, 2026);
  const ikzeProjection =
    profile.ikzeBusinessActivity === "no" &&
    profile.ikzeContribution !== null &&
    profile.monthsRemaining !== null &&
    profile.ikzeContributedToDate !== null
      ? calculateIkzeContributionProjection(
          profile.ikzeContribution,
          profile.monthsRemaining,
          profile.ikzeContributedToDate,
          rules2026.ikzeAnnualContributionLimit,
          2026,
        )
      : null;
  const savingsProjections =
    savingsContribution !== null && annualReturnPercent !== null
      ? [1, 5, 10, 15, 20].map((years) =>
          projectMonthlySavings(
            savingsContribution,
            annualReturnPercent,
            years,
          ),
        )
      : null;

  return (
    <section className="results-card" aria-labelledby="results-title" aria-live="polite">
      <p className="step-label">DETERMINISTIC RESULTS</p>
      <h2 id="results-title">Your available results</h2>
      <p className="results-intro">
        Unsupported calculations remain unavailable; no PIT rates or unverified contribution rules are used.
      </p>

      <section className="result-group">
        <h3>Employee contributions</h3>
        <p>
          <strong>Monthly income entered:</strong> PLN {profile.monthlyIncome.toFixed(2)}{" "}
          ({profile.incomeType}; {profile.employmentType})
        </p>
        <p>
          <strong>UoP social insurance:</strong>{" "}
          {socialInsurance.status === "unavailable"
            ? "Unavailable until verified"
            : `PLN ${socialInsurance.value.total.toFixed(2)}`}
        </p>
        {socialInsurance.status === "unavailable" && <p className="result-detail">{socialInsurance.message}</p>}
        <p><strong>Health contribution and net income:</strong> Unavailable until verified</p>
        <p><strong>PIT and effective rate:</strong> Unavailable until verified</p>
      </section>

      <section className="result-group">
        <h3>Employer and PPK contributions</h3>
        <p>
          <strong>PPK employee contribution:</strong>{" "}
          {ppkEmployee.status === "unavailable"
            ? "Unavailable until verified"
            : `PLN ${ppkEmployee.value.toFixed(2)}`}
        </p>
        <p>
          <strong>PPK employer contribution:</strong>{" "}
          {ppkEmployer.status === "unavailable"
            ? "Unavailable until verified"
            : `PLN ${ppkEmployer.value.toFixed(2)}`}
        </p>
        <p>
          <strong>PPK state payments:</strong>{" "}
          {ppkState.status === "unavailable"
            ? "Unavailable until verified"
            : `PLN ${ppkState.value.toFixed(2)}`}
        </p>
      </section>

      <section className="result-group">
        <h3>IKZE contribution scenario</h3>
        {ikzeProjection?.status === "available" ? (
          <>
            <p>
              Planned contributions within the verified 2026 annual limit:{" "}
              <strong>PLN {ikzeProjection.value.allowedAdditionalContribution.toFixed(2)}</strong>
            </p>
            <p className="result-detail">
              Projected 2026 total including the amount you entered as already paid: PLN{" "}
              {ikzeProjection.value.projectedYearTotal.toFixed(2)}. This is not a tax-saving or investment estimate.
            </p>
            <p className="result-detail">
              Uses the ordinary 2026 limit because you indicated no qualifying business activity; remaining months and prior deposits are your inputs.
            </p>
          </>
        ) : (
          <p>
            {ikzeProjection?.status === "unavailable"
              ? `Unavailable: ${ikzeProjection.message}`
              : "Unavailable until the required personal inputs are provided."}
          </p>
        )}
      </section>

      <section className="result-group">
        <h3>Retirement savings projections</h3>
        {savingsProjections &&
        savingsContribution !== null &&
        annualReturnPercent !== null ? (
          <>
            <p className="result-detail">
              Generic savings scenario only. Uses a PLN 0 starting balance, the monthly amount and annual return you entered; it does not apply PPK/IKZE rules or future contribution limits.
            </p>
            <p className="result-detail">
              Monthly amount: PLN {savingsContribution.toFixed(2)}; annual return assumption: {annualReturnPercent.toFixed(2)}% effective, with deposits at each month-end.
            </p>
            <div className="projection-table" role="table" aria-label="Savings projections">
              <div className="projection-row projection-header" role="row">
                <span role="columnheader">Years</span>
                <span role="columnheader">Contributions</span>
                <span role="columnheader">Projected balance</span>
              </div>
              {savingsProjections.map((projection) =>
                projection.status === "available" ? (
                  <div className="projection-row" role="row" key={projection.value.years}>
                    <span role="cell">{projection.value.years}</span>
                    <span role="cell">PLN {projection.value.contributions.toFixed(2)}</span>
                    <span role="cell">PLN {projection.value.projectedBalance.toFixed(2)}</span>
                  </div>
                ) : null,
              )}
            </div>
          </>
        ) : (
          <p>Unavailable until a monthly savings amount and an explicit annual return assumption are provided.</p>
        )}
      </section>

      <section className="result-group">
        <h3>Verified rules, assumptions, and sources</h3>
        <ul className="source-list">
          <li>
            2026 IKZE general annual limit: PLN{" "}
            {rules2026.ikzeAnnualContributionLimit.value.toLocaleString("pl-PL")} —{" "}
            <a href={rules2026.ikzeAnnualContributionLimit.sourceUrl} target="_blank" rel="noreferrer">
              MRPiPS official limit notice
            </a>{" "}
            (effective {rules2026.ikzeAnnualContributionLimit.effectivePeriod}; verified; accessed{" "}
            {rules2026.ikzeAnnualContributionLimit.accessedAt}).
          </li>
          <li>
            2026 pension/disability annual base ceiling: PLN{" "}
            {rules2026.socialInsuranceAnnualCeiling.value.toLocaleString("pl-PL")} —{" "}
            <a href={rules2026.socialInsuranceAnnualCeiling.sourceUrl} target="_blank" rel="noreferrer">
              ZUS official rates and limits
            </a>{" "}
            (effective {rules2026.socialInsuranceAnnualCeiling.effectivePeriod}; verified; accessed{" "}
            {rules2026.socialInsuranceAnnualCeiling.accessedAt}). This ceiling alone does not enable contribution calculations.
          </li>
          <li>
            Rule-set version: {rules2026.version}. No PIT, health contribution, employee social rates, PPK rates, or PPK state-payment rules are applied because they remain unverified in the research gaps.
          </li>
        </ul>
        <p className="results-disclaimer">
          Estimates and user-defined scenarios only; this application does not replace professional tax, legal, or investment advice.
        </p>
      </section>
    </section>
  );
}

export default App;
