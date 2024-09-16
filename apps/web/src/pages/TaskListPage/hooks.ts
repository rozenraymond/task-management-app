import { useMutation, useQuery } from "@tanstack/react-query";
import { API_BASE_URL, queryClient } from "@/lib/client";
import { Task } from "@task-management-platform/validation";

const fetchTasks = async (): Promise<Array<Task>> => {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    const data = await response.json();
    return data;
};

export const useTasks = () => {
    return useQuery({
        queryKey: ['tasks'],
        queryFn: fetchTasks
    })
};

const deleteTask = async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/task/${id}`, {
        method: 'DELETE',
    });

    const data = await response.json();
    return data;
};

export const useDeleteTask = () => {
    return useMutation({
        mutationFn: deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        }
    });
};