const Student = require("../models/Student");
const { validate } = require("../utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Gatepass = require("../models/Gatepass");

exports.studentLogin = async(req, res) => {

    try{
        // fetch data
        const {rollNumber, password} = req.body;

        // validation
        if (!validate(rollNumber, "roll") || !validate(password, "pass")) {
            return res.status(403).json({
                success: false,
                message: "Invalid Input Fields"
            });
        }

        // check if the user exists for that rollNum
        const student = await Student.findOne({rollNumber: rollNumber});

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student does not exist, Contact Admin"
            });
        }

        // match the password
        if (bcrypt.compare(password, student.password)) {

            // create token
            const payload = {
                rollNumber: rollNumber,
                id: student._id,
                role: "Student"
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h"
            });

            student.password = undefined;
            student.token = token;

            res.cookie("token", token, {
                expiresIn: "2h", 
                httpOnly: true
            }).status(200).json({
                success: true,
                message: "Student Logged In",
                data: student
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Incorrect Password"
            });
        }
    }
    catch(err) {

        return res.status(500).json({
            success: false,
            message: "Error Logging In, Try Again"
        });
    }
}

exports.changePassword = async(req, res) => {

    try{

        // fetch data
        const {currentPassword, newPassword, confirmPassword} = req.body;

        // validation 
        if (!validate(currentPassword, "pass") || !validate(newPassword, "pass") || !validate(confirmPassword, "pass")) {
            return res.status(400).json({
                success: false,
                message: "Inavlid Input Fields"
            });
        }

        // get id of the student
        const studentId = req.user.id;

        // match new password
        if (newPassword === confirmPassword) {

            // hash the password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // update the password in DB
            const updatedPass = await Student.findByIdAndUpdate(studentId, {
                password: hashedPassword
            });

            // A MAIL CAN ALSO BE SENT AFTER UPDATING PASSWORD

            // send response
            return res.status(200).json({
                success: true,
                message: "Password Updated"
            })
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Password do not match"
            });
        }
        
    }
    catch(err) {
        return res.status(500).json({
            success: false,
            message: "Error changing Password",
            error: err.message
        });
    }

}

exports.applyGatepass = async(req, res) => {
    try{
        // fetch data
        const {leaveType, reason, outTime, inTime, outDate} = req.body;
        let inDate;

        if (leaveType === "Night Out") {
            inDate = req.body.inDate;
        }
        
        // create gatepass
        let newGatepass;
        
        if (inDate) {
            newGatepass = await Gatepass.create({
                leaveType, reason, outDate, outTime, inDate, inTime
            });
        }
        else {
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
        }, {new: true});

        student.password = undefined;

        // return response
        return res.status(200).json({
            success: true,
            message: "Gatepass Created Successfully",
            student
        });
    }
    catch(err) {
        return res.status(500).json({
            success: false,
            message: "Error applying gatepass",
            error: err.message
        });
    }
}

exports.showAllGatepass = async(req, res) => {
    try{

        const studentId = req.user.id;

        const gatepassData = await Student.findById(studentId).populate("gatepass").exec();

        gatepassData.password = undefined;

        return res.status(200).json({
            success: true,
            message: "Gatepasses Fetched",
            gatepassData
        });

    }
    catch(err) {
        return res.status(500).json({
            success: false,
            message: "Error fetching gatepasses"
        });
    }
}