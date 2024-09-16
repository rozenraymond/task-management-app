import { TaskForm } from "@/components/TaskForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TaskFormSchema } from "@task-management-platform/validation";
import { useParams } from "react-router-dom";

export const EditTaskPage = () => {
  const { id } = useParams<{ id: string }>();
  const handleSubmit = (value: TaskFormSchema) => {
    console.log("new value", value);
  };

  console.log("id", id);

  return (
    <div className="container mx-auto px-4 py-8 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Edit task</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskForm onSubmit={handleSubmit} />
        </CardContent>
      </Card>
    </div>
  );
};
