import { Router } from "express";
import { PatientControllers } from "./patient.controller";

export const patientRouter = Router();

patientRouter.get("/", PatientControllers.getAllPatient);

patientRouter.get("/:id", PatientControllers.getPatientByID);

patientRouter.delete("/soft/:id", PatientControllers.softDelete);
