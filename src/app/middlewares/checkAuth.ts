import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import httpStatus from "http-status";
import { verifyToken } from "../utils/jwt";
import { envVariable } from "../config/env";

export const checkAuth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const accessToken = req.cookies.accessToken;
      console.log(accessToken);
      if (!accessToken) {
        throw new AppError(httpStatus.BAD_REQUEST, "No Token Received!");
      }

      const verifyTokenResult = verifyToken(
        accessToken,
        envVariable.JWT.JWT_ACCESS_SECRET,
      );

      // set the user if token is verified
      req.user = verifyTokenResult;

      if (roles.length && !roles.includes(verifyTokenResult.role)) {
        throw new AppError(httpStatus.BAD_REQUEST, "NOT Authorized!");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
