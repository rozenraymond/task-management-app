import { TaskForm } from '@/components/TaskForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TaskFormSchema } from '@task-management-platform/validation';
import { endOfDay } from 'date-fns';
import { ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { useCreateTask } from './hooks';

export const AddTaskPage = () => {
  const { mutateAsync: createTask, isPending } = useCreateTask();
  const navigate = useNavigate();

  const handleSubmit = async (formValue: TaskFormSchema) => {
    await createTask({
      ...formValue,
      dueDate: endOfDay(formValue.dueDate).toISOString(),
    });
    navigate('/');
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
