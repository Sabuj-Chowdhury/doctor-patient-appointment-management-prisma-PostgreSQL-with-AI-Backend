import { Router } from "express";
import { DoctorSchedulesController } from "./doctorSchedule.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "@prisma/client";

export const doctorSchedulesRouter = Router();

// TODO : get , update , delete

doctorSchedulesRouter.get(
  "/",
  checkAuth(UserRole.DOCTOR),
  DoctorSchedulesController.getDoctorSchedules,
);

doctorSchedulesRouter.post(
  "/",
  checkAuth(UserRole.DOCTOR),
  DoctorSchedulesController.createDoctorSchedules,
);
