import { Router } from "express";
import { multerUpload } from "../../config/multer.config";
import { validateRequest } from "../../middlewares/validateRequest";
import { createSpecialitiesZodValidationSchema } from "./specialities.validation";
import { SpecialitiesControllers } from "./specialities.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "@prisma/client";

export const specialitiesRouter = Router();

specialitiesRouter.get("/", SpecialitiesControllers.getAllFromDB);

specialitiesRouter.post(
  "/",
  multerUpload.single("file"),
  validateRequest(createSpecialitiesZodValidationSchema),
  SpecialitiesControllers.createSpecialities,
);

specialitiesRouter.delete(
  "/:id",
  checkAuth(UserRole.ADMIN),
  SpecialitiesControllers.deleteSpeciality,
);
