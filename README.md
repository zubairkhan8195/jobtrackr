# JobTrackr

Full-stack job application tracker. Manage applications, add notes, filter and search your pipeline, and view dashboard stats. Admins can view all users' applications and platform-wide metrics.

## Tech Stack

| Layer      | Technologies                                      |
|------------|---------------------------------------------------|
| Backend    | Node.js, Express, MongoDB, Mongoose               |
| Frontend   | Next.js 16, TypeScript, Tailwind CSS, React Query |
| Auth       | JWT (role-based: `user` / `admin`)                |
| Validation | Zod                                               |

## Project Structure

```
jobtrackr/
├── backend/          # REST API
├── frontend/         # Next.js app
├── README.md         # This file — project overview
└── .gitignore        # Shared ignore rules
```

## Prerequisites

- Node.js 18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

## Quick Start

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

API runs at `http://localhost:5000`.

For full API documentation, endpoints, and examples, see **[backend/README.md](./backend/README.md)**.

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
# Set NEXT_PUBLIC_API_URL to your backend URL
npm run dev
```

App runs at `http://localhost:3000`.

For routes, project structure, and frontend details, see **[frontend/README.md](./frontend/README.md)**.

## Environment Variables

Each app has its own env file. **Never commit `.env` or `.env.local`** — only the `.env.example` templates.

| App      | Template                | Local file            |
|----------|-------------------------|-----------------------|
| Backend  | `backend/.env.example`  | `backend/.env`        |
| Frontend | `frontend/.env.example` | `frontend/.env.local` |

## Features

- User auth (register, login, JWT)
- Role-based access — users and admins have separate dashboards
- Application CRUD with ownership checks
- Notes on applications
- Filter, search, sort, and paginate applications
- User dashboard with stats and recent applications
- Admin panel (all applications with owner info + global stats)

## Scripts

Run from each package directory:

```bash
# Backend
cd backend && npm run dev

# Frontend
cd frontend && npm run dev
```

## License

ISC
