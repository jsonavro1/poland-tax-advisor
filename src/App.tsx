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
import {
  createDemonstrationRegulatoryUpdateService,
  createRegulatoryCheckRequest,
  REGULATORY_MODES,
  REGULATORY_SOURCES,
  skipRegulatoryCheckMessage,
  type RegulatoryCheckMode,
  type RegulatoryUpdateReport,
} from "./regulatory";

const AI_BANNER =
  "AI-assisted application. Verify all calculations, sources, and effective dates before relying on the results. You remain responsible for decisions made using this application.";

const AI_FOOTER_NOTICE =
  "AI Transparency Notice: This application was created, enhanced, and is maintained with AI assistance. Its calculations and recommendations may contain errors or may not reflect the latest legal, tax, social-insurance, pension, or investment rules. You are responsible for reviewing the assumptions, sources, and effective dates before relying on any result. Use of this application and acceptance of its recommendations are at your own discretion and risk. This application does not provide professional tax, legal, pension, or investment advice.";

export type SubmittedProfile = {
  monthlyIncome: number;
  incomeType: "gross" | "net";
  employmentType: string;
  annualBaseUsed: number | null;
  ppkStatus: string;
  welcomeEligibility: "eligible" | "ineligible" | "unknown";
  annualEligibility: "eligible" | "ineligible" | "unknown";
  ikzeStatus: string;
  ikzeContribution: number | null;
  ikzeBusinessActivity: string;
  monthsRemaining: number | null;
  ikzeContributedToDate: number | null;
  savingsContribution: number | null;
  annualReturnPercent: number | null;
};

type UpdateSelection =
  | { status: "not-checked"; message: string }
  | { status: "skipped"; message: string }
  | { status: "report"; report: RegulatoryUpdateReport }
  | { status: "error"; message: string };

