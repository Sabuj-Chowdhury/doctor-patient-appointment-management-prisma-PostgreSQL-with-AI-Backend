import { Request, Response } from "express";
import tryAsync from "../../utils/tryAsync";
import { UserServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createUser = tryAsync(async (req: Request, res: Response) => {
  // const payload = req.body;
  const result = await UserServices.createUser(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successfully!",
    data: result,
  });
});

const cerateAdmin = tryAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createAdmin(req);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Admin created successfully!",
    data: result,
  });
});

const createDoctor = tryAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createDoctor(req);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Doctor Created Successfully!",
    data: result,
  });
});

export const UserController = {
  createUser,
  cerateAdmin,
  createDoctor,
};
