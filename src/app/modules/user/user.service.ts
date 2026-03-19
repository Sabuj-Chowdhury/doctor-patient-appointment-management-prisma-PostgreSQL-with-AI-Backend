import { Request } from "express";
import { envVariable } from "../../config/env";
import { prisma } from "../../config/prismaInstance";
import { IUserPayload } from "./user.interface";
import bcrypt from "bcryptjs";
import { Admin, Doctor, Prisma, UserRole } from "@prisma/client";
import { IOptions, paginationHelper } from "../../utils/pagination_helper";
import { searchableFields } from "./user.constants";

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
const getAllUsers = async (options: IOptions, filter: any) => {
  // console.log(search);
  // ****** Old way
  // const current_page = page || 1;
  // const current_limit = limit || 10;
  // const skip = (current_page - 1) * current_limit;

  const { page, limit, skip, sort, order } = paginationHelper(options);
  const { search, ...filterData } = filter;

  const prismaAndConditions: Prisma.UserWhereInput[] = [];

  if (search) {
    prismaAndConditions.push({
      OR: searchableFields.map((field) => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    prismaAndConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  // console.log(prismaAndConditions);
  const whereConditions: Prisma.UserWhereInput =
    prismaAndConditions.length > 0
      ? {
          AND: prismaAndConditions,
        }
      : {};

  const users = await prisma.user.findMany({
    skip,
    take: limit,
    // where: {
    //   AND: prismaAndConditions,
    // },
    where: whereConditions,
    orderBy: {
      [sort]: order,
    },
  });

  // OLD WAY
  // const users = await prisma.user.findMany({
  //   skip,
  //   take: current_limit,
  //   where: {
  //     email: {
  //       contains: search,
  //       mode: "insensitive",
  //     },
  //     status: status,
  //     role: role,
  //   },
  //   orderBy:
  //     sort && order
  //       ? {
  //           [sort]: order,
  //         }
  //       : {
  //           createdAt: "desc",
  //         },
  // });

  const total = await prisma.user.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: users,
  };
};

export const UserServices = {
  createUser,
  createAdmin,
  createDoctor,
  getAllUsers,
};
