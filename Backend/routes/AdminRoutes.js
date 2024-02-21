const express = require("express");
const { adminSignup, adminLogin, createStudent } = require("../controllers/Admin");
const { auth, isAdmin } = require("../middlewares/Auth");

const router = express.Router();

router.post("/signup", adminSignup);
router.post("/login", adminLogin);
router.post("/createStudent", auth, isAdmin, createStudent);

module.exports = router;