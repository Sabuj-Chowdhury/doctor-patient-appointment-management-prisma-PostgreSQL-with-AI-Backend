import { Router } from "express";
import { UserController } from "./user.controller";
import { multerUpload } from "../../config/multer.config";
import { validateRequest } from "../../middlewares/validateRequest";
import { createPatientZodValidation } from "./user.validation";

export const userRouter = Router();

userRouter.post(
  "/create-user",
  multerUpload.single("file"),
  validateRequest(createPatientZodValidation),
  UserController.createUser,
);
