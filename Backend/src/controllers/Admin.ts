import { Request, Response } from "express";
import Admin from "../models/Admin";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Student from "../models/Student";
import dotenv from "dotenv";
import { adminLoginSchema, adminSignupSchema, fineSchema, studentSchema } from "../utils/validation";
import Fine from "../models/Fine";
import { z } from "zod";

dotenv.config();

interface AuthRequest extends Request {
    user?: any;
}

export const adminSignup = async (req: Request, res: Response): Promise<any> => {
    try {
        // fetch data
        const { name, email, password } = req.body;

        // validation of data
        if (!adminSignupSchema.safeParse({ name, email, password }).success) {
            return res.status(400).json({
                success: false,
                message: "Invalid Input Fields"
            });
        }

        // check if Admin already exists
        const adminExists = await Admin.findOne({ email: email });

        if (adminExists) {
            return res.status(400).json({
                success: false,
                message: "User Already Exists, Try Logging In"
            });
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create entry in DB
        const adminData = await Admin.create({
            name, email,
            password: hashedPassword
        });

        return res.status(200).json({
            success: true,
            message: "Admin Created Successfully",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error signing up, try again"
        });
    }
};

export const adminLogin = async (req: Request, res: Response): Promise<any> => {
    try {
        // fetch data
        const { email, password } = req.body;

        // data validation
        if (!adminLoginSchema.safeParse({ email, password }).success) {
            return res.status(400).json({
                success: false,
                message: "Invalid Input Fields"
            });
        }

        // find the admin
        const admin = await Admin.findOne({ email: email });

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "User does not exist"
            });
        }

        // match the password
        if (await bcrypt.compare(password, admin.password)) {
            // create token
            const payload = {
                email: admin.email,
                id: admin._id,
                role: "Admin"
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "2h" });

            admin.password = "";
            (admin as any).token = token;

            return res.cookie("token", token, {
                expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
                httpOnly: true,
                secure: false,
                sameSite: "none",
                // domain: ".architmittal.dev",
            }).status(200).json({
                success: true,
                message: "Admin Logged In Successfully",
                admin
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
            message: "Error logging in, try again"
        });
    }
};

export const createStudent = async (req: Request, res: Response): Promise<any> => {
    try {
        // fetch data
        const { firstName, lastName, email, username, fatherName, year, course, campus } = req.body;
        // validate data
        if (!studentSchema.safeParse({ firstName, lastName, email, username, fatherName, year, course, campus }).success) {
            return res.status(400).json({
                success: false,
                message: "Invalid Input Fields"
            });
        }

        // check if student exists
        const existingStudent = await Student.findOne({ username: username });

        if (existingStudent) {
            return res.status(403).json({
                success: false,
                message: "User Already Exists"
            });
        }

        // create password and hash it
        let yearString = year.toString();
        let passSeq = username + "@" + yearString.slice(2);

        const hashedPassword = await bcrypt.hash(passSeq, 10);

        // create entry in DB for student
        const student = await Student.create({
            firstName, lastName, email,
            password: hashedPassword,
            username,
            year, fatherName, course, campus
        });

        // send response
        return res.status(200).json({
            success: true,
            message: "Student created Successfully",
            data: student
        });
    } catch (err: any) {
        return res.status(500).json({
            error: err.message,
            success: false,
            message: "Error while creating student"
        });
    }
};

export const issueFine = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        
        const { amount, reason, studentId } = req.body;
        
        const adminId = req.user.id;

        if (!fineSchema.safeParse({ amount, reason, studentId }).success) {
            return res.status(400).json({
                success: false,
                message: "Invalid Input Fields"
            });
        }

        const student = await Student.findOne({
            username: studentId
        });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student Not Found"
            });
        }

        const fine = await Fine.create({
            amount,
            reason,
            student: student._id,
            issuedBy: adminId
        });

        await Student.findByIdAndUpdate(student._id, {
            $push: {
                fines: fine._id
            }
        });

        return res.status(200).json({
            success: true,
            message: "Fine Issued Successfully"
        });

    } catch (error: any) {
        return res.status(500).json({
            error: error.message,
            success: false,
            message: "Error Issuing Fine"
        });
    }
}