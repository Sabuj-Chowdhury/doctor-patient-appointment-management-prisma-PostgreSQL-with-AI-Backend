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

export const UserServices = {
  createUser,
  createAdmin,
  createDoctor,
};
