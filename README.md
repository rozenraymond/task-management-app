# Task Management App

This monorepo contains a full-stack task management application that allows users to:

- View a list of tasks.
- Create, edit, and delete tasks.
- Search tasks by name.
- Sort tasks by due date and creation date.

To ensure the system performs efficiently with potentially tens of thousands of tasks, **pagination** has been implemented in both the **API** and the **web app**. This approach helps manage large volumes of data and prevents timeouts by limiting the number of tasks retrieved and displayed at once.

## Tech Stack

### Development Tools

- **Docker**
- **Turborepo** (for monorepo management)

### Frontend

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Shadcn UI**
- **React Query**
- **Zustand**

### Backend

- **Express.js**
- **TypeScript**
- **Prisma** (ORM)
- **PostgreSQL**

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- [Docker](https://docs.docker.com/desktop/) (required for local development)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) (for dependency management)

### Installation & Local Setup

1. Clone the repository and navigate to the project root:

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

4. Once the services are running, access the web app at [http://localhost:8080](http://localhost:8080).

### Docker Setup

The `docker-compose.yml` file is designed to closely emulate the production environment. When `docker-compose up` is run, the following occurs:

- **Database Initialization**: A PostgreSQL database is started to match the production environment.
- **Building Services**: Both the backend API and frontend web application are built within Docker containers to ensure consistency between development and production builds.
- **Database Seeding**: The database is seeded with initial data for easier testing and evaluation of the app.
- **Accessing the App**:
  - The web app is accessible at [http://localhost:8080](http://localhost:8080).
  - The API is accessible at [http://localhost:3000](http://localhost:3000).

## Future Enhancements

1. **Advanced Task Filtering**: Allow users to filter tasks based on additional criteria such as task status, priority, or category to give more control over how tasks are displayed and managed.

2. **UX Improvement – Bulk Actions**: Add functionality for users to bulk select and delete multiple tasks, improving the user experience and making it easier to manage large numbers of tasks.

3. **Real-time Updates**: Implement WebSockets or similar technology for real-time updates, allowing users to see changes (e.g., task edits or status updates) as they happen, enhancing collaboration and user experience.

4. **Test Coverage**: Expand unit and integration test coverage, especially for edge cases and performance scenarios, ensuring the application remains robust and reliable as features are added.

5. **Database Indexing**: Add indexing on frequently queried fields such as `taskName`, `dueDate`, and `status` to improve query performance as the number of tasks grows.
