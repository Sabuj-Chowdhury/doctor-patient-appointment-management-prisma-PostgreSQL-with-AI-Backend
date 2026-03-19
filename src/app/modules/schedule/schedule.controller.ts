import { Request, Response } from "express";
import tryAsync from "../../utils/tryAsync";
import { schedulesService } from "./schedule.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { pick } from "../../utils/pick";

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

const scheduleForDoctor = tryAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ["page", "sort", "order", "limit"]);
  const filter = pick(req.query, ["startDateTime", "endDateTime"]);

  const result = await schedulesService.scheduleForDoctor(filter, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All schedules retrieved Successfully!",
    meta: result.meta,
    data: result.data,
  });
});

const deleteSchedule = tryAsync(async (req: Request, res: Response) => {
  const scheduleID = req.params.scheduleID as string;

  const result = await schedulesService.deleteSchedule(scheduleID);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedule deleted successfully!",
    data: result,
  });
});

export const schedulesController = {
  createSchedules,
  scheduleForDoctor,
  deleteSchedule,
};
