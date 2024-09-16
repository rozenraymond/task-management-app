import { Route, Routes } from "react-router-dom";
import { TaskListPage } from "@/pages/TaskListPage";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/client";
import { AddTaskPage } from "@/pages/AddTaskPage";
import { EditTaskPage } from "@/pages/EditTaskPage";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" Component={TaskListPage} />
        <Route path="/add" Component={AddTaskPage} />
        <Route path="/edit/:id" Component={EditTaskPage} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
