# JobTrackr — Backend API

REST API for tracking job applications. Built with Node.js, Express, and MongoDB.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT + bcrypt
- **Validation:** Zod

## Features

- User registration, login, and protected routes
- Full CRUD for job applications (owner-scoped)
- Notes on applications (create, list, delete)
- Filtering, search, sorting, and pagination
- User dashboard stats (total, by status, this week)
- Admin panel API (all applications + global stats)
- Role-based access control (`user` / `admin`)

## Project Structure

```
src/
├── config/          # Database connection
├── controllers/     # Request handlers
├── middleware/      # Auth, validation, error handling
├── models/          # Mongoose schemas
├── routes/          # Route definitions
├── utils/           # Shared helpers
├── validators/      # Zod schemas
├── app.js           # Express app setup
└── server.js        # Entry point
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Installation

```bash
cd backend
npm install
```

### Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

| Variable      | Description                          | Example                          |
|---------------|--------------------------------------|----------------------------------|
| `PORT`        | Server port                          | `5000`                           |
| `MONGO_URI`   | MongoDB connection string            | `mongodb://127.0.0.1:27017/jobtrackr` |
| `JWT_SECRET`  | Secret key for signing JWTs          | `your-super-secret-key-change-in-production` |
| `JWT_EXPIRE`  | Token expiry                         | `7d`                             |
| `NODE_ENV`    | Environment mode                     | `development`                    |

### Run

```bash
# Development (with nodemon)
npm run dev

# Production
npm start
```

Server runs at `http://localhost:5000` by default.

## Authentication

Protected routes require a Bearer token:

```
Authorization: Bearer <your_jwt_token>
```

Register or login to receive a token. Tokens are returned in the response body.

### Admin Access

New users are created with role `user`. To test admin endpoints, update a user in MongoDB:

```js
db.users.updateOne({ email: "admin@example.com" }, { $set: { role: "admin" } })
```

## API Endpoints

Base URL: `/api`

### Auth

| Method | Endpoint           | Access  | Description        |
|--------|--------------------|---------|--------------------|
| POST   | `/auth/register`   | Public  | Register a user    |
| POST   | `/auth/login`      | Public  | Login              |
| GET    | `/auth/profile`    | Private | Get current user   |

### Applications

| Method | Endpoint              | Access  | Description              |
|--------|-----------------------|---------|--------------------------|
| GET    | `/applications`       | Private | List own applications    |
| GET    | `/applications/stats` | Private | User stats               |
| GET    | `/applications/:id`   | Private | Get single application   |
| POST   | `/applications`       | Private | Create application       |
| PUT    | `/applications/:id`   | Private | Update application       |
| DELETE | `/applications/:id`   | Private | Delete application       |

**Query params for `GET /applications`:**

| Param    | Type   | Description                                      |
|----------|--------|--------------------------------------------------|
| `page`   | number | Page number (default: `1`)                     |
| `limit`  | number | Items per page, max 50 (default: `10`)         |
| `status` | string | `applied`, `interview`, `offer`, `rejected`, `accepted` |
| `source` | string | `linkedin`, `referral`, `company-site`, `other` |
| `search` | string | Search company or position                       |
| `sort`   | string | Sort field; prefix `-` for descending (e.g. `-salary`) |

Sortable fields: `salary`, `company`, `position`, `status`, `createdAt`, `appliedDate`

### Notes

| Method | Endpoint                        | Access  | Description     |
|--------|---------------------------------|---------|-----------------|
| POST   | `/applications/:id/notes`       | Private | Add a note      |
| GET    | `/applications/:id/notes`       | Private | List notes      |
| DELETE | `/notes/:noteId`                | Private | Delete a note   |

### Admin

| Method | Endpoint               | Access | Description                    |
|--------|------------------------|--------|--------------------------------|
| GET    | `/admin/applications`  | Admin  | All applications (with user info) |
| GET    | `/admin/stats`         | Admin  | Platform-wide stats            |

Admin list supports the same query params as user applications.

## Request & Response Examples

### Create Application

```http
POST /api/applications
Authorization: Bearer <token>
Content-Type: application/json

{
  "company": "Google",
  "position": "Frontend Developer",
  "status": "applied",
  "source": "linkedin",
  "salary": 120000,
  "location": "Remote"
}
```

### Success Response

```json
{
  "success": true,
  "data": { ... }
}
```

### Stats Response

```json
{
  "success": true,
  "data": {
    "total": 12,
    "byStatus": {
      "applied": 5,
      "interview": 2,
      "offer": 1,
      "rejected": 3,
      "accepted": 1
    },
    "thisWeek": 4
  }
}
```

### Error Response

```json
{
  "message": "Validation failed",
  "errors": [
    { "field": "company", "message": "Company is required" }
  ]
}
```

## Application Model

| Field         | Type     | Required | Notes                                      |
|---------------|----------|----------|--------------------------------------------|
| `company`     | string   | Yes      | Max 100 characters                         |
| `position`    | string   | Yes      | Max 100 characters                         |
| `status`      | enum     | No       | Default: `applied`                         |
| `jobUrl`      | string   | No       | Valid URL                                  |
| `location`    | string   | No       |                                            |
| `salary`      | number   | No       | Min: 0                                     |
| `source`      | enum     | No       | Default: `other`                           |
| `appliedDate` | date     | No       | Default: current date                      |

Deleting an application also deletes its associated notes.

## Scripts

| Command       | Description              |
|---------------|--------------------------|
| `npm run dev` | Start with nodemon       |
| `npm start`   | Start production server  |

## License

ISC
