"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserZodValidation = void 0;
const zod_1 = require("zod");
const user_interface_1 = require("./user.interface");
exports.createUserZodValidation = zod_1.z.object({
    name: zod_1.z
        .string({ message: "Name is required" })
        .min(2, "Name must be at least 2 characters long"),
    email: zod_1.z
        .string({ message: "Email is required" })
        .email("Please provide a valid email address"),
    password: zod_1.z
        .string({ message: "Password is required" })
        .min(8, "Password must be at least 8 characters long"),
    phone: zod_1.z
        .string({ message: "Phone number is required" })
        .regex(/^(?:\+88)?01[3-9]\d{8}$/, "Please provide a valid Bangladeshi phone number"),
    role: zod_1.z.enum(Object.keys(user_interface_1.Role)).optional(),
    isAgentApproved: zod_1.z.boolean().optional(),
});
