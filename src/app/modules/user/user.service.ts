import { Request } from "express";
import { envVariable } from "../../config/env";
import { prisma } from "../../config/prismaInstance";
import { IUserPayload } from "./user.interface";
import bcrypt from "bcryptjs";

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

export const UserServices = {
  createUser,
};
