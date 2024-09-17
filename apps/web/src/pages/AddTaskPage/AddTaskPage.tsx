import { TaskForm } from "@/components/TaskForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskFormSchema } from "@task-management-platform/validation";
import { useCreateTask } from "./hooks";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export const AddTaskPage = () => {
  const { mutateAsync: createTask, isPending } = useCreateTask();
  const navigate = useNavigate();

  const handleSubmit = async (formValue: TaskFormSchema) => {
    await createTask(formValue);
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-4">
      <Button variant="ghost" asChild className="text-sm" size="sm">
        <Link to="/">
          <ChevronLeft className="h-5 w-5" /> Back
        </Link>
      </Button>
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
