import { Router } from "express";
import { PatientControllers } from "./patient.controller";

export const patientRouter = Router();

patientRouter.get("/", PatientControllers.getAllPatient);
