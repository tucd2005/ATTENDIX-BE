import Router from "express";
import validBodyRequest from "../../common/middlewares/valid-body.middleware.js";
import { loginSchema, registerSchema, resetPasswordSchema } from "./auth.schema.js";
import { forgotPassword, loginUser, refreshToken, registerUser, resetPassword } from "./auth.controller.js";

const authRoutes = Router();

authRoutes.post("/register", validBodyRequest(registerSchema), registerUser);

authRoutes.post("/login", validBodyRequest(loginSchema), loginUser);
authRoutes.post("/refresh-token", refreshToken);
authRoutes.post("/forgot-password", forgotPassword);
authRoutes.post("/reset-password", validBodyRequest(resetPasswordSchema), resetPassword);

export default authRoutes;