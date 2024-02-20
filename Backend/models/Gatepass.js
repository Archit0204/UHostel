const mongoose = require("mongoose");

const gatepassSchema = new mongoose.Schema({
    leaveType: {
        type: String,
        enum: ["Day Out", "Night Out"]
    },
    status: {
        type: String,
        enum: ["Approved", "Rejected", "Pending"]
    },
    reason: {
        type: String,
        required: true,
        trim: true,
    },
    executioner: { 
        // person who will aprrove/reject
        type: mongoose.Types.ObjectId,
        ref: "Admin"
    },
    comments: {
        type: String,
        trim: true,
    },
    from: {
        type: String,
        trim: true,
        required: true
    },
    to: {
        type: String,
        trim: true,
        required: true
    }
})

module.exports = mongoose.model("Gatepass", gatepassSchema);