function optionalNumber(data: FormData, name: string) {
  const value = data.get(name);
  if (value === null || value === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

export function isCalculationConsentGranted(accepted: boolean) {
  return accepted;
}

function App() {
  const [profile, setProfile] = useState<SubmittedProfile | null>(null);
  const [consent, setConsent] = useState(false);
  const [updateSelection, setUpdateSelection] = useState<UpdateSelection>({
    status: "not-checked",
    message: "No regulatory update check was performed for this session.",
  });
  const [pendingMode, setPendingMode] = useState<RegulatoryCheckMode | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isCalculationConsentGranted(consent)) return;

    const data = new FormData(event.currentTarget);
    const monthlyIncome = Number(data.get("monthlyIncome"));
    if (!Number.isFinite(monthlyIncome) || monthlyIncome < 0) {
      const incomeInput = event.currentTarget.elements.namedItem("monthlyIncome");
      if (incomeInput instanceof HTMLInputElement) incomeInput.focus();
      return;
    }

    setProfile({
      monthlyIncome,
      incomeType: String(data.get("incomeType")) as SubmittedProfile["incomeType"],
      employmentType: String(data.get("employmentType")),
      annualBaseUsed: optionalNumber(data, "annualBaseUsed"),
      ppkStatus: String(data.get("ppkStatus") ?? ""),
      welcomeEligibility: parseEligibility(data.get("welcomeEligibility")),
      annualEligibility: parseEligibility(data.get("annualEligibility")),
      ikzeStatus: String(data.get("ikzeStatus") ?? ""),
      ikzeContribution: optionalNumber(data, "ikzeContribution"),
      ikzeBusinessActivity: String(data.get("ikzeBusinessActivity") ?? ""),
      monthsRemaining: optionalNumber(data, "monthsRemaining"),
      ikzeContributedToDate: optionalNumber(data, "ikzeContributedToDate"),
      savingsContribution: optionalNumber(data, "savingsContribution"),
      annualReturnPercent: optionalNumber(data, "annualReturnPercent"),
    });
  }

  function handleSkip() {
    setPendingMode(null);
    setUpdateSelection({ status: "skipped", message: skipRegulatoryCheckMessage() });
  }

  async function approveRegulatoryCheck() {
    if (!pendingMode) return;
    setIsChecking(true);
    const request = createRegulatoryCheckRequest(
      pendingMode,
      rules2026.lastSuccessfulVerificationDate,
    );
    try {
      const report = await createDemonstrationRegulatoryUpdateService().check(request);
      setUpdateSelection({ status: "report", report });
      setPendingMode(null);
    } catch (error) {
      setUpdateSelection({
        status: "error",
        message:
          error instanceof Error
            ? `The regulatory update workflow failed: ${error.message}`
            : "The regulatory update workflow failed with an unexpected error.",
      });
    } finally {
      setIsChecking(false);
    }
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#" aria-label="Poland Tax & Pension Advisor home">
          <span className="brand-mark" aria-hidden="true">P</span>
          <span className="brand-name">
            Poland Tax <span className="brand-divider">&amp;</span> Pension Advisor
          </span>
        </a>
        <span className="header-note">A clearer view of your finances</span>
      </header>

      <main>
        <div className="ai-banner" role="note">{AI_BANNER}</div>
        <RegulatoryStatusPanel
          selection={updateSelection}
          onSkip={handleSkip}
          onChooseMode={setPendingMode}
        />
        {pendingMode && (
          <ApprovalDialog
            mode={pendingMode}
            isChecking={isChecking}
            onCancel={() => setPendingMode(null)}
            onApprove={approveRegulatoryCheck}
          />
        )}

        <section className="hero" aria-labelledby="page-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />YOUR FINANCIAL OVERVIEW</p>
            <h1 id="page-title">Poland Tax &amp; Pension Advisor</h1>
            <p className="hero-description">
              Share your profile to view the verified PPK amounts currently supported.
              Tax and other unresolved calculations remain unavailable.
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
                  Personal inputs stay in this browser session. Only gross UoP income can be used for the current PPK calculation.
                </p>
              </div>
              <span className="form-icon" aria-hidden="true">✳</span>
            </div>

            <form onSubmit={handleSubmit}>
              <fieldset className="form-section">
                <legend><span className="legend-number">01</span>Work &amp; income</legend>
                <div className="field-grid">
                  <label className="field field-wide" htmlFor="monthly-income">
                    <span className="field-label">Monthly income <span className="required-mark">*</span></span>
                    <span className="input-with-suffix">
                      <input id="monthly-income" name="monthlyIncome" type="number" min="0" step="0.01" required />
                      <span className="input-suffix">PLN</span>
                    </span>
                  </label>
                  <label className="field" htmlFor="income-type">
                    <span className="field-label">Income amount is <span className="required-mark">*</span></span>
                    <select id="income-type" name="incomeType" defaultValue="" required>
                      <option value="" disabled>Select gross or net</option>
                      <option value="gross">Gross</option>
                      <option value="net">Net</option>
                    </select>
                  </label>
                  <label className="field" htmlFor="employment-type">
                    <span className="field-label">Employment type <span className="required-mark">*</span></span>
                    <select id="employment-type" name="employmentType" defaultValue="" required>
                      <option value="" disabled>Select your arrangement</option>
                      <option value="uop">Employment contract (UoP)</option>
                      <option value="umowa-zlecenie">Contract of mandate (Umowa Zlecenie)</option>
                      <option value="b2b">Business-to-business (B2B)</option>
                    </select>
                  </label>
                  <label className="field field-wide" htmlFor="annual-base-used">
                    <span className="field-label">Pension/disability contribution base already used in 2026 <span className="optional-label">optional</span></span>
                    <span className="input-with-suffix">
                      <input id="annual-base-used" name="annualBaseUsed" type="number" min="0" step="0.01" />
                      <span className="input-suffix">PLN</span>
                    </span>
                    <span className="field-hint">Only relevant to the currently unavailable social contribution calculation.</span>
                  </label>
                </div>
              </fieldset>

              <fieldset className="form-section">
                <legend><span className="legend-number">02</span>Personal details</legend>
                <div className="field-grid">
                  <label className="field" htmlFor="tax-residency">
                    <span className="field-label">Tax resident in Poland? <span className="required-mark">*</span></span>
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
                    <span className="field-label">Age <span className="required-mark">*</span></span>
                    <span className="input-with-suffix">
                      <input id="age" name="age" type="number" min="0" max="120" step="1" required />
                      <span className="input-suffix">years</span>
                    </span>
                  </label>
                  <label className="field" htmlFor="marital-status">
                    <span className="field-label">Marital status <span className="required-mark">*</span></span>
                    <select id="marital-status" name="maritalStatus" defaultValue="" required>
                      <option value="" disabled>Select your status</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="widowed">Widowed</option>
                      <option value="other-or-unsure">Other or unsure</option>
                    </select>
                  </label>
                  <label className="field field-half" htmlFor="children">
                    <span className="field-label">Number of children <span className="required-mark">*</span></span>
                    <input id="children" name="children" type="number" min="0" step="1" required />
                  </label>
                </div>
              </fieldset>

              <fieldset className="form-section savings-section">
                <legend><span className="legend-number">03</span>Savings &amp; pension</legend>
                <p className="section-intro savings-intro">Only standard PPK contributions are currently calculated.</p>
                <div className="savings-grid">
                  <PpkParticipationField />
                  <SavingsField name="ike" title="IKE" description="Unavailable until rules are verified" />
                  <SavingsField name="ikze" title="IKZE" description="Tax treatment unavailable" />
                </div>
                <div className="projection-inputs">
                  <p className="field-label">Generic savings projection assumptions</p>
                  <p className="field-hint">This projection is separate from PPK/IKZE. Supply both values; no financial assumptions are invented.</p>
                  <div className="field-grid">
                    <label className="field" htmlFor="savings-contribution">
                      <span className="field-label">Monthly amount to project <span className="optional-label">optional</span></span>
                      <span className="input-with-suffix">
                        <input id="savings-contribution" name="savingsContribution" type="number" min="0" step="0.01" />
                        <span className="input-suffix">PLN</span>
                      </span>
                    </label>
                    <label className="field" htmlFor="annual-return">
                      <span className="field-label">Assumed annual return <span className="optional-label">optional</span></span>
                      <span className="input-with-suffix">
                        <input id="annual-return" name="annualReturnPercent" type="number" min="-99.99" max="100" step="0.01" />
                        <span className="input-suffix">%</span>
                      </span>
                    </label>
                  </div>
                </div>
              </fieldset>

              <label className="consent-control">
                <input
                  type="checkbox"
                  name="calculationConsent"
                  checked={consent}
                  onChange={(event) => setConsent(event.currentTarget.checked)}
                  required
                />
                <span>
                  I understand that this is an AI-assisted estimate, not professional advice, and I accept responsibility for reviewing the result before using it.
                </span>
              </label>

              <div className="form-footer">
                <p>Calculations run locally. No user profile data is sent to regulatory websites or services.</p>
                <button className="submit-button" type="submit" disabled={!isCalculationConsentGranted(consent)}>
                  Show available results <span aria-hidden="true">→</span>
                </button>
              </div>
            </form>

            {profile && (
              <Results
                profile={profile}
                updateMessage={updateSelection.status === "report"
                  ? updateSelection.report.message
                  : updateSelection.message}
              />
            )}
          </section>

          <aside className="sidebar">
            <section className="sidebar-card why-card">
              <div className="sidebar-icon" aria-hidden="true">✳</div>
              <p className="sidebar-kicker">SUPPORTED RESULTS</p>
              <h2>Clarity begins with evidence.</h2>
              <p>Only rules verified for the current calculation scope are used. Unknown eligibility remains unknown.</p>
              <div className="sidebar-divider" />
              <ul className="feature-list">
                <li><span aria-hidden="true">✓</span> Deterministic PPK calculations</li>
                <li><span aria-hidden="true">✓</span> Official source references</li>
                <li><span aria-hidden="true">✓</span> No automatic rule updates</li>
              </ul>
            </section>
            <section className="sidebar-card note-card">
              <span className="note-icon" aria-hidden="true">i</span>
              <div>
                <h3>Unavailable calculations</h3>
                <p>PIT, social/health contribution amounts, net salary, IKZE tax relief, and unverified exceptions remain unavailable.</p>
              </div>
            </section>
          </aside>
        </div>
      </main>

      <footer className="site-footer">
        <span>Poland Tax &amp; Pension Advisor</span>
        <p>{AI_FOOTER_NOTICE}</p>
      </footer>
    </div>
  );
}

