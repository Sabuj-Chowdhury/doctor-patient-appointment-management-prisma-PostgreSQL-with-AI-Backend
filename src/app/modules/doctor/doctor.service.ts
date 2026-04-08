import { Prisma } from "@prisma/client";
import { IOptions, paginationHelper } from "../../utils/pagination_helper";
import { DoctorSearchableFields } from "./doctor.constant";
import { prisma } from "../../config/prismaInstance";
import { IDoctorPayload } from "./doctor.interface";

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

const updateDoctorFromDB = async (
  id: string,
  payload: Partial<IDoctorPayload>,
) => {
  // 1. check if the doctor exist
  const doctor = await prisma.doctor.findUniqueOrThrow({
    where: {
      id,
    },
  });

  // check if specialty is there
  const { specialities, ...doctorUpdateData } = payload;

  if (specialities && specialities?.length > 0) {
    // sperate the to be added or deleted speciality
    const deletedSpecialityIDs = specialities.filter(
      (speciality) => speciality.isDeleted,
    );

    for (const speciality of deletedSpecialityIDs) {
      await prisma.doctorSpecialities.deleteMany({
        where: {
          doctorID: id,
          specialitiesID: speciality.specialityID,
        },
      });
    }

    const createSpecialityIDs = specialities.filter(
      (speciality) => !speciality.isDeleted,
    );

    for (const speciality of createSpecialityIDs) {
      await prisma.doctorSpecialities.create({
        data: {
          doctorID: id,
          specialitiesID: speciality.specialityID,
        },
      });
    }

    // 2. update the data
    const updateDoctor = await prisma.doctor.update({
      where: {
        id: doctor.id,
      },
      data: doctorUpdateData,
      include: {
        doctorSpecialities: {
          include: {
            specialities: true,
          },
        },
      },

      // doctor -> doctorSpecialities -> specialities ->view
    });
    return updateDoctor;
  }
};

export const DoctorServices = {
  getAllDoctorFromDB,
  updateDoctorFromDB,
};
