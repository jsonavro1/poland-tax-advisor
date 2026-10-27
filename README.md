# Poland Tax & Pension Advisor

A React and TypeScript web application for transparent estimates of Polish employment contributions and retirement savings. The current version implements a limited, source-traceable calculation increment and deliberately leaves unverified Polish rules unavailable.

## Requirements

- Node.js 20.19+ or 22.12+
- npm (included with Node.js)

## Run locally in VS Code

1. Install Node.js if it is not already installed. Download the current LTS release from [nodejs.org](https://nodejs.org/).
2. Open this repository folder in VS Code.
3. In VS Code, open **Terminal → New Terminal**.
4. Install the project dependencies:

   ```powershell
   npm install
   ```

5. Start the development server:

   ```powershell
   npm run dev
   ```

6. Open the local URL printed by Vite in your browser (normally `http://localhost:5173`).

Press `Ctrl+C` in the terminal to stop the server.

## Run automated tests

```powershell
npm test
```

## Verify a production build

```powershell
npm run build
```

The generated static site is written to `dist/`.

## Implemented scope and limitations

The questionnaire collects monthly income and whether it is gross or net, employment type, Polish tax residency, labour-market access basis, age, marital status, number of children, and optional PPK, IKE, and IKZE details. Inputs are processed locally in the browser and are not sent to a service.

The versioned 2026 rule set contains only the sourced ZUS annual pension/disability base ceiling and the ordinary IKZE annual contribution limit. Each rule records its unit, tax year/effective period, official source URL, access date, and verified status.

Implemented deterministic functions cover:

- Employee social-insurance contribution calculations, which return unavailable until the employee rates are verified and the user provides the required year-to-date base.
- PPK employee, employer, and state contributions, which return unavailable until rates and participant-specific conditions are verified.
- A 2026 IKZE contribution-limit scenario, if the user confirms no qualifying business activity and provides the remaining months and contributions already made. This is not a tax-saving or investment-return estimate.
- Generic monthly savings projections for 1, 5, 10, 15, and 20 years, only when the user explicitly supplies both the monthly amount and annual return assumption. The scenario starts at PLN 0 and does not model fees, inflation, taxes, or statutory limits.

PIT brackets, health contributions, net income, effective rates, PPK amounts/state-payment eligibility, IKZE tax treatment, and future-year IKZE limits are not implemented. Results depending on these rules say “Unavailable until verified.” The generic savings projection is not represented as a PPK or IKZE projection. No AI functionality is included; all available arithmetic is deterministic TypeScript.

All outputs are estimates and user-defined scenarios, not professional tax, legal, or investment advice.
