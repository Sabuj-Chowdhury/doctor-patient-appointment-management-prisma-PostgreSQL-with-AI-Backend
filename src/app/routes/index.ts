import { Router } from "express";
import { userRouter } from "../modules/user/user.routes";
import { authRouter } from "../modules/auth/auth.routes";
import { scheduleRouter } from "../modules/schedule/schedule.route";
import { doctorSchedulesRouter } from "../modules/doctorSchedule/doctorSchedule.routes";
import { specialitiesRouter } from "../modules/specialities/specialities.routes";
import { doctorRouter } from "../modules/doctor/doctor.routes";
import { patientRouter } from "../modules/patient/patient.routes";
import { adminRouter } from "../modules/admin/admin.routes";

export const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/schedule",
    route: scheduleRouter,
  },
  {
    path: "/doctor-schedule",
    route: doctorSchedulesRouter,
  },
  {
    path: "/specialities",
    route: specialitiesRouter,
  },
  {
    path: "/doctor",
    route: doctorRouter,
  },
  {
    path: "/patient",
    route: patientRouter,
  },
  {
    path: "/admin",
    route: adminRouter,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