function parseEligibility(value: FormDataEntryValue | null): SubmittedProfile["welcomeEligibility"] {
  if (value === "eligible" || value === "ineligible") return value;
  return "unknown";
}

function RegulatoryStatusPanel({
  selection,
  onSkip,
  onChooseMode,
}: {
  selection: UpdateSelection;
  onSkip: () => void;
  onChooseMode: (mode: RegulatoryCheckMode) => void;
}) {
  return (
    <section className="regulatory-panel" aria-labelledby="regulatory-title">
      <div className="regulatory-panel-heading">
        <div>
          <p className="eyebrow">RULE MAINTENANCE</p>
          <h2 id="regulatory-title">Regulatory update check</h2>
        </div>
        <span className="status-pill">Local demonstration mode</span>
      </div>
      <dl className="rule-status-grid">
        <div><dt>Active rule-set version</dt><dd>{rules2026.version}</dd></div>
        <div><dt>Last successful verification</dt><dd>{rules2026.lastSuccessfulVerificationDate} (PPK and stored rule data)</dd></div>
        <div><dt>Current status</dt><dd>PPK rules verified; other calculations remain blocked.</dd></div>
        <div><dt>Sources covered by stored rules</dt><dd>{rules2026.sourcesCovered.join("; ")}.</dd></div>
      </dl>
      <p className="regulatory-result" role="status">
        {selection.status === "report" ? selection.report.message : selection.message}
      </p>
      {selection.status === "report" && <RegulatoryReport report={selection.report} />}
      {selection.status === "error" && <p className="inline-error" role="alert">{selection.message}</p>}
      <div className="regulatory-actions">
        <button type="button" className="secondary-button" onClick={onSkip}>Skip update check</button>
        <button type="button" className="secondary-button" onClick={() => onChooseMode("quick")}>Quick check</button>
        <button type="button" className="secondary-button" onClick={() => onChooseMode("deep")}>Deep legal check</button>
      </div>
    </section>
  );
}

