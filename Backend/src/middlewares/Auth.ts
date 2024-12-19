import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

interface AuthRequest extends Request {
    user?: any;
}

export const auth = async (req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        const token = req.cookies.token || req.body.token || req.header("Authorization")?.replace("Bearer ", "");

        if (!token || token === undefined) {
            return res.status(404).json({
                success: false,
                message: "Token not found"
            });
        }

        try {
            // verify the token
            const payload = jwt.verify(token, process.env.JWT_SECRET as string);

            req.user = payload;
            next();
        } catch (e: any) {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }
    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const isAdmin = async(req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {

    try{
        if  (req.user.role !== 'Admin') {
            return res.status(403).json({
                success: false,
                message: "Only Admin Allowed"
            });
        }
        next();
    }
    catch(err) {
        return res.status(500).json({
            success: false,
            message: "Error in authorization"
        });
    }
}

export const isStudent = async(req: AuthRequest, res: Response, next: NextFunction): Promise<any> => {

    try{
        if (req.user.role !== "Student") {
            return res.status(403).json({
                success: false,
                message: "Only students Allowed"
            });
        }
        next();
    }
    catch(err) {
        return res.status(500).json({
            success: false,
            message: "Error in authorization"
        });
    }
}