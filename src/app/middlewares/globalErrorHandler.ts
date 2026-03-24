import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const globalErrorhandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = httpStatus.INTERNAL_SERVER_ERROR;
  const success = false;
  let message = err.message || "Something went wrong!";
  let error = err;

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      message = "Duplicate key error!";
      error = err.meta;
    }
    if (err.code === "P1000") {
      message = "Authentication failed against database server!";
      error = err.meta;
    }
    if (err.code === "P1017") {
      message = "Server has closed the connection!";
      error = err.meta;
    }
    if (err.code === "P2006") {
      message = "The provided value for field is not valid!";
      error = err.meta;
    }
  }

  res.status(statusCode).send({
    success,
    message,
    error,
  });
};

export default globalErrorhandler;
