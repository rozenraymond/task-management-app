import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "@/lib/client";
import { Task, TaskFormSchema } from "@task-management-platform/validation";

const fetchTaskById = async (id?: string): Promise<Task> => {
  const response = await fetch(`${API_BASE_URL}/task/${id}`);
  const data = await response.json();
  return data;
};

export const useTask = (id?: string) => {
  return useQuery({
    queryKey: ["task", id],
    queryFn: () => fetchTaskById(id),
    enabled: !!id,
  });
};

const updateTask = async ({
  id,
  ...task
}: TaskFormSchema & { id: string }): Promise<Task> => {
  const response = await fetch(`${API_BASE_URL}/task/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  const data = await response.json();
  return data;
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTask,
    onSuccess: (data) => {
      // Invalidate the specific task query
      queryClient.invalidateQueries({ queryKey: ["task", data.id] });

      // Invalidate all tasks queries
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
