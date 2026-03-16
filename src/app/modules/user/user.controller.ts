import { Request, Response } from "express";
import tryAsync from "../../utils/tryAsync";
import { UserServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { pick } from "../../utils/pick";

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

const getAllUsers = tryAsync(async (req: Request, res: Response) => {
  // page, limit  sort, order ---> pagination and sort
  // search, fields .....   -----> search and required fields to sort on
  const options = pick(req.query, ["page", "sort", "order", "limit"]);
  const filter = pick(req.query, ["role", "status", "email", "search"]);

  const result = await UserServices.getAllUsers(options, filter);

  //  old way
  // const { page, limit, search, sort, order, status, role } = req.query;
  // console.log(page, limit);

  // old way
  // const result = await UserServices.getAllUsers({
  //   page: Number(page),
  //   limit: Number(limit),
  //   search,
  //   sort,
  //   order,
  //   status,
  //   role,
  // });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All users retrieved Successfully!",
    meta: result.meta,
    data: result.data,
  });
});

export const UserController = {
  createUser,
  cerateAdmin,
  createDoctor,
  getAllUsers,
};