export function ApprovalDialog({
  mode,
  isChecking,
  onCancel,
  onApprove,
}: {
  mode: RegulatoryCheckMode;
  isChecking: boolean;
  onCancel: () => void;
  onApprove: () => void;
}) {
  const configuration = REGULATORY_MODES[mode];
  const sources = REGULATORY_SOURCES.filter((source) => mode === "deep" || !source.deepOnly);
  return (
    <div className="dialog-backdrop">
      <section className="approval-dialog" role="dialog" aria-modal="true" aria-labelledby="approval-title">
        <p className="step-label">EXPLICIT APPROVAL REQUIRED</p>
        <h2 id="approval-title">{mode === "quick" ? "Approve Quick check?" : "Approve Deep legal check?"}</h2>
        <p>This workflow requires external web access. It may consume additional AI tokens when a secure backend is available. The current demonstration uses no external access or AI tokens.</p>
        <p><strong>Last successful verification:</strong> {rules2026.lastSuccessfulVerificationDate}</p>
        <p><strong>Relative resource level:</strong> {configuration.resourceLevel}</p>
        <p><strong>Production rules will not be changed automatically.</strong></p>
        <h3>Source categories to be checked</h3>
        <ul className="source-preview-list">
          {sources.map((source) => (
            <li key={source.id}>
              <strong>{source.institution}:</strong> {source.category}{" "}
              <a href={source.url} target="_blank" rel="noreferrer">official source</a>
            </li>
          ))}
        </ul>
        <p className="privacy-boundary">
          Only source IDs, rule topics, employment type, legal references, and the last verification date may be sent by a future backend. Income, residency, citizenship, family, contribution, and savings data are excluded.
        </p>
        <p className="demonstration-warning">Demonstration mode — secure backend connection required. No live source check can be performed here.</p>
        <div className="dialog-actions">
          <button type="button" className="secondary-button" onClick={onCancel} disabled={isChecking}>Cancel</button>
          <button type="button" className="submit-button" onClick={onApprove} disabled={isChecking}>
            {isChecking ? "Preparing local report…" : `Approve ${mode === "quick" ? "Quick check" : "Deep legal check"}`}
          </button>
        </div>
      </section>
    </div>
  );
}

