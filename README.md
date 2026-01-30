# Mythos — Prototype

Minimal scaffold for the Axiom prototype (web PWA). Includes a question flow, deterministic scoring engine, and SVG sigil generator.

Quick start

1. Install dependencies

```bash
npm install
```

2. Run dev server

```bash
npm run dev
```

3. Run tests

```bash
npm run test
```

What this scaffold includes

- `src/components/QuestionFlow.tsx` — simple 20-question flow (sample questions included)
- `src/lib/scoring.ts` — lightweight scoring helpers
- `src/lib/sigil.ts` — prototype SVG generator from seed
- `tests/scoring.test.ts` — basic unit test for scoring determinism

Auth & CI

- `src/auth/farcaster.ts` — Farcaster auth stub (placeholder for real SDK)
- `src/auth/email.ts` — simple email signup/signin using localStorage (prototype only)
- GitHub Actions workflow in `.github/workflows/ci.yml` — runs tests and build

Additional files

- Full 20-question codex is in `src/data/questions_full.json`.
- Procurement checklist: `PROCUREMENT.md`.

Security note

The included email auth is a local prototype only and not secure for production. Replace with a proper backend and hashed passwords before storing real user data.

Next steps

- Expand `src/data/questions.json` to include full 20-question Codex and weighting matrix
- Add auth hooks (Farcaster + optional email)
- Add CI (GitHub Actions) for tests and builds
- Add asset procurement and licensing (fonts, audio)

