# Poland Tax & Pension Advisor

A React and TypeScript web application for collecting the information needed to estimate taxes and retirement savings in Poland. The current version provides a profile questionnaire only. It does not calculate taxes or contributions, provide financial projections, or use AI.

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

## Verify a production build

```powershell
npm run build
```

The generated static site is written to `dist/`.

## Current scope

The questionnaire collects monthly income and whether it is gross or net, employment type, Polish tax residency, labour-market access basis, age, marital status, number of children, and optional PPK, IKE, and IKZE details. Submitting the form does not calculate or save financial results.

No Polish tax rates, ZUS rules, pension rules, financial calculations, or AI features are implemented. The application is an early prototype and does not provide tax, legal, or investment advice.
