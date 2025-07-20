# Express Backend with Authentication

Express.js backend application with JWT authentication, user management, and MySQL database using Prisma ORM.

## Features

- JWT Authentication with HTTP-only cookies
- User management (CRUD operations)
- Role-based access control (Administration, Entretien, Comptabilité, RH)
- Password setup via email tokens
- API documentation with Swagger
- MySQL database with Prisma ORM

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- npm

## Getting Started

### 1. Start the MySQL Database

```bash
docker-compose up -d
```

This will start a MySQL container on port 3306.

### 2. Install Dependencies

```bash
npm install
```

### 3. Set up Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="mysql://root:yourpassword@localhost:3306/yourdatabase"
JWT_SECRET="your-jwt-secret-key"
FRONTEND_URL="http://localhost:3000"
NODE_ENV="development"
```

### 4. Run Database Migrations

```bash
npx prisma migrate dev
```

This will create the database tables based on the Prisma schema.

### 5. Start the Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3000`.

### 6. (Optional) Open Prisma Studio

To view and manage your database data:

```bash
npx prisma studio
```

Prisma Studio will open at `http://localhost:5555`.

## API Documentation

Once the server is running, you can access the Swagger API documentation at:

```
http://localhost:3000/api-docs
```




## User Roles

- **Administration** - Full access
- **Entretien** - Maintenance role
- **Comptabilité** - Accounting role
- **RH** - Human Resources role

## Development

The application uses:
- Express.js for the web framework
- Prisma as the ORM
- MySQL as the database
- JWT for authentication
- bcryptjs for password hashing
- Swagger for API documentation