import { Request, Response } from "express";
import tryAsync from "../../utils/tryAsync";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const login = tryAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await AuthServices.login(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Logged in successfully!",
    data: result,
  });
});

export const AuthControllers = {
  login,
};
