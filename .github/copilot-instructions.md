# Copilot / Agent Instructions — michael-portfolio

Purpose
- Short, focused guidance for AI coding agents working on this repo. Aim for precise, actionable edits that respect the existing structure (client/server split).

Big picture
- Monorepo-like layout with two main parts:
  - `client/` — Vite + React SPA (entry: `client/src/main.jsx`, routes in `client/src/app/App.jsx`).
  - `server/` — Express API (entry: `server/src/server.js`) backed by MySQL via `server/src/db.js`.
- The client talks to the server via REST endpoints under `/api/analytics/...` (see `server/src/routes/analytics.routes.js`).

Key files to read for context
- Client entry and routing: `client/src/main.jsx`, `client/src/app/App.jsx`.
- Client API usage and behavior: `client/src/pages/Stats.jsx` (shows `API_BASE`, optimistic like toggle, session/local storage usage).
- Server entry and middleware: `server/src/server.js` (CORS, health endpoints, JSON parsing).
- Analytics endpoints and SQL patterns: `server/src/routes/analytics.routes.js` (uses `GREATEST(...)` to avoid negative likes).
- DB pool config: `server/src/db.js` (reads DB_* env vars and creates a mysql2 pool).

Run / dev workflows
- Client (dev):
  - Install & run from the `client` folder: `cd client && npm install && npm run dev` (Vite).
  - `VITE_API_BASE` controls which API the client calls; default in code falls back to a production CDN. For local dev set `VITE_API_BASE=http://localhost:3001`.
- Server (dev):
  - Install & run from `server`: `cd server && npm install && npm run dev` (script runs `node --watch src/server.js`).
  - Production start: `npm run start` in `server`.
- Top-level `package.json` also contains Vite scripts — prefer running client inside `client/` to avoid confusion.

Environment variables (server)
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME` — required by `server/src/db.js`.
- `CLIENT_ORIGIN` — optional CORS allow-list value used in `server/src/server.js`.
- `PORT` — server listen port (default 3001).

API surface & examples
- Health and DB checks:
  - `GET /api/health` — quick liveness check (`server/src/server.js`).
  - `GET /api/dbcheck` — validates DB connection using `pool.query("SELECT 1")`.
- Analytics endpoints (`server/src/routes/analytics.routes.js`):
  - `GET /api/analytics/stats` — returns `{ views, likes }`.
  - `POST /api/analytics/view` — increments `views` once-per-session (client uses `sessionStorage`).
  - `POST /api/analytics/like` — accepts `{ delta: 1 | -1 }`, uses `GREATEST(likes + ?, 0)` to avoid negative counts.

Project-specific patterns to follow
- Client-side config:
  - Use `import.meta.env.VITE_API_BASE` when calling the API. Default code may point to a CDN; override for local testing.
- Storage conventions in `client/src/pages/Stats.jsx`:
  - `sessionStorage` is used to prevent double-counting views per browser session.
  - `localStorage` is used to persist whether the user has liked the portfolio.
- Optimistic UI: likes are updated locally before server confirmation and rolled back on failure — preserve this UX pattern when modifying the feature.
- Component conventions:
  - Files use `.jsx` and default exports (e.g., `client/src/components/ProjectCard.jsx`).
  - Functional React components with hooks are used throughout.

Debugging tips
- To test end-to-end locally:
  1. Run the server: `cd server && npm run dev` (ensure `.env` DB vars are present or mock DB connection).
  2. Run the client: `cd client && VITE_API_BASE=http://localhost:3001 npm run dev`.
  3. Use `/api/health` and `/api/dbcheck` to verify server and DB connectivity.
- Logs: server routes log brief messages (e.g., `/view` posts to console). Check terminal running the server for those traces.

Code safety patterns to preserve
- SQL parameterization via `mysql2` pool is used — continue using parameterized queries (no string interpolation for values).
- The `like` endpoint explicitly validates `delta` (`1` or `-1`) and clamps likes to >= 0 — keep those checks when modifying logic.

When making changes
- Small UX or content edits in the client should preserve the Vite dev pattern and `VITE_API_BASE` override.
- API changes must consider existing clients (the public CDN default). If changing response shapes, update `client/src/pages/Stats.jsx` accordingly.

If anything is unclear
- Ask for missing environment details (e.g., a `.env` example) or intended local DB setup. I can add a short `.env.example` if desired.

-- End of guidance --
