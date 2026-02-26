import { Router } from "express";
import { UserController } from "./user.controller";
import { multerUpload } from "../../config/multer.config";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  createAdminZodValidation,
  createPatientZodValidation,
} from "./user.validation";

export const userRouter = Router();

// create user route
userRouter.post(
  "/create-user",
  multerUpload.single("file"),
  validateRequest(createPatientZodValidation),
  UserController.createUser,
);

// create admin  --TODO : check auth
userRouter.post(
  "/create-admin",
  multerUpload.single("file"),
  validateRequest(createAdminZodValidation),
  UserController.cerateAdmin,
);
