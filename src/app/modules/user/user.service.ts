import { Request } from "express";
import { envVariable } from "../../config/env";
import { prisma } from "../../config/prismaInstance";
import { IUserPayload } from "./user.interface";
import bcrypt from "bcryptjs";
import { Admin, Doctor, UserRole } from "@prisma/client";

const createUser = async (req: Request) => {
  if (req.file) {
    req.body.patient.profilePhoto = req.file?.path;
  }

  const payload: IUserPayload = req.body;
  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(envVariable.SALT_ROUND),
  );

  const result = await prisma.$transaction(async (trans) => {
    await trans.user.create({
      data: {
        email: payload.patient.email,
        password: hashedPassword,
      },
    });
    return await trans.patient.create({
      data: req.body.patient,
    });
  });

  return result;
};

const createAdmin = async (req: Request): Promise<Admin> => {
  if (req.file) {
    req.body.admin.profilePhoto = req.file?.path;
  }

  const hashedPassword = await bcrypt.hash(
    req.body.password,
    Number(envVariable.SALT_ROUND),
  );

  const userData = {
    email: req.body.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (trans) => {
    await trans.user.create({
      data: userData,
    });

    const adminCreate = await trans.admin.create({
      data: req.body.admin,
    });
    return adminCreate;
  });

  return result;
};

const createDoctor = async (req: Request): Promise<Doctor> => {
  if (req.file) {
    req.body.doctor.profilePhoto = req.file?.path;
  }
  const hashedPassword = await bcrypt.hash(
    req.body.password,
    Number(envVariable.SALT_ROUND),
  );

  const doctorData = {
    email: req.body.doctor.email,
    password: hashedPassword,
    role: UserRole.DOCTOR,
  };

  const result = await prisma.$transaction(async (trans) => {
    await trans.user.create({
      data: doctorData,
    });
    const doctorCreate = await trans.doctor.create({
      data: req.body.doctor,
    });
    return doctorCreate;
  });

  return result;
};

// get all user service
const getAllUsers = async ({
  page,
  limit,
  search,
  sort,
  order,
}: {
  page: number;
  limit: number;
  search?: any;
  sort: any;
  order: any;
}) => {
  // console.log(search);
  const current_page = page || 1;
  const current_limit = limit || 10;
  const skip = (current_page - 1) * current_limit;
  const users = await prisma.user.findMany({
    skip,
    take: current_limit,
    where: {
      email: {
        contains: search,
        mode: "insensitive",
      },
    },
    orderBy:
      sort && order
        ? {
            [sort]: order,
          }
        : {
            createdAt: "desc",
          },
  });

  return users;
};

export const UserServices = {
  createUser,
  createAdmin,
  createDoctor,
  getAllUsers,
};
