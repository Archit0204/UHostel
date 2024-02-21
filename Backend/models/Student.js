const mongoose = require("mongoose");

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
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    rollNumber: {
        type: Number,
        trim: true
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
    gatepass: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Gatepass"
        }
    ]
})

module.exports = mongoose.model("Student", studentSchema);