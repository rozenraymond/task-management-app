# Task Management App

This monorepo contains a full-stack task management application that allows users to:

- View a list of tasks.
- Create, edit, and delete specific tasks.
- Search tasks by name.
- Sort tasks by due date and creation date.

## Tech Stack

### Development Tools

- Docker
- Turborepo (for monorepo management)

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI
- React Query

### Backend

- Express.js
- TypeScript
- Prisma (ORM)
- PostgreSQL

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- [Docker](https://docs.docker.com/desktop/) (required for local development)

### Installation & Local Setup

1. Clone the repository and navigate to the project root.

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Start the services using Docker Compose:

   ```bash
   docker-compose up
   ```

4. Once the services are running, access the web app at: [http://localhost:8080](http://localhost:8080)

### Future enhancements

- Introduce notification feature to notify user when a task is overdue or due soon.
- Add real time updates using websockets or similar technologies.
- Implement caching strategies for better performance.
