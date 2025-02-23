# Ngx-Todo

Todo application built with Angular, NgRx Signal, Express, PostgresQL, TypeORM

## Features

- Add a new todo
- Mark a todo as completed or progress
- Update a todo
- Delete a todo

## Setup Instructions

### Prerequisites

- Node.js (v22 or higher)
- npm or yarn package manager
- PostgreSQL database (only for non-Docker setup)
- Docker (for Docker setup)

### Docker Setup

1. Clone the repository

2. Rename the `.env.example` file in the root directory to `.env` and update the credentials such as database _name_, _username_, _password_ with your own

3. Start the application using Docker Compose:

```bash
docker-compose up --build
```

The application will be available at **http://localhost:4200** and the server will be available at **http://localhost:3000**

---

### Alternative Setup (Without Docker)

#### Database Setup

1. Create a PostgreSQL database for the application
2. Rename the `.env.example` file in the `server` directory to `.env` and update the credentials such as database name, username, password with your own

#### Backend Setup

1. Navigate to the server directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

For production:

```bash
npm start
```

The server will run on http://localhost:3000 by default.

#### Frontend Setup

1. Navigate to the client directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The application will be available at http://localhost:4200.

For production build:

```bash
npm run build
```

---

### Testing

To run frontend tests:

```bash
cd client
npm test
```

To run backend tests:

```bash
cd server
npm test
```

---

## Project Structure

```
├── client/          # Angular frontend application
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/      # Core services and interceptors
│   │   │   ├── features/  # Feature components
│   │   │   └── store/     # NgRx Signal store
│   │   └── shared/        # Shared models
|   └── Dockerfile         # Docker configuration for Frontend
└── server/          # Express backend application
│   ├── src/
│   │   ├── config/        # Database configuration
│   │   ├── controllers/   # Route controllers
│   │   ├── entities/      # TypeORM entities
│   │   └── routes/        # API routes
│   └── Dockerfile         # Docker configuration for API
└── docker-compose.yml  # Docker services configuration
```
