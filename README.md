# Todo App — Practice Project

A full-stack to-do application built to practice JWT authentication, 
password hashing, MVC architecture, and a React + Express + PostgreSQL stack.

## Tech Stack
- **Backend:** Node.js, Express.js
- **Frontend:** React (Vite)
- **Database:** PostgreSQL
- **Auth:** JWT, bcryptjs (password hashing)
- **Logging:** Winston, Morgan
- **Validation:** express-validator

## Features
- User registration and login with hashed passwords
- JWT-based session management
- Protected routes (frontend and backend)
- Full CRUD on personal todos (title, description, priority, due date)
- Input validation with field-level error messages
- Request logging to console and log files

## Setup

### Prerequisites
- Node.js installed
- PostgreSQL installed and running

### Backend
1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and fill in your values
4. Create the database: `psql -U postgres -c "CREATE DATABASE todoapp;"`
5. Run the schema: `psql -U postgres -d todoapp -f db/schema.sql`
6. `node server.js`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## Environment Variables

| Variable        | Description                          |
|-----------------|--------------------------------------|
| PORT            | Backend port (default 4000)          |
| DATABASE_URL    | PostgreSQL connection string         |
| JWT_SECRET      | Secret key for signing JWTs          |
| JWT_EXPIRES_IN  | Token expiry duration (e.g. 1h)      |
| LOG_LEVEL       | Winston log level (e.g. info)        |

## Database Schema
See `backend/db/schema.sql`

### Tables
- **users** — id, username, email, password_hash, role, created_at
- **todos** — id, user_id (FK), title, description, is_done, priority, due_date, created_at, updated_at