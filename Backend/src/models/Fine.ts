import mongoose from "mongoose";

const FineSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    reason: {
        type: String,
        required: true,
        trim: true
    },
    paid: {
        type: Boolean,
        default: false
    },
    student: {
        type: mongoose.Types.ObjectId,
        ref: "Student",
        required: true
    },
    issuedBy: {
        type: mongoose.Types.ObjectId,
        ref: "Admin",
        required: true
    }
}, { timestamps: true});

export default mongoose.model("Fine", FineSchema);