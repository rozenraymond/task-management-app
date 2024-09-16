import { TaskForm } from "@/components/TaskForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskFormSchema } from "@task-management-platform/validation";
import { useCreateTask } from "./hooks";
import { useNavigate } from "react-router-dom";

export const AddTaskPage = () => {
  const { mutateAsync: createTask, isPending } = useCreateTask();
  const navigate = useNavigate();

  const handleSubmit = async (formValue: TaskFormSchema) => {
    await createTask(formValue);
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Add new task</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskForm onSubmit={handleSubmit} isSubmitting={isPending} />
        </CardContent>
      </Card>
    </div>
  );
};
