import { prisma } from "../../config/prismaInstance";
import { IJWTUserPayload } from "../../types/types";

const createDoctorSchedules = async (
  payload: { schedulesIDs: string[] },
  user: IJWTUserPayload,
) => {
  const doctorEmail = user.email;
  const doctorData = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: doctorEmail,
    },
  });

  const doctorScheduleData = payload.schedulesIDs.map((scheduleId) => ({
    doctorId: doctorData.id,
    scheduleId,
  }));

  const result = await prisma.doctorSchedules.createMany({
    data: doctorScheduleData,
  });

  return result;
};

export const DoctorSchedulesService = {
  createDoctorSchedules,
};
