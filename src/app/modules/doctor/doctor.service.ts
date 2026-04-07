import { Prisma } from "@prisma/client";
import { IOptions, paginationHelper } from "../../utils/pagination_helper";
import { DoctorSearchableFields } from "./doctor.constant";
import { prisma } from "../../config/prismaInstance";

const getAllDoctorFromDB = async (options: IOptions, filter: any) => {
  const { page, limit, skip, sort, order } = paginationHelper(options);

  const { search, specialities, ...filterData } = filter;
  console.log(search);

  const prismaAndConditions: Prisma.DoctorWhereInput[] = [];

  if (search) {
    prismaAndConditions.push({
      OR: DoctorSearchableFields.map((field) => ({
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
  const whereConditions: Prisma.DoctorWhereInput =
    prismaAndConditions.length > 0
      ? {
          AND: prismaAndConditions,
        }
      : {};

  const doctors = await prisma.doctor.findMany({
    skip,
    take: limit,
    where: whereConditions,
    orderBy: {
      [sort]: order,
    },
  });

  const total = await prisma.doctor.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: doctors,
  };
};

export const DoctorServices = {
  getAllDoctorFromDB,
};
