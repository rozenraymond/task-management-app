import { useMutation, useQuery } from "@tanstack/react-query";
import { API_BASE_URL, queryClient } from "@/lib/client";
import { Task } from "@task-management-platform/validation";

const fetchTasks = async ({
  page,
  searchTerm,
  sortBy,
  sortOrder,
  itemsPerPage,
}: {
  page: number;
  searchTerm: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
  itemsPerPage: number;
}): Promise<{ totalCount: number; tasks: Array<Task> }> => {
  const skip = (page - 1) * itemsPerPage;
  const response = await fetch(
    `${API_BASE_URL}/tasks?skip=${skip}&take=${itemsPerPage}&searchTerm=${searchTerm}&sortBy=${sortBy}&sortOrder=${sortOrder}`
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
  itemsPerPage,
}: {
  page: number;
  searchTerm: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
  itemsPerPage: number;
}) => {
  return useQuery({
    queryKey: ["tasks", page, searchTerm, sortBy, sortOrder, itemsPerPage],
    queryFn: () =>
      fetchTasks({ page, searchTerm, sortBy, sortOrder, itemsPerPage }),
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
