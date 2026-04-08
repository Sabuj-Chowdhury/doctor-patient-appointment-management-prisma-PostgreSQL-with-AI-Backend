import { Router } from "express";
import { DoctorControllers } from "./doctor.controller";

export const doctorRouter = Router();

doctorRouter.get("/", DoctorControllers.getAllDoctorFromDB);

doctorRouter.patch("/:id", DoctorControllers.updateDoctorFromDB);
