import { Request, Response } from "express";
import tryAsync from "../../utils/tryAsync";
import { schedulesService } from "./schedule.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createSchedules = tryAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await schedulesService.createSchedules(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Schedules created successfully",
    data: result,
  });
});

export const schedulesController = {
  createSchedules,
};
