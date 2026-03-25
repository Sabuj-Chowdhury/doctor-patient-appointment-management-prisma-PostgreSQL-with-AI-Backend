import { Request } from "express";
import { prisma } from "../../config/prismaInstance";
import { Specialities } from "@prisma/client";

const createSpecialities = async (req: Request) => {
  if (req.file) {
    req.body.icon = req.file?.path;
  }

  const result = await prisma.specialities.create({
    data: req.body,
  });
  return result;
};

const getAllFromDB = async (): Promise<Specialities[]> => {
  const result = await prisma.specialities.findMany();

  return result;
};

const deleteSpeciality = async (id: string): Promise<Specialities> => {
  const result = await prisma.specialities.delete({
    where: {
      id,
    },
  });

  return result;
};

export const SpecialitiesServices = {
  createSpecialities,
  getAllFromDB,
  deleteSpeciality,
};
