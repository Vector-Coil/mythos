# Mythos — Technical Specification (MVP)

This document defines the minimal technical spec and API surface for the Mythos MVP: a web-first React PWA implementing the 20-question flow, deterministic scoring engine, SVG sigil generator, results reveal, and optional auth/session persistence.

## Goals (MVP)
- Interactive 20-question flow (oblique prompts).
- Deterministic scoring engine with unit tests.
- SVG sigil generator from a seed string.
- Results reveal (narrative template + sigil).
- Session persistence and optional auth (Farcaster deferred; email prototype available).
- Deployable as a static site + serverless functions (Vercel recommended).

## High-level Architecture
- Frontend: React + Vite (TypeScript), client-side scoring + sigil generation.
- Serverless: small API routes for auth/session (Vercel functions) when needed.
- Persistence (MVP): localStorage for session; optional Supabase/Postgres for user data.
- CI/CD: GitHub Actions (tests + build) and Vercel for hosting.

## API Surface (serverless handlers)
Note: serverless endpoints are optional for MVP if you keep sessions client-only. If you enable server-side auth or Farcaster later, implement these endpoints.

- GET /api/session
  - Purpose: return current user/session info (if server sessions used)
  - Response: { user: { id, email?, name? } | null }

- POST /api/save-results
  - Purpose: persist completed `Mythos` result for a logged-in user
  - Body: { userId, sessionId, mythos: { seed, narrative, scores, metadata } }
  - Response: { ok: true, id }

- GET /api/mythos/:id
  - Purpose: retrieve saved mythos by id (owner-only or public depending on product decisions)
  - Response: saved mythos object

- (Optional) /api/auth/email/signup, /api/auth/email/signin
  - Purpose: server-backed email signup/signin (replace localStorage prototype)
  - Use secure password hashing (bcrypt) and sessions (cookies/JWT)

- (Deferred) /api/farcaster/login, /api/farcaster/callback
  - Purpose: Farcaster OAuth redirect + server-side token exchange (requires CLIENT_SECRET)

## Data Models
Minimal JSON shapes for frontend + API

- Question
  - {
      question_id, arc, arc_index, text, responses: [{ id, text, weights: { trait: number } }]
    }

- User (server)
  - { id, email?, name?, created_at }

- Mythos (saved result)
  - { id, user_id, seed, title, subtitle, narrative, sigil_seed, scores, axes, created_at }

- Session
  - { id, user_id?, started_at, completed_at?, current_index?, answers[] }

## Environment Variables
- NODE_ENV (standard)
- SESSION_SECRET = random hex for signing cookies/JWTs
- (Optional) DATABASE_URL = Postgres / Supabase connection string
- (Optional) FARCASTER_CLIENT_ID, FARCASTER_CLIENT_SECRET = only if you enable Farcaster server-side flow

> Important: never commit secrets into the repo. Use Vercel environment variables or `.env.local` locally (gitignored).

## Persistence Options (tradeoffs)
- LocalStorage (MVP): zero cost, simplest, good for anonymous sessions and quick prototyping. Downside: device-bound, not secure for sensitive journals.
- Supabase (recommended free tier): Auth, Postgres, storage. Minimal infra work and supports email auth and persisted results.
- Self-hosted Postgres / MongoDB Atlas: more control; more ops work.

## Authentication Strategy
- MVP: keep localStorage-based email stub for usability (already in repo). Mark this as prototype-only.
- Production: use Supabase Auth, or implement secure server endpoints that issue signed JWTs/cookies. Use HTTPS redirect URIs for OAuth flows.
- Farcaster: requires server-side client secret and redirect URI; defer until you have client credentials.

## Acceptance Tests (minimum)
- Scoring determinism
  - Given a fixed sequence of answers, `calculateScores` produces stable, documented numeric totals.
- Sigil generation
  - Given a seed string, `generateSigilSVG(seed)` returns SVG containing the expected layer tags (core, frame, array, fracture).
- End-to-end flow
  - Complete 20-question flow yields a `mythos` object (seed + narrative + scores) and renders the SVG.
- Auth sanity (prototype)
  - Local signup/signin stores session and recovers it across page reload.

## Developer & Deployment Notes
- Local
  - Install: `npm install`
  - Dev: `npm run dev`
  - Test: `npm run test`
  - Build: `npm run build`
- Vercel
  - Deploy static site; use Vercel serverless functions for `/api/*` if enabling server-side auth.
  - Add required environment variables via Vercel Project Settings.
- CI
  - GitHub Actions should run `npm ci`, `npm run test`, and `npm run build` on PRs.

## Security & Privacy
- Do not send raw camera/audio to servers. If implementing any camera/audio features, process locally.
- Encrypt/journal data at rest if users store sensitive content—use server-side encryption or client-side encryption for stronger guarantees.
- Minimize collection of personal data; document retention policy if you keep user data.

## Next Steps / Roadmap for Implementation
1. Finalize persistence choice (LocalStorage → Supabase recommended).
2. Harden auth: replace local storage auth with Supabase or secure email endpoints.
3. Implement serverless persistence endpoint `POST /api/save-results`.
4. Add CI/CD secrets management and config docs (Vercel env, GitHub secrets).
5. (Optional) Implement Farcaster OAuth serverless endpoints when you can register an app.

---

Created for the current prototype. Place this file at the repo root as a living spec to update while building.
