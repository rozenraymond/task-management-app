# Task Management API

The backend API for the Task Management application, which supports task-related operations such as viewing, creating, editing, deleting, searching, and sorting tasks.

## Tech Stack

- **Express.js** - Web framework
- **TypeScript** - For type safety and modern JavaScript features
- **Prisma** - ORM for interacting with PostgreSQL
- **PostgreSQL** - Database

## Features

- REST API for managing tasks (CRUD)
- Search tasks by name
- Sort tasks by due date and creation date
- Pagination for task lists to handle large volumes of data

## Setup Instructions

### Prerequisites

- [Docker](https://docs.docker.com/desktop/) (for local development)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)

### Installation

1. Install the dependencies:

   ```bash
   yarn install
   ```

2. Set up the environment variables by copying the example file:

   ```bash
   cp .env.example .env
   ```

3. Start DB using docker at the root level

   ```bash
   docker-compose run -p 5432:5432 --rm postgres
   ```

4. Generate prisma schema run database migrations and seed data using Prisma:

   ```bash
   yarn build && yarn setup
   ```

5. Start the API server:

   ```bash
   yarn dev
   ```

6. The API will be available at `http://localhost:3000`.

## API Endpoints

- `GET /tasks` - Retrieve a list of tasks
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Edit a task
- `DELETE /tasks/:id` - Delete a task
- `GET /tasks/search?name=<taskName>` - Search for tasks by name
- `GET /tasks?sort=<field>&order=<asc|desc>` - Sort tasks by due date or creation date
