import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// Route for User Registration (POST /api/auth/register)
router.post("/register", registerUser);

// Route for User Login (POST /api/auth/login)
router.post("/login", loginUser);

export default router;
