import { API_BASE_URL } from '@/lib/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Task, TaskFormSchema } from '@task-management-platform/validation';

const createTask = async (task: TaskFormSchema): Promise<Task> => {
  const response = await fetch(`${API_BASE_URL}/task`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  const data = await response.json();
  return data;
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
