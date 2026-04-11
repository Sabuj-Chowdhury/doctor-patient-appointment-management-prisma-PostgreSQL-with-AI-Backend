import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "@prisma/client";
import { AdminControllers } from "./admin.controller";

export const adminRouter = Router();

adminRouter.get("/", checkAuth(UserRole.ADMIN), AdminControllers.getAllAdmin);

adminRouter.get(
  "/:id",
  checkAuth(UserRole.ADMIN),
  AdminControllers.getAdminByID,
);

adminRouter.patch(
  "/:id",
  checkAuth(UserRole.ADMIN),
  AdminControllers.updateAdmin,
);

adminRouter.delete(
  "/:id",
  checkAuth(UserRole.ADMIN),
  AdminControllers.deleteAdmin,
);

adminRouter.delete(
  "/soft/:id",
  checkAuth(UserRole.ADMIN),
  AdminControllers.softDeleteAdmin,
);
