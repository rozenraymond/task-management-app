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
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) (for dependency management)

### Installation & Local Setup

1. Clone the repository and navigate to the project root.

   ```bash
   git clone https://github.com/rozenraymond/task-management-app.git
   cd task-management-app
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Start the services using Docker Compose:

   ```bash
   yarn docker:up
   ```

4. Once the services are running, access the web app at: [http://localhost:8080](http://localhost:8080)

### Docker Setup

The `docker-compose.yml` file is designed to emulate the production environment as closely as possible. When docker-compose up is run, the following happens:

- **Database Initialisation**: A PostgreSQL database is started, ensuring the same environment as production.
- **Building Services**: Both the backend API and the frontend web application are built within Docker containers, ensuring consistency between development and production builds.
- **Database Seeding**: The database is seeded with initial data to simplify testing and evaluation of the app.
- **Accessing the App**:
  - The web app can be accessed at http://localhost:8080.
  - The API can be accessed at http://localhost:3000.

### Future enhancements

1. Advanced Task Filtering: Allow users to filter tasks based on additional criteria such as task status, priority, or category, giving more control over how tasks are displayed and managed.

2. UX Improvement – Bulk Actions: Enhance the user experience by adding the ability to bulk select and delete multiple tasks at once, saving users time when managing a large number of tasks.

3. Real-time Updates: Use WebSockets or a similar technology to provide real-time updates. This would allow users to see live changes to tasks (e.g., edits, status updates) as they happen, enhancing collaboration and improving the user experience.

4. Test Coverage: Increase the coverage of unit and integration tests, particularly for edge cases and performance scenarios, to ensure the application remains robust and reliable as features expand.

5. Database Indexing: Add indexing on commonly queried fields such as taskName, dueDate, and status to further improve query performance, especially as the number of tasks grows.
