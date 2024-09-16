import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "@/lib/client";
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