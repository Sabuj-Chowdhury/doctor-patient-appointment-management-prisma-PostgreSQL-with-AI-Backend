import { Router } from "express";
import { UserController } from "./user.controller";
import { multerUpload } from "../../config/multer.config";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  createAdminZodValidation,
  createDoctorZodValidation,
  createPatientZodValidation,
} from "./user.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "@prisma/client";

export const userRouter = Router();

// get all user from database
userRouter.get("/", checkAuth(UserRole.ADMIN), UserController.getAllUsers);

// create user route
userRouter.post(
  "/create-user",
  multerUpload.single("file"),
  validateRequest(createPatientZodValidation),
  UserController.createUser,
);

// create admin
userRouter.post(
  "/create-admin",
  checkAuth(UserRole.ADMIN),
  multerUpload.single("file"),
  validateRequest(createAdminZodValidation),
  UserController.cerateAdmin,
);

// create doctor
userRouter.post(
  "/create-doctor",
  checkAuth(UserRole.ADMIN),
  multerUpload.single("file"),
  validateRequest(createDoctorZodValidation),
  UserController.createDoctor,
);
