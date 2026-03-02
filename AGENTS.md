# AGENTS.md

> This file serves as the reference manual for agents (human or AI) that work on the **todo‑app** repository. It explains how to build, lint, test, and style the project, and it documents any special rules for code generation.

---

## 1. Quick‑Start Commands

| Command | Purpose | Notes |
|---------|---------|-------|
| `npm run dev` | Starts the Vite dev server with HMR. | Open `http://localhost:5173` by default. |
| `npm run build` | Builds the production bundle. | Runs `tsc -b` first to type‑check. |
| `npm run lint` | Runs ESLint against all source files. | Uses the config in `eslint.config.js`. |
| `npm run preview` | Serves the built bundle locally. | Useful for inspecting the final output. |
| `npm run test` | Runs Vitest on all tests. | Uses config in `vitest.config.ts`. |
| `npm run format` | Formats all files with Prettier. | Run before committing. |

## 2. Running Tests

> The project uses Vitest for testing. Tests are located in `src/test/tests/`. The following conventions are recommended.

### 2.1 Test Framework

- **Vitest** is the preferred test runner for Vite projects.
- Install it with:

```bash
npm i -D vitest @types/jest @testing-library/react @testing-library/jest-dom
```

- Create a `vitest.config.ts` at the root with minimal config:

```ts
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
```

### 2.2 Running All Tests

```bash
npm run test
```

> Add the script to `package.json`:

```json
"test": "vitest"
```

### 2.3 Running a Single Test

If you have a test file `src/test/tests/App.test.tsx`, you can run just that file:

```bash
vitest run src/test/tests/App.test.tsx
```

Or using the `--grep` flag to match a test name:

```bash
vitest -t "renders the title"
```

### 2.4 Test File Conventions

- Tests live under `src/test/tests/`.
- File names end with `.test.tsx` or `.test.ts`.
- Import components with absolute paths (`@/App`) to avoid relative hell.
- Use `@testing-library/react` for rendering.

## 3. Code Style Guidelines

The repository follows a strict, opinionated style to keep the codebase readable and maintainable.

### 3.1 Formatting

- All files are formatted with **Prettier** via `npx prettier --write .`.
- Use 2‑space indentation. Tabs are disallowed.
- Line length is capped at 120 characters.
- Empty lines separate logical blocks (imports, state, handlers, JSX).

### 3.2 Imports

- Prefer absolute imports (`@/utils`) over relative ones.
- Group imports: standard libs → third‑party → local modules.
- Alphabetically order local imports.
- Avoid `import * as foo` unless re‑exporting.

### 3.3 TypeScript Usage

- `strict` mode is enabled; never use `any`.
- Prefer `as const` for literal types.
- When defining props, use `React.FC<Props>` or `FC<Props>` only when necessary; prefer plain functions.
- Use `React.Dispatch<React.SetStateAction<T>>` for setState callbacks.

### 3.4 Naming Conventions

| Entity | Convention |
|--------|------------|
| Components | PascalCase (`MyComponent`) |
| Hooks | `useXxx` (`useFetch`) |
| State variables | camelCase (`count`, `userName`) |
| Constants | UPPER_SNAKE_CASE (`DEFAULT_COLOR`) |
| Types | PascalCase (`UserProfile`) |
| Enums | PascalCase with values in UPPER_SNAKE_CASE |

### 3.5 Error Handling

- Prefer `try/catch` with `Error` objects.
- Do not swallow errors; always re‑throw or log.
- For async operations, use `async/await` and handle rejections.
- Use `console.error` for unexpected errors.

### 3.6 React Best Practices

- Keep components pure; avoid side‑effects in render.
- Use `useEffect` for subscriptions, not for rendering.
- Memoize expensive calculations with `useMemo`.
- Avoid anonymous functions in JSX unless unavoidable.
- Use `React.Fragment` or `<>` for grouping.

### 3.7 Tailwind & CSS

- All Tailwind classes should be in a single string, separated by spaces.
- Use `className` instead of `class`.
- Prefer `twMerge` for conditional classes.
- Keep global CSS minimal; use Tailwind utilities.

## 4. React Performance Best Practices

This project includes a skill for React performance optimization from Vercel Engineering.

**Location:** `.agents/skills/vercel-react-best-practices/`

This skill contains 40+ rules across 8 categories for optimizing React applications:

- **Eliminating Waterfalls** (CRITICAL) - Parallel data fetching, async/await patterns
- **Bundle Size Optimization** (CRITICAL) - Direct imports, dynamic loading, code splitting
- **Server-Side Performance** (HIGH) - RSC optimization, caching, serialization
- **Client-Side Data Fetching** (MEDIUM-HIGH) - SWR, event listeners, localStorage
- **Re-render Optimization** (MEDIUM) - Derived state, memoization, useCallback
- **Rendering Performance** (MEDIUM) - Suspense, content-visibility, conditional rendering
- **JavaScript Performance** (LOW-MEDIUM) - Loop optimization, Set/Map usage
- **Advanced Patterns** (LOW) - Event handlers in refs, lazy initialization

AI agents should follow these rules when generating or refactoring React code.

## 5. Cursor and Copilot Rules

There are **no** custom Cursor or Copilot rules in this repository.  If you wish to add them, create `.cursor/rules/` or `.cursorrules` and `.github/copilot-instructions.md` accordingly.

---

## 6. Tooling & Configs

| Tool | Config File | Key Settings |
|------|-------------|--------------|
| ESLint | `eslint.config.js` | Enforces `no-unused-vars`, `no-console`, `eqeqeq`. |
| TypeScript | `tsconfig.json` | `strict`, `noImplicitAny`. |
| Tailwind | `tailwind.config.js` | `darkMode: 'class'`. |
| Vite | `vite.config.ts` | Uses `@vitejs/plugin-react`. |

---

## 7. Common Pitfalls

- **Missing type definitions**: always run `tsc -b` before building.
- **Import errors**: double‑check alias paths in `tsconfig.app.json`.
- **CSS conflicts**: ensure Tailwind's `@layer base` is at the bottom of your styles.
- **Hot‑reload issues**: restart dev server if components don't update.

## 8. Contribution Checklist

Before submitting a PR:

1. Run `npm run lint` – no errors.
2. Run `npm run dev` – app works.
3. Add or update tests.
4. Verify build with `npm run build`.
5. Ensure no console errors.
6. Run `vitest` if tests added.

---

> *End of AGENTS.md*
