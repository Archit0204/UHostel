import express from 'express';
import  { studentLogin, changePassword, applyGatepass, showAllGatepass, forgotPassword, resetPassword, getUser, editGatepass } from "../controllers/Student";
import  { auth, isStudent } from "../middlewares/Auth";

const router = express.Router();

router.post("/login", studentLogin);
router.post("/changePassword", auth, isStudent, changePassword);
router.post("/applyGatepass", auth, isStudent, applyGatepass);
router.get("/getGatepass", auth, isStudent, showAllGatepass);
router.post("/forgot", forgotPassword);
router.post("/reset/:token", resetPassword);
router.get("/user", auth, getUser);
router.put("/edit", auth, isStudent, editGatepass);

export default router;