import { Request, Response } from "express";
import tryAsync from "../../utils/tryAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { DoctorSchedulesService } from "./doctorSchedules.service";
import { IJWTUserPayload } from "../../types/types";

const createDoctorSchedules = tryAsync(
  async (req: Request & { user?: IJWTUserPayload }, res: Response) => {
    const payload = req.body;
    const user = req.user;

    const result = await DoctorSchedulesService.createDoctorSchedules(
      payload,
      user as IJWTUserPayload,
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Doctor Schedules Created Successfully!",
      data: result,
    });
  },
);

export const DoctorSchedulesController = {
  createDoctorSchedules,
};
