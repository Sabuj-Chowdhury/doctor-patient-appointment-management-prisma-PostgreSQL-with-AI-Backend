import { Request } from "express";
import { prisma } from "../../config/prismaInstance";

const createSpecialities = async (req: Request) => {
  if (req.file) {
    req.body.icon = req.file?.path;
  }

  const result = await prisma.specialities.create({
    data: req.body,
  });
  return result;
};

export const SpecialitiesServices = {
  createSpecialities,
};
