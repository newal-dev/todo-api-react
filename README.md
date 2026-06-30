# todo-api-react
A full-stack to-do app built to practice JWT auth, hashing, MVC structure, 
and a React + Express + PostgreSQL stack.

## Tech Stack
- Backend: Node.js, Express.js
- Frontend: React (Vite)
- Database: PostgreSQL
- Auth: JWT, bcryptjs (password hashing)
- Logging: Winston/Morgan
- Validation: express-validator

## Features
- User registration & login (JWT-based sessions)
- Authenticated CRUD on personal to-do items
- Input validation & error handling
- Request logging

## Setup

### Backend
1. cd backend
2. npm install
3. Copy .env.example to .env and fill in values
4. Create the database and run db/schema.sql
5. npm run dev

### Frontend
1. cd frontend
2. npm install
3. npm run dev

## Environment Variables
| Variable      | Description                  |
|---------------|-------------------------------|
| PORT          | Backend server port           |
| DATABASE_URL  | Postgres connection string    |
| JWT_SECRET    | Secret for signing JWTs       |

## Database Schema
See `backend/db/schema.sql`