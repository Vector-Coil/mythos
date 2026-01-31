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

4. Migrate (create MySQL schema): `npm run migrate` (requires `DATABASE_URL` in `.env.local`)
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

Serverless API (development placeholders)

Two simple serverless endpoints have been added under the `api/` folder for development and testing:

- `api/save-results.ts` (POST): Accepts `{ mythos: { ... } }` and writes a draft record to `data/saved_mythos.json`. Returns `{ ok: true, id }`.
- `api/session.ts` (GET, POST): Returns and stores lightweight session objects in `data/sessions.json`. GET returns all sessions (dev only). POST accepts `{ session: {...} }` and returns an id.

These handlers are file-backed placeholders for local/dev use. For production you should replace them with secure persistence (Supabase, Postgres, etc.) and protect endpoints behind authentication.

