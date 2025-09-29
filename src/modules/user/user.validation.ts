import { z } from "zod";
import { Role } from "./user.interface";

export const createUserZodValidation = z.object({
    name: z
        .string({ message: "Name is required" })
        .min(2, "Name must be at least 2 characters long"),

    email: z
        .string({ message: "Email is required" })
        .email("Please provide a valid email address"),

    password: z
        .string({ message: "Password is required" })
        .min(8, "Password must be at least 8 characters long"),

    phone: z
        .string({ message: "Phone number is required" })
        .regex(/^(?:\+88)?01[3-9]\d{8}$/, "Please provide a valid Bangladeshi phone number"),
    role: z.enum(Object.keys(Role) as [string]).optional(),
    isAgentApproved: z.boolean().optional(),
});
