import Router from "express";
import * as majorController from "./major.controller.js"

const majorRoutes = Router();

majorRoutes.get("/", majorController.getAllMajors);
majorRoutes.get("/:id", majorController.getMajorById);

// majorRoutes.use(verify)

export default majorRoutes;