function RegulatoryReport({ report }: { report: RegulatoryUpdateReport }) {
  return (
    <div className="regulatory-report">
      <h3>Regulatory update report</h3>
      <p><strong>Status:</strong> {report.status}. Retrieved locally: {new Date(report.retrievedAt).toLocaleString()}.</p>
      <p>No source response was retrieved and no regulatory changes were assessed. Candidate changes: none retrieved (not a finding that none exist).</p>
      <details>
        <summary>Source requests not performed</summary>
        <ul className="source-list">
          {report.sources.map((source) => {
            const metadata = REGULATORY_SOURCES.find((item) => item.id === source.sourceId);
            return metadata ? (
              <li key={source.sourceId}>
                {metadata.institution}: {metadata.category} — {source.status}.{" "}
                <a href={metadata.url} target="_blank" rel="noreferrer">Open official page</a>
              </li>
            ) : null;
          })}
        </ul>
      </details>
      <div className="candidate-empty-state">
        <strong>Candidate-change review</strong>
        <p>No candidates are available to review in demonstration mode. An unavailable source never changes or replaces an active rule.</p>
        <p>Future activation requires evidence, legal and calculation review, human approval, passing regression tests, and an available rollback version.</p>
      </div>
    </div>
  );
}

function PpkParticipationField() {
  return (
    <div className="savings-card">
      <div className="savings-card-heading">
        <span className="savings-badge ppk">PPK</span>
        <div><h3>PPK</h3><p>Employee capital plan</p></div>
      </div>
      <label className="field" htmlFor="ppk-status">
        <span className="field-label">Participation <span className="required-mark">*</span></span>
        <select id="ppk-status" name="ppkStatus" defaultValue="" required>
          <option value="" disabled>Select participation</option>
          <option value="participating">Participating</option>
          <option value="not-participating">Not participating</option>
          <option value="unsure">I'm not sure</option>
        </select>
      </label>
      <label className="field" htmlFor="welcome-eligibility">
        <span className="field-label">PLN 250 welcome payment eligibility</span>
        <select id="welcome-eligibility" name="welcomeEligibility" defaultValue="unknown">
          <option value="unknown">Eligibility requires verification</option>
          <option value="eligible">I confirmed I meet the conditions and have not received it before</option>
          <option value="ineligible">I confirmed I do not meet the conditions or received it already</option>
        </select>
        <span className="field-hint">Requires at least three full calendar months of participation and basic payments in at least three months.</span>
      </label>
      <label className="field" htmlFor="annual-eligibility">
        <span className="field-label">PLN 240 annual payment eligibility</span>
        <select id="annual-eligibility" name="annualEligibility" defaultValue="unknown">
          <option value="unknown">Eligibility requires verification</option>
          <option value="eligible">I confirmed I meet the contribution threshold and conditions</option>
          <option value="ineligible">I confirmed I do not meet the conditions</option>
        </select>
        <span className="field-hint">Your account history and the statutory annual threshold/exclusions must be checked.</span>
      </label>
    </div>
  );
}

type SavingsFieldProps = {
  name: "ike" | "ikze";
  title: string;
  description: string;
};

function SavingsField({ name, title, description }: SavingsFieldProps) {
  return (
    <div className="savings-card">
      <div className="savings-card-heading">
        <span className={`savings-badge ${name}`}>{title}</span>
        <div><h3>{title}</h3><p>{description}</p></div>
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
      {name === "ikze" && (
        <p className="field-hint">
          IKZE tax treatment and personalized savings benefits are unavailable pending verification.
        </p>
      )}
    </div>
  );
}

