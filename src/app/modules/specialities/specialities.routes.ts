import { Router } from "express";
import { multerUpload } from "../../config/multer.config";
import { validateRequest } from "../../middlewares/validateRequest";
import { createSpecialitiesZodValidationSchema } from "./specialities.validation";
import { SpecialitiesControllers } from "./specialities.controller";

export const specialitiesRouter = Router();

specialitiesRouter.post(
  "/",
  multerUpload.single("file"),
  validateRequest(createSpecialitiesZodValidationSchema),
  SpecialitiesControllers.createSpecialities,
);
