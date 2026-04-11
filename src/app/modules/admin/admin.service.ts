import { Admin, Prisma, UserStatus } from "@prisma/client";
import { IOptions, paginationHelper } from "../../utils/pagination_helper";
import { IAdminFilter } from "./admin.interface";
import { adminSearchAbleFields } from "./admin.constant";
import { prisma } from "../../config/prismaInstance";

const getAllAdmin = async (options: IOptions, filter: IAdminFilter) => {
  const { page, limit, skip, sort, order } = paginationHelper(options);

  const { search, ...filterData } = filter;

  const prismaAndConditions: Prisma.AdminWhereInput[] = [];

  if (search) {
    prismaAndConditions.push({
      OR: adminSearchAbleFields.map((field) => ({
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
  const whereConditions: Prisma.AdminWhereInput =
    prismaAndConditions.length > 0
      ? {
          AND: prismaAndConditions,
        }
      : {};

  const admin = await prisma.admin.findMany({
    skip,
    take: limit,
    where: whereConditions,
    orderBy: {
      [sort]: order,
    },
  });

  const total = await prisma.admin.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: admin,
  };
};

const getAdminByID = async (id: string): Promise<Admin | null> => {
  const admin = await prisma.admin.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });

  return admin;
};

const updateAdmin = async (
  id: string,
  payload: Partial<Admin>,
): Promise<Admin | null> => {
  const admin = await prisma.admin.findFirstOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!admin) {
    throw new Error("no such admin");
  }

  const result = await prisma.admin.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteAdmin = async (id: string): Promise<Admin | null> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.$transaction(async (trans) => {
    const adminDeleteData = await trans.admin.delete({
      where: {
        id,
      },
    });

    await trans.user.delete({
      where: {
        email: adminDeleteData.email,
      },
    });
    return adminDeleteData;
  });

  return result;
};

const softDeleteAdmin = async (id: string): Promise<Admin | null> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  const result = await prisma.$transaction(async (trans) => {
    const adminDeleteData = await trans.admin.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });

    await trans.user.update({
      where: {
        email: adminDeleteData.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });

    return adminDeleteData;
  });
  return result;
};

export const AdminServices = {
  getAllAdmin,
  getAdminByID,
  updateAdmin,
  deleteAdmin,
  softDeleteAdmin,
};
