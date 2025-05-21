# User Access Management System

A comprehensive platform for user registration, authentication, software access requests, and managerial approvals.

## Technology Stack

- **Backend:** Node.js with Express.js
- **Frontend:** React
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **Authentication:** JWT (JSON Web Tokens)
- **Utilities:** bcrypt (password hashing), dotenv (environment variables), nodemon (development server), cors, body-parser

## Key Features

- User registration (default role: Employee)
- JWT-based login and authentication
- Role-based access and redirection:
  - **Employee:** Register, log in, request software access, and view their own requests
  - **Manager:** View and approve/reject access requests
  - **Admin:** Create software listings and has full system access
- Software listing and creation (Admin only)
- Employees can submit software access requests
- Managers can approve or reject requests

## Project Structure

```
user-access-management/
├── backend/        # Node.js/Express backend
├── frontend/       # React frontend
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn
- Running PostgreSQL server

### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create a .env file (or copy from .env.example)
# cp .env.example .env

# Edit backend/.env with your PostgreSQL credentials and JWT secret:
# PORT=5000
# DB_HOST=localhost
# DB_PORT=5432
# DB_USERNAME=your_postgres_user
# DB_PASSWORD=your_postgres_password
# DB_DATABASE=user_access_db  # Ensure this database exists
# JWT_SECRET=your_super_secret_jwt_key_very_long_and_random
# ADMIN_USERNAME=admin
# ADMIN_PASSWORD=admin123

# Start the backend server (development mode)
npm run dev

# For production mode:
# npm start
```

The backend runs at `http://localhost:5000` (or as set in `.env`).
TypeORM's `synchronize: true` is enabled for development, so tables are auto-created. For production, use migrations. A default admin user is created if it doesn't exist.

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create a .env file (or copy from .env.example)
# cp .env.example .env

# Edit frontend/.env if your backend uses a different port:
# REACT_APP_API_URL=http://localhost:5000/api

# Start the frontend development server
npm start
```

The React app runs at `http://localhost:3000` (or another port if 3000 is in use).

### 3. Database Setup
- Ensure PostgreSQL is running.
- Create a database named `user_access_db` (or as specified in `backend/.env`).
- The backend will auto-create tables (`users`, `software`, `requests`) if they don't exist.

## API Overview

Base URL: `/api`

### Authentication (`/api/auth`)

- **POST /signup**
  - Register a new user.
  - Body: `{ "username": "testuser", "password": "password123", "role": "Employee" }` (role optional, defaults to Employee)
  - Success (201): `{ "message": "User registered successfully", "userId": 1 }`

- **POST /login**
  - Log in an existing user.
  - Body: `{ "username": "testuser", "password": "password123" }`
  - Success (200): `{ "message": "Login successful", "token": "jwt_token_here", "user": { "id": 1, "username": "testuser", "role": "Employee" } }`

### Software Management (`/api/software`)

- **POST /** (Admin only, JWT required)
  - Add new software.
  - Header: `Authorization: Bearer <jwt_token>`
  - Body: `{ "name": "Photoshop", "description": "Image editing software", "accessLevels": ["Read", "Write"] }`

- **GET /** (JWT required)
  - List all available software.
  - Header: `Authorization: Bearer <jwt_token>`

### Access Requests (`/api/requests`)

- **POST /** (Employee only, JWT required)
  - Submit a new access request.
  - Header: `Authorization: Bearer <jwt_token>`
  - Body: `{ "softwareId": 1, "accessType": "Read", "reason": "Need it for project X" }`

- **GET /my-requests** (Authenticated user, JWT required)
  - View all requests submitted by the logged-in user.
  - Header: `Authorization: Bearer <jwt_token>`

- **GET /pending** (Manager/Admin only, JWT required)
  - View all pending access requests for approval.
  - Header: `Authorization: Bearer <jwt_token>`

- **PATCH /:id** (Manager/Admin only, JWT required)
  - Approve or reject an access request.
  - Header: `Authorization: Bearer <jwt_token>`
  - Params: `id` (request ID)
  - Body: `{ "status": "Approved" }` or `{ "status": "Rejected" }`

## Running the Application

1. Start PostgreSQL and ensure the database (e.g., `user_access_db`) exists.
2. In a terminal, go to `user-access-management/backend` and run `npm run dev`.
3. In another terminal, go to `user-access-management/frontend` and run `npm start`.
4. Open your browser at `http://localhost:3000`.
5. 
