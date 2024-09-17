# Task Management Web

The frontend of the Task Management application, allowing users to manage tasks through a web interface.

## Tech Stack

- **React** - JavaScript library for building user interfaces
- **TypeScript** - Type safety and modern JavaScript features
- **Vite** - Fast build tool for development
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Shadcn UI** - UI components library
- **React Query** - Data fetching and state management
- **Zustand** - State management

## Features

- View a list of tasks
- Create, edit, and delete tasks
- Search tasks by name
- Sort tasks by due date and creation date

## Setup Instructions

### Prerequisites

### Installation

1. Install the dependencies:

   ```bash
   yarn install
   ```

2. Set up the environment variables by copying the example file:

   ```bash
   cp .env.example .env
   ```

3. Start the development server:

   ```bash
   yarn dev
   ```

4. Access the web app at [http://localhost:8080](http://localhost:8080).

## Future Enhancements

- Task filtering by status, priority, or category
- Bulk actions for managing multiple tasks at once
- Real-time updates with WebSockets
