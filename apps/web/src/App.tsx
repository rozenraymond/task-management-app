import { lazy, Suspense } from 'react';
import { queryClient } from '@/lib/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes } from 'react-router-dom';

const TaskListPage = lazy(() => import('@/pages/TaskListPage'));
const AddTaskPage = lazy(() => import('@/pages/AddTaskPage'));
const EditTaskPage = lazy(() => import('@/pages/EditTaskPage'));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" Component={TaskListPage} />
          <Route path="/add" Component={AddTaskPage} />
          <Route path="/edit/:id" Component={EditTaskPage} />
        </Routes>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
