"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveDriverZodSchema = exports.updateUserZodSchema = exports.createUserZodSchema = void 0;
const zod_1 = require("zod");
const user_interface_1 = require("./user.interface");
// Vehicle info schema for drivers
const vehicleInfoZodSchema = zod_1.z.object({
    type: zod_1.z.string().min(1, "Vehicle type is required"),
    licensePlate: zod_1.z.string().min(1, "License plate is required"),
});
// Create user schema
exports.createUserZodSchema = zod_1.z.object({
    name: zod_1.z
        .string({ message: "Name must be a string" })
        .min(2, { message: "Name must be at least 2 characters long" })
        .max(50, { message: "Name cannot exceed 50 characters" }),
    email: zod_1.z
        .string({ message: "Email must be a string" })
        .email({ message: "Invalid email address format" })
        .min(5, { message: "Email must be at least 5 characters long" })
        .max(100, { message: "Email cannot exceed 100 characters" }),
    password: zod_1.z
        .string({ message: "Password must be a string" })
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/^(?=.*[A-Z])/, {
        message: "Password must contain at least 1 uppercase letter",
    })
        .regex(/^(?=.*[!@#$%^&*])/, {
        message: "Password must contain at least 1 special character",
    })
        .regex(/^(?=.*\d)/, { message: "Password must contain at least 1 number" }),
    phone: zod_1.z
        .string({ message: "Phone number must be a string" })
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
        message: "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
        .optional(),
    address: zod_1.z
        .string({ message: "Address must be a string" })
        .max(200, { message: "Address cannot exceed 200 characters" })
        .optional(),
    role: zod_1.z
        .enum(Object.values(user_interface_1.Role), {
        message: "Invalid role",
    })
        .optional(),
});
// Update user schema
exports.updateUserZodSchema = zod_1.z
    .object({
    name: zod_1.z
        .string({ message: "Name must be a string" })
        .min(2, { message: "Name must be at least 2 characters long" })
        .max(50, { message: "Name cannot exceed 50 characters" })
        .optional(),
    password: zod_1.z
        .string({ message: "Password must be a string" })
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/^(?=.*[A-Z])/, {
        message: "Password must contain at least 1 uppercase letter",
    })
        .regex(/^(?=.*[!@#$%^&*])/, {
        message: "Password must contain at least 1 special character",
    })
        .regex(/^(?=.*\d)/, {
        message: "Password must contain at least 1 number",
    })
        .optional(),
    phone: zod_1.z
        .string({ message: "Phone number must be a string" })
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
        message: "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
        .optional(),
    address: zod_1.z
        .string({ message: "Address must be a string" })
        .max(200, { message: "Address cannot exceed 200 characters" })
        .optional(),
    role: zod_1.z
        .enum(Object.values(user_interface_1.Role), {
        message: "Invalid role",
    })
        .optional(),
    isBlock: zod_1.z
        .enum(Object.values(user_interface_1.IsBlock), {
        message: "Invalid block status",
    })
        .optional(),
    isApproved: zod_1.z
        .boolean({ message: "isApproved must be a boolean" })
        .optional(),
    vehicleInfo: vehicleInfoZodSchema.optional(),
})
    .refine((data) => {
    if (data.vehicleInfo && (!data.vehicleInfo.type || !data.vehicleInfo.licensePlate)) {
        return false;
    }
    return true;
}, {
    message: "vehicleInfo must include both type and licensePlate if provided",
    path: ["vehicleInfo"],
});
// Approve driver schema (for admin)
exports.approveDriverZodSchema = zod_1.z.object({
    isApproved: zod_1.z.boolean({ message: "isApproved must be a boolean" }),
});
