import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "@prisma/client";
import { schedulesController } from "./schedule.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { scheduleValidationZodSchema } from "./schedule.validation";

export const scheduleRouter = Router();

scheduleRouter.get(
  "/",
  checkAuth(UserRole.DOCTOR, UserRole.ADMIN),
  schedulesController.scheduleForDoctor,
);

scheduleRouter.post(
  "/",
  validateRequest(scheduleValidationZodSchema),
  checkAuth(UserRole.ADMIN),
  schedulesController.createSchedules,
);

scheduleRouter.delete(
  "/:scheduleID",
  checkAuth(UserRole.ADMIN),
  schedulesController.deleteSchedule,
);
