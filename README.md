# Coretex

AI-powered second brain and content hub. Save YouTube, Twitter/X, Spotify, or freeform notes, then let Gemini handle titles, summaries, tags, and deep search so you can find anything instantly.

![](https://res.cloudinary.com/ddsyzx9hf/image/upload/v1765206191/landing_page_xyu0so.png)

## Highlights

- Capture anything: paste links from YouTube/Twitter/Spotify or write notes in a rich text editor with embeds and previews.
- One-click AI analysis: hit Analyze and auto-fill title, summary, and tags instead of typing metadata by hand.
- RAG search: content and notes are embedded with Gemini, stored in PostgreSQL + pgvector, and re-ranked with LLM scoring for precise results.
- Spaces: group items by theme (e.g., an `AI` space that holds all AI-related videos, tweets, and notes).
- Built-in auth: NextAuth with Google, GitHub, and email/password; rate limiting on heavy endpoints.
- Fast & cached: Upstash Redis caches AI analyses, embeddings, and search responses to cut latency and cost.
- Polished UI: responsive landing + dashboard with sidebar navigation, live embeds, and keyboard-friendly interactions.
- Shareable brain: generate secure links so others can view curated spaces or specific items.

## Table of contents

- How it works
- Architecture & stack
- Setup (env, migrate, run)
- Product features
- AI/RAG & caching details
- Auth & security
- Project map
- Operations
- Roadmap

## How it works

1. Paste a link or start a note.
2. Click Analyze to fetch platform metadata + Gemini suggestions (title, summary, tags).
3. Content/notes get embedded (1536-d) and stored in Postgres with pgvector.
4. Searches generate a fresh embedding, fetch nearest neighbors, and Gemini re-ranks for intent alignment.
5. Results and AI calls are cached; rate limits keep abuse in check.
6. Optionally create a share link to publish a space or selected items from your second brain.

## Architecture & stack

- Next.js 15 (App Router), React 19, TypeScript, Tailwind.
- Prisma + PostgreSQL with the `vector` extension for embeddings.
- Google Gemini for analysis, embeddings, and reranking.
- Upstash Redis for caching and rate limiting.
- NextAuth (Google, GitHub, credentials) for authentication.
- Platform metadata: YouTube Data API, Twitter API v2, Spotify Web API.

## Setup

**Prereqs:** Node 18+, Bun, PostgreSQL (with `CREATE EXTENSION IF NOT EXISTS vector;`), and Redis/Upstash credentials.

```bash
git clone https://github.com/prathamesh0222/coretex.git
cd coretex
bun install
```

Create a `.env` with the required keys:

```
DATABASE_URL=postgresql://user:password@localhost:5432/coretex
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...

GEMINI_API_KEY=...
YOUTUBE_API_KEY=...
TWITTER_API_KEY=...
SPOTIFY_CLIENT_ID=...
SPOTIFY_CLIENT_SECRET=...
```

Then migrate and start:

```bash
bunx prisma migrate dev
bun run dev   # or: bun dev
```

## Product features

- Rich captures: live embeds for YouTube/Twitter/Spotify; rich text editor for notes.
- AI metadata: Gemini suggests title/summary/tags with one click.
- Spaces: create themed spaces (e.g., `AI`) and store related videos, tweets, and notes together.
- Sharing: generate share links for spaces or specific content/notes (with activation control) so others can browse your second brain safely.
- Tags and filters: tag any item and filter by type.
- Responsive UX: landing + dashboard with sidebar navigation, keyboard-friendly flows.

## AI, RAG, and caching

- Analysis (`app/api/ai/analyze`): platform metadata fetch + Gemini summarization; cached in Upstash Redis (30d) to reduce cost.
- Embeddings (`lib/embedding.ts`): Gemini embeddings cached for 7d; stored as `vector(1536)` in Postgres.
- Search (`app/api/search`): generate embedding for the query, fetch nearest neighbors via pgvector, rerank with Gemini, cache results for 5 minutes.
- Rate limits (`lib/redis.ts`): Upstash Ratelimit protects search, analysis, and content creation.

## Auth & security

- NextAuth with Google, GitHub, and credentials (email/password).
- Session JWTs include user id/email/username.
- Server-side validation (Zod) and Prisma cascading deletes on user-owned data.
- Keep `NEXTAUTH_SECRET`, provider keys, Redis tokens, and DB creds private; prefer environment variables and secret managers in production.

## Project map (quick tour)

- `app/api/ai/analyze`: Analyze button + Gemini suggestions with caching.
- `app/api/search`: Vector search + rerank + caching + rate limits.
- `lib/embedding.ts`: Embedding generation and caching (Gemini → pgvector).
- `lib/cache.ts` / `lib/redis.ts`: Upstash Redis caching and rate limiting.
- `app/services/metadata/*`: Fetch metadata for YouTube, Twitter, Spotify.
- `components/*`: Landing UI, dashboard, embeds, rich text editor, vector search chatbox.
- `prisma/schema.prisma`: Core models (User, Content, Notes, Spaces, Tags, embeddings).

## Operations

- Dev: `bun run dev`
- Lint: `bun run lint`
- Build: `bun run build`
- Start (prod): `bun run start` (after `bun run build`)
- Migrations: `bunx prisma migrate dev`

## Roadmap ideas

- Browser extension/Share targets for one click captures.
- Better auto-tagging for notes and cross space insights.
- Collaborative spaces and shareable, time bound links.

---

Built to keep your best links, notes, and ideas organized and instantly searchable.
