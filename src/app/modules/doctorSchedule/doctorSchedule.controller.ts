import { Request, Response } from "express";
import tryAsync from "../../utils/tryAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { DoctorSchedulesService } from "./doctorSchedules.service";

const createDoctorSchedules = tryAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const payload = req.body;
    const user = req.user;

    const result = await DoctorSchedulesService.createDoctorSchedules(
      payload,
      user,
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
