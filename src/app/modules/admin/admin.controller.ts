import { Request, Response } from "express";
import tryAsync from "../../utils/tryAsync";
import { pick } from "../../utils/pick";
import { adminFilterableFields } from "./admin.constant";
import { AdminServices } from "./admin.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const getAllAdmin = tryAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ["page", "sort", "order", "limit"]);
  const filter = pick(req.query, adminFilterableFields);

  const admin = await AdminServices.getAllAdmin(options, filter);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All admin retrieved Successfully!",
    meta: admin.meta,
    data: admin.data,
  });
});

const getAdminByID = tryAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const admin = await AdminServices.getAdminByID(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin retrieved Successfully!",
    data: admin,
  });
});

const updateAdmin = tryAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const payload = req.body;

  const admin = await AdminServices.updateAdmin(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin updated Successfully!",
    data: admin,
  });
});

const deleteAdmin = tryAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const admin = await AdminServices.deleteAdmin(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin deleted Successfully!",
    data: admin,
  });
});

const softDeleteAdmin = tryAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const admin = await AdminServices.softDeleteAdmin(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin soft deleted Successfully!",
    data: admin,
  });
});

export const AdminControllers = {
  getAllAdmin,
  getAdminByID,
  updateAdmin,
  deleteAdmin,
  softDeleteAdmin,
};
