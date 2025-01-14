import { Router } from "express";
import { login, register } from "../controllers/authControllers.js";
import validBodyRequest from "../middlewares/validBodyRequest.js";
import { loginSchema, registerSchema } from "../schema/authSchema.js";

const authRoutes = Router();

authRoutes.post("/register", validBodyRequest(registerSchema), register);

authRoutes.post("/login", validBodyRequest(loginSchema), login);

export default authRoutes;
