# MindHeal

A mental wellbeing web app: mood tracker, journal, an assistant chat and friend messaging.
MindHeal is a self-help tool and does not replace professional care.

## Stack

- Next.js 14 (App Router for `/mood-tracker`, Pages Router elsewhere), React 18, TypeScript
- NextAuth (credentials, optional Google and GitHub) with JWT sessions
- Prisma with PostgreSQL

## Local setup

```bash
npm install
cp .env.example .env        # fill in DATABASE_URL and NEXTAUTH_SECRET
npx prisma migrate dev      # creates the tables
npm run dev
```

Open http://localhost:3000.

## Environment variables

See `.env.example`. `DATABASE_URL` and `NEXTAUTH_SECRET` are required. The OAuth and
`OPENAI_API_KEY` variables are optional; the related features are disabled without them.

## Deploying to Vercel

1. Create a PostgreSQL database (Neon, Supabase or Vercel Postgres) and copy its connection string.
2. Apply the schema once from your machine, with `DATABASE_URL` pointing at that database:
   `npx prisma migrate deploy` (or `npx prisma db push` if you have no migrations yet).
3. Import the repository in Vercel.
4. Add `DATABASE_URL` and `NEXTAUTH_SECRET` under Project Settings > Environment Variables
   (plus any optional variables).
5. Deploy. The build runs `prisma generate && next build`.

## Project layout

```
app/            App Router: mood tracker (Server Component, Server Action, Suspense)
pages/          Pages Router: landing, auth, chat, journal, assistant, API routes
middleware.ts   Redirects signed-out visitors away from /mood-tracker and /chat
components/     Shared UI
lib/            Prisma client, mood data and rules
prisma/         Database schema
```

## License

MIT
