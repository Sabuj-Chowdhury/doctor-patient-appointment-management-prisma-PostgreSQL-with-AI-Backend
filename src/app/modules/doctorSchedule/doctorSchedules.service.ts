import { prisma } from "../../config/prismaInstance";

const createDoctorSchedules = async (payload: any, user: any) => {
  const doctorEmail = user.email;
  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: doctorEmail,
    },
  });
  return { doctorData };
};

export const DoctorSchedulesService = {
  createDoctorSchedules,
};