export function Results({
  profile,
  updateMessage,
}: {
  profile: SubmittedProfile;
  updateMessage: string;
}) {
  const ppkApplicable = profile.employmentType === "uop" && profile.incomeType === "gross";
  const ppkEmployee =
    ppkApplicable && profile.ppkStatus === "participating"
      ? calculatePpkEmployeeContribution(
          profile.monthlyIncome,
          2026,
          rules2026.ppkEmployeeBasicContribution,
        )
      : null;
  const ppkEmployer =
    ppkApplicable && profile.ppkStatus === "participating"
      ? calculatePpkEmployerContribution(
          profile.monthlyIncome,
          2026,
          rules2026.ppkEmployerBasicContribution,
        )
      : null;
  const welcomeEligibility =
    profile.ppkStatus === "participating" && profile.welcomeEligibility !== "unknown"
      ? profile.welcomeEligibility === "eligible"
      : undefined;
  const annualEligibility =
    profile.ppkStatus === "participating" && profile.annualEligibility !== "unknown"
      ? profile.annualEligibility === "eligible"
      : undefined;
  const welcomePayment =
    welcomeEligibility === undefined
      ? null
      : calculatePpkStateContribution(
          welcomeEligibility,
          2026,
          rules2026.ppkWelcomePayment,
        );
  const annualPayment =
    annualEligibility === undefined
      ? null
      : calculatePpkStateContribution(
          annualEligibility,
          2026,
          rules2026.ppkAnnualStatePayment,
        );
  const socialInsurance =
    profile.employmentType === "uop" && profile.incomeType === "gross"
      ? calculateEmployeeSocialInsurance(
          profile.monthlyIncome,
          undefined,
          2026,
        )
      : { status: "unavailable" as const, message: "Available only for a gross UoP profile." };

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
    profile.savingsContribution !== null && profile.annualReturnPercent !== null
      ? [1, 5, 10, 15, 20].map((years) =>
          projectMonthlySavings(profile.savingsContribution!, profile.annualReturnPercent!, years),
        )
      : null;

  return (
    <section className="results-card" aria-labelledby="results-title" aria-live="polite">
      <p className="step-label">DETERMINISTIC RESULTS</p>
      <h2 id="results-title">Your available results</h2>
      <p className="results-intro">
        Results include verified basic PPK amounts only when gross income, UoP employment, and participation are confirmed. No PIT, health, or net-income estimate is provided.
      </p>
      <section className="result-group">
        <h3>Employee contributions</h3>
        <p><strong>Income entered:</strong> PLN {formatPln(profile.monthlyIncome)} ({profile.incomeType}; {profile.employmentType})</p>
        <p><strong>UoP social insurance:</strong> {socialInsurance.status === "unavailable" ? "Unavailable until verified" : `PLN ${formatPln(socialInsurance.value.total)}`}</p>
        {socialInsurance.status === "unavailable" && <p className="result-detail">{socialInsurance.message}</p>}
        <p><strong>Health contribution, PIT, net income, and effective rate:</strong> Unavailable until verified</p>
        <p><strong>PPK employee basic contribution:</strong> {ppkEmployee ? renderAmount(ppkEmployee) : ppkApplicabilityMessage(profile)}</p>
        {ppkEmployee?.status === "available" && <p className="result-detail">Calculated at 2% of the gross PPK remuneration base.</p>}
      </section>
      <section className="result-group">
        <h3>Employer contributions</h3>
        <p><strong>PPK employer basic contribution:</strong> {ppkEmployer ? renderAmount(ppkEmployer) : ppkApplicabilityMessage(profile)}</p>
        {ppkEmployer?.status === "available" && <p className="result-detail">Calculated at 1.5% of the gross PPK remuneration base. This employer contribution is not employee take-home pay.</p>}
      </section>
      <section className="result-group">
        <h3>Conditional PPK state payments</h3>
        <p><strong>Welcome payment:</strong> {renderEligibilityAmount(welcomePayment)}</p>
        <p><strong>Annual state payment:</strong> {renderEligibilityAmount(annualPayment)}</p>
        <p className="result-detail">Payments are never assumed. “Eligible” reflects your confirmation and is not an independent entitlement decision.</p>
      </section>
      <section className="result-group">
        <h3>IKZE contribution scenario</h3>
        {ikzeProjection?.status === "available" ? (
          <>
            <p>Planned contributions within the verified 2026 annual limit: <strong>PLN {formatPln(ikzeProjection.value.allowedAdditionalContribution)}</strong></p>
            <p className="result-detail">This is a contribution-limit projection only, not a tax-saving or investment estimate.</p>
          </>
        ) : (
          <p>{ikzeProjection?.status === "unavailable" ? `Unavailable: ${ikzeProjection.message}` : "Unavailable until the required personal inputs are provided."}</p>
        )}
        <p>IKZE tax relief and qualifying withdrawal taxation: Unavailable until verified.</p>
      </section>
      <section className="result-group">
        <h3>Retirement savings projections</h3>
        {savingsProjections ? (
          <>
            <p className="result-detail">Generic savings scenario; it does not represent PPK or IKZE. Uses the monthly amount, explicit annual-return assumption, and PLN 0 starting balance supplied by you.</p>
            <div className="projection-table" role="table" aria-label="Savings projections">
              <div className="projection-row projection-header" role="row">
                <span role="columnheader">Years</span><span role="columnheader">Contributions</span><span role="columnheader">Projected balance</span>
              </div>
              {savingsProjections.map((projection) => projection.status === "available" ? (
                <div className="projection-row" role="row" key={projection.value.years}>
                  <span role="cell">{projection.value.years}</span>
                  <span role="cell">PLN {formatPln(projection.value.contributions)}</span>
                  <span role="cell">PLN {formatPln(projection.value.projectedBalance)}</span>
                </div>
              ) : null)}
            </div>
          </>
        ) : (
          <p>Unavailable until a monthly amount and explicit annual return assumption are provided.</p>
        )}
      </section>
      <section className="result-group">
        <h3>Sources, effective dates, and assumptions</h3>
        <ul className="source-list">
          {[rules2026.ppkEmployeeBasicContribution, rules2026.ppkEmployerBasicContribution,
            rules2026.ppkWelcomePayment, rules2026.ppkAnnualStatePayment].map((rule) => (
            <li key={rule.id}>
              <strong>{rule.id}</strong>: {rule.unit === "fraction"
                ? `${rule.value * 100}% of gross remuneration`
                : `${rule.unit} ${rule.value}`}. {rule.legalBasis}. Effective {rule.effectivePeriod}. Status {rule.verificationStatus}. Accessed {rule.accessedAt}.{" "}
              <a href={rule.sourceUrl} target="_blank" rel="noreferrer">Official Journal of Laws</a>.
            </li>
          ))}
          <li>
            IKZE ordinary 2026 annual limit: PLN {formatPln(rules2026.ikzeAnnualContributionLimit.value)} —{" "}
            <a href={rules2026.ikzeAnnualContributionLimit.sourceUrl} target="_blank" rel="noreferrer">MRPiPS official limit notice</a>.
            {" "}Effective {rules2026.ikzeAnnualContributionLimit.effectivePeriod}; status {rules2026.ikzeAnnualContributionLimit.verificationStatus}; accessed {rules2026.ikzeAnnualContributionLimit.accessedAt}.
          </li>
        </ul>
        <p className="result-detail">Assumption: PPK applies to the submitted gross monthly amount as PPK remuneration; actual payroll base and participant eligibility must be confirmed.</p>
        <p className="result-detail">Regulatory update session: {updateMessage}</p>
      </section>
      <details className="transparency-details">
        <summary>AI transparency and limitations</summary>
        <ul>
          <li>AI may assist maintainers with researching and comparing regulations and may help explain information; it does not perform financial arithmetic.</li>
          <li>All financial arithmetic shown here is performed by deterministic TypeScript functions.</li>
          <li>AI suggestions are not automatically accepted as calculation rules.</li>
          <li>Rules require source verification, human approval, and successful automated tests before activation.</li>
          <li>News, document changes, and judgments trigger review but do not automatically modify calculations.</li>
          <li>Official sources may be inaccessible, outdated, ambiguous, conflicting, or incorrectly interpreted.</li>
          <li>Material decisions should be reviewed with a qualified Polish tax adviser, accountant, lawyer, pension specialist, or investment adviser.</li>
          <li>Live regulatory retrieval and AI explanations are not available in this frontend-only demonstration.</li>
        </ul>
      </details>
      <p className="results-disclaimer">Estimates only. This application does not provide professional tax, legal, pension, or investment advice.</p>
    </section>
  );
}

function ppkApplicabilityMessage(profile: SubmittedProfile) {
  if (profile.ppkStatus === "not-participating") return "No PPK contribution (you selected not participating)";
  if (profile.ppkStatus !== "participating") return "Unavailable until participation is confirmed";
  if (profile.incomeType !== "gross") return "Unavailable until gross remuneration is provided";
  return "Unavailable for this employment type";
}

function renderEligibilityAmount(result: ReturnType<typeof calculatePpkStateContribution> | null) {
  if (result === null) return "Eligibility requires verification";
  if (result.status === "unavailable") return "Eligibility requires verification";
  return result.value === 0 ? "PLN 0.00 (not eligible, as confirmed)" : `PLN ${formatPln(result.value)} (conditional; eligibility confirmed by user)`;
}

function renderAmount(result: { status: "available"; value: number } | { status: "unavailable"; message: string }) {
  return result.status === "available" ? `PLN ${formatPln(result.value)}` : "Unavailable until verified";
}

function formatPln(value: number) {
  return value.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default App;
