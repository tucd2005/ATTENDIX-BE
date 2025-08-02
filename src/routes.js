import Router from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import sessionRoutes from "./modules/session/session.routes.js";
import attendanceRoutes from "./modules/attendance/attendance.routes.js";
import classRoutes from "./modules/class/class.routes.js";
import subjectRoutes from "./modules/subject/subject.routes.js";
import majorRoutes from "./modules/major/major.routes.js";
import userRoutes from "./modules/user/user.routes.js";

const routes = Router();


routes.use("/auth", authRoutes),
routes.use("/session", sessionRoutes),
routes.use("/user", userRoutes),
routes.use("/major", majorRoutes),
routes.use("/subject", subjectRoutes),
routes.use("/class", classRoutes),
routes.use("/attendance", attendanceRoutes)

export default routes;