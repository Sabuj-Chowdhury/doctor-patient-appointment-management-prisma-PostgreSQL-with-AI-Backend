import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "@prisma/client";
import { schedulesController } from "./schedule.controller";

export const scheduleRouter = Router();

scheduleRouter.post(
  "/",
  checkAuth(UserRole.ADMIN),
  schedulesController.createSchedules,
);
