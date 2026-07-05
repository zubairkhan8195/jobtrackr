# JobTrackr Frontend

Next.js frontend for **JobTrackr** — a job application tracker with user dashboard, application management, notes, and an admin panel.

## Tech Stack

| Category | Technologies |
|----------|--------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4, shadcn/ui (base-mira) |
| Data fetching | TanStack React Query, Axios |
| Forms | React Hook Form, Zod |
| Auth | JWT (cookie-based) |

## Prerequisites

- Node.js 18+
- Backend API running (see [../backend/README.md](../backend/README.md))

## Getting Started

```bash
npm install
```

Create `.env.local` in the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Routes

### Public

| Route | Description |
|-------|-------------|
| `/auth/login` | Login |
| `/auth/register` | Register |

### User (role: `user`)

| Route | Description |
|-------|-------------|
| `/dashboard` | Overview stats + recent applications |
| `/dashboard/applications` | All applications (filters, CRUD) |
| `/dashboard/applications/[id]` | Application details + notes |

### Admin (role: `admin`)

| Route | Description |
|-------|-------------|
| `/admin` | Platform stats + all applications with owner info |

Login redirects by role: **user** → `/dashboard`, **admin** → `/admin`. Middleware and route guards prevent cross-access.

## Project Structure

```
src/
├── app/(routes)/          # Pages (App Router)
│   ├── auth/              # Login, register
│   ├── dashboard/         # User area
│   └── admin/             # Admin area
├── components/
│   ├── admin/             # Admin dashboard UI
│   ├── applications/      # Application cards, forms, filters
│   ├── auth/              # Auth forms, route guards
│   ├── dashboard/         # Shell, header, nav
│   └── ui/                # shadcn components
├── hooks/
│   ├── auth/              # useLogin, useRegister, useProfile
│   ├── applications/      # Application API hooks
│   ├── admin/             # Admin API hooks
│   └── notes/             # Notes API hooks
├── lib/                   # Axios client, helpers, formatters
├── schema/                # Zod validation schemas
├── types/                 # TypeScript types
└── constants/             # Routes, nav items, labels
```

## API Integration Pattern

Each API has its own hook file (fetcher + React Query), following the auth hooks pattern:

```
hooks/applications/use-applications.ts       → GET /applications
hooks/applications/use-create-application.ts → POST /applications
hooks/admin/use-admin-stats.ts               → GET /admin/stats
```

Pages call hooks directly; filter state lives in dedicated custom hooks (e.g. `useApplicationFilters`).

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:5000/api` |

Do not commit `.env.local`.

## Admin Setup

To test the admin panel, set a user's role to `admin` in MongoDB:

```js
db.users.updateOne({ email: "you@example.com" }, { $set: { role: "admin" } })
```

Then log in with that account — you will be redirected to `/admin`.
