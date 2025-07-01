import express from "express";
import { login, logout, register } from "../controller/authController.js";

const router = express.Router();

router.post("/auth/signup", register);

router.post("/auth/login", login);

router.get("/auth/logout", logout);

export default router;
