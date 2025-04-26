import mongoose from "mongoose";
import { string } from "zod";

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        trim: true,
        unique: true
    },
    fatherName: {
        type: String,
        trim: true,
    },
    year: {
        type: Number,
        trim: true
    },
    campus: {
        type: String,
        enum: ["CUP", "CUHP"]
    },
    course: {
        type: String,
        trim: true
    },
    avatar: {
        type: String,
    },
    gatepass: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Gatepass"
        }
    ],
    roomNo: {
        type: String,
        trim: true,
    },
    hostel: {
        type: String,
        trim: true,
    },
    complaint: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Complaint"
        }
    ]
})

export default mongoose.model("Student", studentSchema);