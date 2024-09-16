import { TaskForm } from "@/components/TaskForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TaskFormSchema } from "@task-management-platform/validation";
import { useNavigate, useParams } from "react-router-dom";
import { useTask, useUpdateTask } from "./hooks";
import { Spinner } from "@/components/ui/spinner";

export const EditTaskPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useTask(id);
  const { mutateAsync: updateTask, isPending: isSubmitting } = useUpdateTask();

  const navigate = useNavigate();

  const handleSubmit = async (value: TaskFormSchema) => {
    await updateTask({ id: id || "", ...value });
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-4">
        <Spinner className="text-green-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Edit task</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskForm
            onSubmit={handleSubmit}
            defaultValues={data}
            isSubmitting={isSubmitting}
          />
        </CardContent>
      </Card>
    </div>
  );
};
