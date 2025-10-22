import { z } from "zod";

export const credentialsSchema = z.object({
    name: z.string().min(1, "Name is required").max(50).optional(),
    username: z.string().email("Invalid email address"),
    password: z
        .string()
        .min(1, "Password cannot be empty")
        .max(256, "Password too long")
        .regex(/^[\s\S]*$/, "Invalid password format"),
});

export type CredentialsInput = z.infer<typeof credentialsSchema>;
