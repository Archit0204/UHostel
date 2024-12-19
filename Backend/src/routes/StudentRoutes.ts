import express from 'express';
import  { studentLogin, changePassword, applyGatepass, showAllGatepass } from "../controllers/Student";
import  { auth, isStudent } from "../middlewares/Auth";

const router = express.Router();

router.post("/login", studentLogin);
router.post("/changePassword", auth, isStudent, changePassword);
router.post("/applyGatepass", auth, isStudent, applyGatepass);
router.get("/getGatepass", auth, isStudent, showAllGatepass);

export default router;