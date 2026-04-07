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
    // meta: result.meta,
    // data: result.data,
    data: doctors,
  });
});

export const DoctorControllers = {
  getAllDoctorFromDB,
};
