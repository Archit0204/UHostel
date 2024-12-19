import { Request, Response } from "express";
import Student from "../models/Student";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Gatepass from "../models/Gatepass";
import { changePasswordSchema, studentLoginSchema } from "../utils/validation";

dotenv.config();

interface JwtPayload {
    rollNumber: string;
    id: string;
    role: string;
}

interface AuthRequest extends Request {
    user?: any;
}

export const studentLogin = async (req: Request, res: Response): Promise<any> => {
    try {
        // fetch data
        const { rollNumber, password } = req.body;

        // validation
        if (!studentLoginSchema.safeParse({rollNumber, password}).success) {
            return res.status(403).json({
                success: false,
                message: "Invalid Input Fields"
            });
        }

        // check if the user exists for that rollNum
        const student = await Student.findOne({ rollNumber: rollNumber });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student does not exist, Contact Admin"
            });
        }

        // match the password
        if (await bcrypt.compare(password, student.password as string)) {
            // create token
            const payload: JwtPayload = {
                rollNumber: rollNumber,
                id: (student._id as object).toString(),
                role: "Student"
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
                expiresIn: "2h"
            });

            student.password = undefined;
            (student as any).token = token;

            return res.cookie("token", token, {
                expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
                httpOnly: true
            }).status(200).json({
                success: true,
                message: "Student Logged In",
                data: student
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Incorrect Password"
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error Logging In, Try Again"
        });
    }
};

export const changePassword = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        // fetch data
        const { currentPassword, newPassword, confirmPassword } = req.body;

        // validation 
        if (!changePasswordSchema.safeParse({currentPassword, newPassword, confirmPassword}).success) {
            return res.status(400).json({
                success: false,
                message: "Invalid Input Fields"
            });
        }

        // get id of the student
        const studentId = req.user.id;

        // match new password
        if (newPassword === confirmPassword) {
            // hash the password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // update the password in DB
            await Student.findByIdAndUpdate(studentId, {
                password: hashedPassword
            });

            // send response
            return res.status(200).json({
                success: true,
                message: "Password Updated"
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }
    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: "Error changing Password",
            error: err.message
        });
    }
};

export const applyGatepass = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        // fetch data
        const { leaveType, reason, outTime, inTime, outDate, inDate } = req.body;

        // create gatepass
        let newGatepass;
        if (inDate) {
            newGatepass = await Gatepass.create({
                leaveType, reason, outDate, outTime, inDate, inTime
            });
        } else {
            newGatepass = await Gatepass.create({
                leaveType, reason, inTime, outDate, outTime
            });
        }

        // store gatepass in student
        const studentId = req.user.id;

        const student = await Student.findByIdAndUpdate(studentId, {
            $push: {
                gatepass: newGatepass._id
            }
        }, { new: true });

        if (student) {
            student.password = undefined;
        }

        // return response
        return res.status(200).json({
            success: true,
            message: "Gatepass Created Successfully",
            student
        });
    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: "Error applying gatepass",
            error: err.message
        });
    }
};

export const showAllGatepass = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const studentId = req.user.id;

        const gatepassData = await Student.findById(studentId).populate("gatepass").exec();

        if (gatepassData) {
            gatepassData.password = undefined;
        }

        return res.status(200).json({
            success: true,
            message: "Gatepasses Fetched",
            gatepassData
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error fetching gatepasses"
        });
    }
};