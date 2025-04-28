import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true
    },
    hostel: {
        type: String,
        required: true
    },
    roomNo: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    remarks: {
        type: String,
        required: true
    },
    wardenRemarks: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ["Pending", "Closed"],
        default: "Pending"
    }
});

export default mongoose.model("Complaint", complaintSchema);