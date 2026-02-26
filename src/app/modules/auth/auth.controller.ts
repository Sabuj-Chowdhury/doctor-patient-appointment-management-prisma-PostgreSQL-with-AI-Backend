import { Request, Response } from "express";
import tryAsync from "../../utils/tryAsync";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { setCookies } from "../../utils/setCookies";

const login = tryAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await AuthServices.login(payload);

  const { accessToken, refreshToken, needPasswordChange } = result;

  const tokenInfo = {
    accessToken,
    refreshToken,
  };

  // setting the cookie
  setCookies(res, tokenInfo);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Logged in successfully!",
    data: { needPasswordChange: needPasswordChange },
  });
});

export const AuthControllers = {
  login,
};
