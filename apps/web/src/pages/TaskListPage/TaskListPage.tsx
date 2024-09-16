import { useDeleteTask, useTasks } from "./hooks";
import { TaskListTable } from "./components/TaskListTable";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const TaskListPage = () => {
  const { data } = useTasks();
  const { mutateAsync: deleteTask } = useDeleteTask();

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Task Management App
      </h1>
      <div className="mb-4">
        <Button asChild>
          <Link to="/add">Add New Task</Link>
        </Button>
      </div>

      <TaskListTable tasks={data} onDeleteTask={handleDeleteTask} />
    </div>
  );
};
