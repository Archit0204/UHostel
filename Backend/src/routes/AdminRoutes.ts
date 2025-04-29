import express from "express";
import { auth, isAdmin } from "../middlewares/Auth";
import { adminLogin, adminSignup, createStudent, issueFine } from "../controllers/Admin";

const router = express.Router();

router.post("/signup", adminSignup);
router.post("/login", adminLogin);
router.post("/createStudent", auth, isAdmin, createStudent);
router.post("/fine", auth, isAdmin, issueFine);

export default router;