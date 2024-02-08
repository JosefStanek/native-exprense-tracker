import express from "express";
import { registerUser, loginUser } from "../Controllers/AuthController.js";
const router = express.Router();

// register user
router.post("/api/register", registerUser);
// login user
router.post("/api/login", loginUser);

export default router;
