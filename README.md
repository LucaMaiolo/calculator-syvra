# Syvra Calculator

A mobile-style calculator built by Luca Maiolo for the Syvra frontend technical test. The project uses React, Next.js, TypeScript, and Tailwind CSS, with support for button and keyboard input.

- [Live calculator](https://calculator-luca-maiolo.vercel.app/)
- [GitHub repository](https://github.com/LucaMaiolo/calculator-syvra)

## Features

- Addition, subtraction, multiplication, and division.
- Decimal numbers, positive/negative sign toggle, and percentage conversion.
- All clear (`AC`) and single-character deletion (`Back`).
- Pending expression display with multiplication and division symbols.
- Chained calculations and continued calculations using the previous result.
- Division-by-zero error display, with recovery through clear, backspace, or new number entry.
- Keyboard controls for desktop use.
- Responsive layout with a constrained calculator width, square buttons, and a display that reduces its font size for longer expressions.

## Technology

- **Next.js App Router and React** for the application and interactive calculator.
- **TypeScript** for type checking.
- **Tailwind CSS** for layout, styling, and focus states.
- **Vitest and React Testing Library** for component unit tests in a jsdom environment.
- **Vercel** for hosting.

The calculator keeps its state locally with React hooks. It does not require a backend, database, API key, or environment variables.

## Run locally

Use Node.js 24 LTS and npm.

```bash
git clone https://github.com/LucaMaiolo/calculator-syvra.git
cd calculator-syvra
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000) in your browser.

To create and serve a production build locally:

```bash
npm run build
npm start
```

## Calculator behavior

Select a number, choose an operator, enter a second number, and press `=`. After a result, entering a digit starts a new number; selecting an operator continues from the result.

Chained operations evaluate from left to right, like a basic handheld calculator. For example, `2 + 3 × 4 =` produces `20`.

The percentage button divides the displayed number by 100: `50 %` becomes `0.5`. It does not calculate a percentage relative to a pending first operand.

Results are formatted to a maximum of 12 significant digits to reduce floating-point display artifacts. This calculator uses JavaScript numbers and is not intended for exact financial calculations.

## Keyboard controls

- **Digits `0–9`:** enter a number.
- **`.`:** enter a decimal point.
- **`+`, `-`, `*`, `/`:** select an arithmetic operator.
- **`x` or `X`:** select multiplication.
- **`Enter` or `=`:** calculate the result.
- **`Backspace`:** delete the last character.
- **`Escape`:** clear the calculator.
- **`%`:** divide the displayed number by 100.

Keyboard shortcuts are ignored when Ctrl, Command, or Alt is held, or when typing inside an input, textarea, or select element. The sign toggle is available through the `+/-` button.

## Tests and checks

Run the unit tests once:

```bash
npm test
```

Automatically re-run tests while editing:

```bash
npm run test:watch
```

Run lint and TypeScript checks:

```bash
npm run lint
npx tsc --noEmit
```

The suite contains 41 tests covering number entry, arithmetic, decimal precision, negative results, chained operations, operator replacement, clearing, division-by-zero recovery, keyboard controls, and keyboard listener cleanup.

Tests render the calculator component and exercise its buttons and keyboard events. They do not verify visual layout or replace browser checks on desktop and mobile.

## Project structure

```text
src/
  app/
    page.tsx                 Calculator page
    layout.tsx               Root layout and page metadata
    globals.css              Global styles and Tailwind configuration
  components/
    Calculator.tsx           Calculator interface, state, and event handling
    Calculator.test.tsx      Component unit tests
vitest.config.mts            Test runner configuration
```

## Deployment

The hosted calculator is available on [Vercel](https://calculator-luca-maiolo.vercel.app/).

To deploy your own copy, import the GitHub repository into Vercel, select the Next.js framework preset, and use the repository root as the project directory. No application environment variables are required.

## Known limitation

After a division-by-zero error, pressing `%` or `+/-` can change the error text to `NaN` or `-Error`. Use `AC` to reset the calculator.

## AI assistance

ChatGPT was used to assist with parts of the implementation. The application source and unit tests are included in this repository.

[Referenced development conversation](https://chatgpt.com/s/cx_6ad5497f4c248191946b3894e54c7b87)
