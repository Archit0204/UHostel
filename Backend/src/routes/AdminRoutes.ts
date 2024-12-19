import express from "express";
import { auth, isAdmin } from "../middlewares/Auth";
import { adminLogin, adminSignup, createStudent } from "../controllers/Admin";

const router = express.Router();

router.post("/signup", adminSignup);
router.post("/login", adminLogin);
router.post("/createStudent", auth, isAdmin, createStudent);

export default router;