import { envVariable } from "../../config/env";
import { prisma } from "../../config/prismaInstance";
import { IUserPayload } from "./user.interface";
import bcrypt from "bcryptjs";

const createUser = async (payload: IUserPayload) => {
  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(envVariable.SALT_ROUND),
  );

  const result = await prisma.$transaction(async (trans) => {
    await trans.user.create({
      data: {
        email: payload.email,
        password: hashedPassword,
      },
    });
    return await trans.patient.create({
      data: {
        name: payload.name,
        email: payload.email,
        contactNumber: payload.contactNumber,
      },
    });
  });

  return result;
};

export const UserServices = {
  createUser,
};
