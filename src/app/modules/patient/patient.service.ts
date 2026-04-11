import { Patient, Prisma, UserStatus } from "@prisma/client";
import { IOptions, paginationHelper } from "../../utils/pagination_helper";
import { IPatientFilter } from "./patient.interface";
import { patientSearchableFields } from "./patient.constants";
import { prisma } from "../../config/prismaInstance";

const getAllPatient = async (options: IOptions, filter: IPatientFilter) => {
  const { page, limit, skip, sort, order } = paginationHelper(options);

  const { search, ...filterData } = filter;

  const prismaAndConditions: Prisma.PatientWhereInput[] = [];

  if (search) {
    prismaAndConditions.push({
      OR: patientSearchableFields.map((field) => ({
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

  prismaAndConditions.push({
    isDeleted: false,
  });

  // console.log(prismaAndConditions);
  const whereConditions: Prisma.PatientWhereInput =
    prismaAndConditions.length > 0
      ? {
          AND: prismaAndConditions,
        }
      : {};

  const patient = await prisma.patient.findMany({
    skip,
    take: limit,
    where: whereConditions,
    orderBy: {
      [sort]: order,
    },
  });

  const total = await prisma.patient.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: patient,
  };
};

const getPatientByID = async (id: string): Promise<Patient | null> => {
  const patient = await prisma.patient.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });
  return patient;
};

const softDelete = async (id: string): Promise<Patient | null> => {
  return await prisma.$transaction(async (trans) => {
    const deletePatient = await trans.patient.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });

    await trans.user.update({
      where: {
        email: deletePatient.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });

    return deletePatient;
  });
};

export const PatientServices = {
  getAllPatient,
  getPatientByID,
  softDelete,
};
