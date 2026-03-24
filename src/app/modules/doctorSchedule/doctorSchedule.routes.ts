import { Router } from "express";
import { DoctorSchedulesController } from "./doctorSchedule.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "@prisma/client";
import { validateRequest } from "../../middlewares/validateRequest";
import { doctorSchedulesZodValidationSchema } from "./doctorSchedule.validation";

export const doctorSchedulesRouter = Router();

// TODO : get , update , delete

doctorSchedulesRouter.get(
  "/",
  checkAuth(UserRole.DOCTOR),
  DoctorSchedulesController.getDoctorSchedules,
);

doctorSchedulesRouter.post(
  "/",
  validateRequest(doctorSchedulesZodValidationSchema),
  checkAuth(UserRole.DOCTOR),
  DoctorSchedulesController.createDoctorSchedules,
);
