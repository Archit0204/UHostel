import { Request, Response } from "express";
import Student from "../models/Student";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Gatepass from "../models/Gatepass";
import { changePasswordSchema, complaintSchema, gatepassSchema, studentLoginSchema } from "../utils/validation";
import sendMail from "../utils/mailer";
import z from 'zod';
import Complaint from "../models/Complaint";

dotenv.config();

interface JwtPayload {
    username: string;
    id: string;
    role: string;
}

interface AuthRequest extends Request {
    user?: any;
}

export const studentLogin = async (req: Request, res: Response): Promise<any> => {
    try {
        // fetch data
        const { username, password } = req.body;
        
        // validation
        if (!studentLoginSchema.safeParse({username, password}).success) {
            return res.status(403).json({
                success: false,
                message: "Invalid Input Fields"
            });
        }

        // check if the user exists for that rollNum
        const student = await Student.findOne({ username: username });

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
                username: username,
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
                httpOnly: true,
                secure: true,
                sameSite: "none",
                // domain: ".architmittal.dev"
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

        const student = await Student.findById(studentId);

        // match new password
        if (newPassword === confirmPassword) {
            // hash the password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            if (await bcrypt.compare(currentPassword, student?.password as string)) {
                
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
                    message: "Incorrect Password"
                });
            }

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

        if (!gatepassSchema.safeParse({leaveType, reason, outTime, inTime, outDate, inDate}).success) {
            return res.status(400).json({
                success: true,
                message: "Invalid Input Fields"
            });
        }

        const newGatepass = await Gatepass.create({
            leaveType,
            reason,
            outTime,
            outDate,
            inTime,
            inDate: leaveType === "Day Out" ? null : inDate
        })

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

export const editGatepass = async (req: Request, res: Response): Promise<any> => {

    try {
        
        const { id, leaveType, reason, outTime, inTime, outDate, inDate } = req.body;

        if (!gatepassSchema.safeParse({id, leaveType, reason, outTime, inTime, outDate, inDate}).success) {
            return res.status(400).json({
                success: false,
                message: "Invalid Input Fields"
            });
        }

        const gatepass = await Gatepass.findByIdAndUpdate(id, {
            leaveType, 
            reason, 
            outTime, 
            inTime, 
            outDate, 
            inDate: leaveType === "Day Out" ? null : inDate
        }, { new: true });
        
        return res.status(200).json({
            success: true,
            message: "Gatepass Edited Successfully",
            gatepass
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Error editing gatepass"
        });
    }
}

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

export const forgotPassword = async (req: Request, res: Response): Promise<any> => {

    try {
        const { username } = req.body;
        
        let student: any;
        if (z.string().email().safeParse(username).success) {
            student = await Student.findOne({ email: username });
        }
        else {
            student = await Student.findOne({ username });
        }
        
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student does not exist"
            });
        }

        const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET as string, {
            expiresIn: "10m"
        });

        const url = `${process.env.CLIENT_URL}/reset-password/${token}`;

        await sendMail(student.email as string, "Reset Password", url);

        return res.status(200).json({
            success: true,
            message: "Reset Password Link Sent"
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error while sending mail"
        });
    }
}

export const resetPassword = async (req: Request, res: Response): Promise<any> => {
    try {
        
        const { token } = req.params;
        const { password, confirmPassword} = req.body;

        if (!password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid Input Fields"
            });
        }

        if (password !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "Passwords do not match"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        if (!decoded) {
            return res.status(404).json({
                success: false,
                message: "Invalid Token"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const student = await Student.findByIdAndUpdate((decoded as any).id, {
            password: hashedPassword
        });

        return res.status(200).json({
            success: true,
            message: "Password Reset Successfully"
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const getUser = async (req: AuthRequest, res: Response): Promise<any> => {

    try {
        
        const studentId = req.user.id;
        
        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        student.password = undefined;

        return res.status(200).json({
            success: true,
            message: "Student Fetched",
            studentData: student
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const raiseComplaint = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        
        const { studentName, studentId, hostel, roomNo, category, type, remarks } = req.body;

        if (!complaintSchema.safeParse({studentName, studentId, hostel, roomNo, category, type, remarks}).success) {
            return res.status(400).json({
                success: false,
                message: "Invalid Input Fields"
            });
        }

        const complaint = await Complaint.create({
            studentName,
            studentId,
            hostel,
            roomNo,
            category,
            type,
            remarks
        });

        const userId = req.user.id;

        await Student.findByIdAndUpdate(userId, {
            $push: {
                complaint: complaint._id
            }
        }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Compaint Raised Successfully"
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const getComplaints = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        
        const userId = req.user.id;

        const complaints = await Student.findById(userId).populate("complaint").exec();

        if (complaints) {
            complaints.password = undefined;
        }

        return res.status(200).json({
            success: true,
            message: "Complaints Fetched",
            data: complaints
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const studentCheckout = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        
        const studentId = req.user.id;
        const { hasApplied } = req.body;
        
        if (hasApplied === undefined) {
            return res.status(404).json({
                success: false,
                message: "Inavlid Input Fields"
            });
        }

        await Student.findByIdAndUpdate(studentId, {
            checkoutApplied: !hasApplied
        });

        return res.status(200).json({
            success: true,
            message: "Application Submitted/Withdrawn"
        });
        
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}