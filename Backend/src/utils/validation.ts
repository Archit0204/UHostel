import zod from "zod";

export const adminLoginSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8)
});

export const studentLoginSchema = zod.object({
    username: zod.string(),
    password: zod.string().min(8)
});

export const changePasswordSchema = zod.object({
    currentPassword: zod.string().min(8),
    newPassword: zod.string().min(8),
    confirmPassword: zod.string().min(8)
});

export const gatepassSchema = zod.object({
    id: zod.string().optional(),
    leaveType: zod.enum(["Day Out", "Night Out"]),
    reason: zod.string().optional(),
    outTime: zod.string(),
    outDate: zod.string(),
    inTime: zod.string(),
    inDate: zod.string().optional()
});

export const adminSignupSchema = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(8)
})

export const studentSchema = zod.object({
    firstName: zod.string(),
    lastName: zod.string().optional(),
    email: zod.string().email(),
    username: zod.string(),
    fatherName: zod.string(),
    year: zod.number().int().min(2020).max(2024),
    campus: zod.enum(["CUP", "CUHP"]),
    course: zod.string()
});

export const complaintSchema = zod.object({
    studentName: zod.string(),
    studentId: zod.string(),
    hostel: zod.string(),
    roomNo: zod.string(),
    category: zod.string(),
    type: zod.string(),
    remarks: zod.string(),
    wardenRemarks: zod.string().nullable().optional(),
    status: zod.enum(["Pending", "Closed"]).default("Pending")
});

export const fineSchema = zod.object({
    amount: zod.number().positive(),
    reason: zod.string(),
    studentId: zod.string(),
})