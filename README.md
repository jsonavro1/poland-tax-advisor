# Poland Tax & Pension Advisor

A React, TypeScript, and Vite application for transparent, limited Polish employment and pension scenarios. It intentionally displays unsupported or unverified calculations as unavailable rather than estimating them.

## Requirements

- Node.js 20.19+ or 22.12+
- npm (included with Node.js)

## Run locally in VS Code (Windows)

1. Install Node.js LTS from [nodejs.org](https://nodejs.org/) if it is not installed.
2. Open this repository folder in VS Code.
3. Open **Terminal → New Terminal**.
4. Install dependencies:

   ```powershell
   npm install
   ```

5. Start the Vite development server:

   ```powershell
   npm run dev
   ```

6. Open the local URL printed by Vite (normally `http://localhost:5173`).
7. Stop the server with `Ctrl+C`.

## Tests and production build

Run the automated unit and UI tests:

```powershell
npm test
```

Run TypeScript checks and create the production build:

```powershell
npm run build
```

The generated site is written to `dist/`. To check installed dependency advisories, run:

```powershell
npm audit
```

## Implemented scope

- React + TypeScript frontend and profile questionnaire for income type, employment arrangement, Polish tax residency, labour-market access basis, age, marital status, number of children, and PPK/IKE/IKZE participation.
- Versioned 2026 rule data with values, units, effective periods, official source URLs, access dates, legal references, and verification statuses.
- Deterministic PPK employee (2%) and employer (1.5%) basic contribution calculations for confirmed PPK participation with gross UoP income. The user-entered amount is assumed to equal PPK remuneration; actual payroll base and participant eligibility must be confirmed.
- Conditional PLN 250 welcome and PLN 240 annual PPK state-payment scenarios only when the user confirms eligibility. This confirmation is not an independent entitlement decision.
- 2026 standard IKZE contribution-limit scenario, subject to user confirmation of eligibility inputs. It does not estimate tax relief or investment returns.
- Optional generic savings projections for 1, 5, 10, 15, and 20 years, only when the user supplies a monthly contribution and annual return assumption. These projections are not represented as PPK or IKZE results and do not model fees, inflation, taxes, or statutory limits.
- Employee social-insurance amounts remain unavailable because the necessary employee rates are not verified; the annual ceiling is stored but is not used to produce amounts without the required rates and user-provided year-to-date base.
- Results separate employee contributions, employer contributions, conditional PPK state payments, savings scenarios, assumptions, and official sources.
- Skip, Quick, and Deep regulatory-check controls. Quick/Deep require explicit approval and disclose source scope, resource use, external-access/token considerations, and privacy boundaries. The frontend is demonstration-only: it contacts no external sources and cannot make live regulatory updates.
- AI transparency banner, expandable limitations, persistent footer notice, and an initially unselected consent checkbox gating calculation. Arithmetic is deterministic TypeScript; no AI arithmetic, AI-generated rule changes, or live AI explanations are implemented.

## Explicit limitations

The application does **not** calculate PIT, health contributions, final net income, effective tax/contribution rates, IKZE tax relief, IKE scenarios, or verified UoP employee social-insurance amounts. It does not support Umowa Zlecenie or B2B calculations. These remain unavailable pending source verification and implementation. Consult qualified Polish tax, legal, pension, or investment professionals before relying on financial decisions.

Questionnaire processing is local to the browser. The regulatory demonstration sends no requests. A future live research workflow requires a secure backend and human review; no active rules are changed automatically.
