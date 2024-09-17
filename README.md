# Blogger

Blogger is a sophisticated and user-friendly blogging platform designed for both content creators and readers. Built with a robust tech stack, Blogger combines modern technologies to deliver a high-performance and scalable blogging experience.

## Key Features

-> Docker: Containerize the application for consistent environments and streamlined deployment, ensuring scalability and ease of management across different setups.

-> TypeScript: Enhance code reliability and maintainability with TypeScript’s type safety, reducing bugs and improving development efficiency.

-> PostgreSQL: Use PostgreSQL as the relational database for reliable data storage and complex query capabilities.

-> Prisma: Simplify database interactions with Prisma, providing an intuitive and type-safe ORM (Object-Relational Mapping) for seamless data connectivity and management.

-> Redis: Leverage Redis for server-side caching and custom rate limiters to boost performance and manage API request rates effectively.

-> Express: Build a robust server-side application with Express, providing a minimal and flexible framework for handling HTTP requests and middleware.

-> React: Create a dynamic and responsive user interface with React, ensuring a smooth and engaging experience for users.

-> Redux: Manage application state efficiently with Redux, facilitating real-time updates and a consistent user experience across the platform.

## Security Features

-> Express Rate Limiters: Utilize Express rate limiters to protect the application from abuse by limiting the number of requests a user can make to specific endpoints within a given time frame. This helps prevent overloading the server and reduces the risk of denial-of-service attacks.

-> Custom Rate Limiters with Redis: Integrate Redis for custom rate limiting to manage and track request rates dynamically. Redis-based rate limiters offer high performance and flexibility, allowing you to define complex rate-limiting rules and manage user request quotas efficiently. This includes setting limits per user, IP, or API key, and ensuring fair usage across the platform.

-> Redis Caching: Leverage Redis for server-side caching to speed up data retrieval and reduce database load, enhancing overall application performance and user experience.

-> Express Middleware: Employ Express middleware for additional security checks and request validation, ensuring that the application adheres to security best practices and maintains integrity.

## Getting Started

```bash
// HTTP
> git clone https://github.com/Triyaambak/Blogger.git

// SSH

> git clone git@github.com/Triyaambak/Blogger
```

## Setting up docker-compose.yml env variables

```bash
> touch .env
```

### Your .env file should contain the following 

```env
POSTGRES_PORT=xxxx
FRONTEND_PORT=xxxx
BACKEND_PORT=xxxx
REDIS_PORT=xxxx
```

## Setting up backend

```bash
> touch ./backend/.env
```

### Your ./backend/.env file should contain the following 

```env
POSTGRES_USER=****
POSTGRES_PASSWORD=****
POSTGRES_PORT=xxxx
DATABASE_URL=*******************
BACKEND_PORT=xxxx
JWT_SECRET=***************************
JWT_EXPIRATION_TIME=xd
REDIS_PORT=xxxx
```

## Setting up frontend

```bash
> touch ./frontend/.env
```

### Your ./frontend/.env file should contain the following 

```env
VITE_BACKEND_PORT=xxxx
VITE_BACKEND_URL=*************
```
## Now after everything is set

```bash
> docker compose up --watch
```

