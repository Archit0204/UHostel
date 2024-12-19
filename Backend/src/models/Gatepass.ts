import mongoose from "mongoose";

const gatepassSchema = new mongoose.Schema({
    leaveType: {
        type: String,
        enum: ["Day Out", "Night Out"]
    },
    status: {
        type: String,
        enum: ["Approved", "Rejected", "Pending"],
        default: "Pending"
    },
    reason: {
        type: String,
        required: true,
        trim: true,
    },
    executioner: { 
        // person who will aprrove/reject
        type: mongoose.Types.ObjectId,
        ref: "Admin",
        default: null
    },
    comments: {
        type: String,
        trim: true,
        default: null
    },
    outTime: {
        type: String,
        trim: true,
        required: true
    },
    outDate: {
        type: Date,
        required: true
    },
    inTime: {
        type: String,
        trim: true,
        required: true
    }, 
    inDate: {
        type: Date,
    }
})

export default mongoose.model("Gatepass", gatepassSchema);