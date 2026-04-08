import { Request, Response } from "express";
import tryAsync from "../../utils/tryAsync";
import { pick } from "../../utils/pick";
import { DoctorServices } from "./doctor.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { doctorFilters } from "./doctor.constant";

const getAllDoctorFromDB = tryAsync(async (req: Request, res: Response) => {
  // page, limit  sort, order ---> pagination and sort
  // search, fields .....   -----> search and required fields to sort on
  const options = pick(req.query, ["page", "sort", "order", "limit"]);
  const filter = pick(req.query, doctorFilters);

  const doctors = await DoctorServices.getAllDoctorFromDB(options, filter);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Doctors retrieved Successfully!",
    meta: doctors.meta,
    data: doctors.data,
  });
});

const updateDoctorFromDB = tryAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const payload = req.body;
  const doctor = await DoctorServices.updateDoctorFromDB(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctors update Successfully!",
    data: doctor,
  });
});

const getDoctorByID = tryAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const doctor = await DoctorServices.getDoctorByID(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctors retrieval Successfully!",
    data: doctor,
  });
});

export const DoctorControllers = {
  getAllDoctorFromDB,
  updateDoctorFromDB,
  getDoctorByID,
};
