import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
});

export type LoginInput = z.infer<typeof loginSchema>;
