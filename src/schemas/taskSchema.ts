import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  completed: z.boolean().optional().default(false),
});

export type TaskInput = z.infer<typeof taskSchema>;

export const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  completed: z.boolean().optional().default(false),
});
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
