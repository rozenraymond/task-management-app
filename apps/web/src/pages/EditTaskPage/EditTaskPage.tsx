import { TaskForm } from '@/components/TaskForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TaskFormSchema } from '@task-management-platform/validation';
import { endOfDay } from 'date-fns';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useTask, useUpdateTask } from './hooks';

export const EditTaskPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useTask(id);
  const { mutateAsync: updateTask, isPending: isSubmitting } = useUpdateTask();

  const navigate = useNavigate();

  const handleSubmit = async (value: TaskFormSchema) => {
    if (id) {
      await updateTask({
        ...value,
        id,
        dueDate: endOfDay(value.dueDate).toISOString(),
      });
      navigate('/');
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-4">
        <Loader2 aria-label="spinner" className="mr-2 h-10 w-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-4">
      <Button variant="ghost" asChild className="text-sm" size="sm">
        <Link to="/">
          <ChevronLeft className="h-5 w-5" /> Back
        </Link>
      </Button>
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
