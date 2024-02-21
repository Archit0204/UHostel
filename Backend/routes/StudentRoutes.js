const express = require("express");
const { studentLogin, changePassword, applyGatepass, showAllGatepass } = require("../controllers/Student");
const { auth, isStudent } = require("../middlewares/Auth");

const router = express.Router();

router.post("/login", studentLogin);
router.post("/changePassword", auth, isStudent, changePassword);
router.post("/applyGatepass", auth, isStudent, applyGatepass);
router.get("/getGatepass", auth, isStudent, showAllGatepass);

module.exports = router;