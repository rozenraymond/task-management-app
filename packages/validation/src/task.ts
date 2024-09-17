import { z } from "zod";
export type Task = {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
};

export const taskFormSchema = z.object({
  name: z
    .string()
    .min(1, "Task name is required")
    .max(100, "Task name must be 100 characters or less"),
  description: z
    .string()
    .min(1, "Task description is required.")
    .max(500, "Task description must be 500 characters or less"),
  dueDate: z
    .string()
    .datetime()
    .refine(
      (date) => {
        return new Date(date) >= new Date(new Date().setHours(0, 0, 0, 0));
      },
      {
        message: "Due date must be today or in the future",
      }
    ),
});

export const updateTaskFormSchema = taskFormSchema.extend({
  id: z.string(),
});

export type TaskFormSchema = z.infer<typeof taskFormSchema>;
export type UpdateTaskFormSchema = z.infer<typeof updateTaskFormSchema>;
