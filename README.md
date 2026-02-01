Mythos — README
=================

Overview
- Mythos is a small React + Vite frontend with Vercel serverless API endpoints that persist data to MySQL.

Environment & Pool Tuning
- The project reads `DATABASE_URL` and uses `mysql2` connection pools in serverless functions.
- You can control pool sizing with the environment variables `DB_POOL_LIMIT` (preferred) or `DB_CONN_LIMIT`.
- Defaults used by the code when the env var is not set:
  - `api/health.ts`: 2
  - `api/user.ts`: 5
  - `api/session.ts`: 10
  - `api/save-results.ts`: 10
  - `scripts/migrate.js`: 4

Guidance for production
- Serverless functions can scale horizontally; each concurrent function instance may open its own pool. To avoid exhausting DB connections:
  - Keep `DB_POOL_LIMIT` small (e.g., 2–10) depending on your DB `max_connections`.
  - Calculate: safe_per_instance = floor(max_connections / expected_instances / safety_factor).
  - Use a global connection proxy (PgBouncer for Postgres) or a connection pooler for MySQL if you need many concurrent connections.

Recommended env example (add to `.env.local`, do NOT commit secrets):

DATABASE_URL=mysql://user:pass@host:3306/dbname?ssl=true
SESSION_SECRET=your_long_random_secret
DB_POOL_LIMIT=8

Notes
- If your DB requires TLS, include `?ssl=true` in `DATABASE_URL`. The code will pass `ssl: { rejectUnauthorized: false }` for that case.
- The app caches the pool on the `global` object for reuse between invocations when possible.

Next steps
- If you'd like, I can add a small integration test that performs concurrent requests to validate pool behavior, or add CI checks that ensure env vars are documented.
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

