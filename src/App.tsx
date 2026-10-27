import { useState, type FormEvent } from "react";

function App() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
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

            {submitted && (
              <div className="notice" role="status">
                <span className="notice-icon" aria-hidden="true">✓</span>
                <div>
                  <strong>Your profile is ready for the next step.</strong>
                  <p>
                    This first version collects your details only. Tax,
                    contribution, and pension calculations are not available yet.
                  </p>
                </div>
              </div>
            )}

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
                  <SavingsField name="ikze" title="IKZE" description="Individual retirement security account" />
                </div>
              </fieldset>

              <div className="form-footer">
                <p>
                  Your answers are not sent to an account or service.
                </p>
                <button className="submit-button" type="submit">
                  Continue
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </form>
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
                  Calculations and personalized recommendations are not
                  available yet. No financial results will be shown in this
                  version.
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
    </div>
  );
}

export default App;
