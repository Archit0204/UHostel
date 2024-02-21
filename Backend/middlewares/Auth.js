const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async(req, res, next) => {
    try{

        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");

        if (!token || token === undefined) {
            return res.status(404).json({
                success: false,
                message: "Token not found"
            });
        }

        try{
            // verify the token
            const payload = jwt.verify(token, process.env.JWT_SECRET);

            req.user = payload;
        }
        catch(e) {
            return res.status(401).json({
                success: false,
                message: "Invalid Token"
            });
        }

        next();
    }
    catch(err) {

        return res.status(500).json({
            success: false,
            message: "Error in authentication"
        });
    }
}

exports.isAdmin = async(req, res, next) => {

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

exports.isStudent = async(req, res, next) => {

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