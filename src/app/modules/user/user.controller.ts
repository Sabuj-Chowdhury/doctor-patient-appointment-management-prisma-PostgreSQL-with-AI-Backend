import { Request, Response } from "express";
import tryAsync from "../../utils/tryAsync";
import { UserServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createUser = tryAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await UserServices.createUser(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successfully!",
    data: result,
  });
});

export const UserController = {
  createUser,
};
