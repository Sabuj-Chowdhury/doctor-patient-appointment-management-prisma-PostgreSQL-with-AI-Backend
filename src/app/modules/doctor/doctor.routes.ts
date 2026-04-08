import { Router } from "express";
import { DoctorControllers } from "./doctor.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "@prisma/client";

export const doctorRouter = Router();

doctorRouter.get("/", DoctorControllers.getAllDoctorFromDB);

doctorRouter.get("/:id", DoctorControllers.getDoctorByID);

doctorRouter.patch(
  "/:id",
  checkAuth(UserRole.DOCTOR, UserRole.ADMIN),
  DoctorControllers.updateDoctorFromDB,
);

doctorRouter.delete(
  "/:id",
  checkAuth(UserRole.ADMIN),
  DoctorControllers.deleteDoctorByID,
);
