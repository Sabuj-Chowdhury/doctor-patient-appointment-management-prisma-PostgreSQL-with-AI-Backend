import { Prisma } from "@prisma/client";
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

  //   if (Object.keys(filterData).length > 0) {
  //     prismaAndConditions.push({
  //         AND: Object.keys(filterData).map(key => {
  //             return {
  //                 [key]: {
  //                     equals: (filterData as any)[key],
  //                 },
  //             };
  //         }),
  //     });
  // }
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

export const PatientServices = {
  getAllPatient,
};
