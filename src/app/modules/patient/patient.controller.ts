import { Request, Response } from "express";
import tryAsync from "../../utils/tryAsync";
import { pick } from "../../utils/pick";
import { patientFilterableFields } from "./patient.constants";
import { PatientServices } from "./patient.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const getAllPatient = tryAsync(async (req: Request, res: Response) => {
  // page, limit  sort, order ---> pagination and sort
  // search, fields .....   -----> search and required fields to sort on
  const options = pick(req.query, ["page", "sort", "order", "limit"]);
  const filter = pick(req.query, patientFilterableFields);

  const patient = await PatientServices.getAllPatient(options, filter);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All patient retrieved Successfully!",
    meta: patient.meta,
    data: patient.data,
  });
});

export const PatientControllers = {
  getAllPatient,
};
