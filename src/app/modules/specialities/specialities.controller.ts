import { Request, Response } from "express";
import tryAsync from "../../utils/tryAsync";
import { SpecialitiesServices } from "./specialities.service";
import { sendResponse } from "../../utils/sendResponse";

import httpStatus from "http-status";

const createSpecialities = tryAsync(async (req: Request, res: Response) => {
  const specialities = await SpecialitiesServices.createSpecialities(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Specialties created successfully!",
    data: specialities,
  });
});

export const SpecialitiesControllers = {
  createSpecialities,
};
