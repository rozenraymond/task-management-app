import { useMutation, useQuery } from "@tanstack/react-query";
import { API_BASE_URL, queryClient } from "@/lib/client";
import { Task } from "@task-management-platform/validation";

export const ITEMS_PER_PAGE = 10;

const fetchTasks = async ({
  page,
  searchTerm,
  sortBy,
  sortOrder,
}: {
  page: number;
  searchTerm: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
}): Promise<{ totalCount: number; tasks: Array<Task> }> => {
  const skip = (page - 1) * ITEMS_PER_PAGE;
  const response = await fetch(
    `${API_BASE_URL}/tasks?skip=${skip}&take=${ITEMS_PER_PAGE}&searchTerm=${searchTerm}&sortBy=${sortBy}&sortOrder=${sortOrder}`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();

  return data;
};

export const useTasks = ({
  page,
  searchTerm,
  sortBy,
  sortOrder,
}: {
  page: number;
  searchTerm: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
}) => {
  return useQuery({
    queryKey: ["tasks", page, searchTerm, sortBy, sortOrder],
    queryFn: () => fetchTasks({ page, searchTerm, sortBy, sortOrder }),
  });
};

const deleteTask = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/task/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();
  return data;
};

export const useDeleteTask = () => {
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
