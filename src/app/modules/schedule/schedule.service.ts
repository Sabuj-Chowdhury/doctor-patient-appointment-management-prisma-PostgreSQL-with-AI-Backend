import { addHours, addMinutes, format } from "date-fns";
import { prisma } from "../../config/prismaInstance";
import { IOptions, paginationHelper } from "../../utils/pagination_helper";
import { Prisma } from "@prisma/client";

const createSchedules = async (payload: any) => {
  //   console.log({ payload });

  const createdSchedule = [];

  const { startDate, endDate, startTime, endTime } = payload;

  const interval = 30;

  const startingDate = new Date(startDate);
  const endingDate = new Date(endDate);
  //   console.log({ startingDate, endingDate });

  while (startingDate <= endingDate) {
    const startingDateTime = new Date(
      addMinutes(
        addHours(
          `${format(startingDate, "yyyy-MM-dd")}`,
          Number(startTime.split(":")[0]), //10:00
        ),

        Number(startTime.split(":")[1]),
      ),
    );

    const endingDateTime = new Date(
      addMinutes(
        addHours(
          `${format(startingDate, "yyyy-MM-dd")}`,
          Number(endTime.split(":")[0]), //10:00
        ),

        Number(endTime.split(":")[1]),
      ),
    );

    // console.log({ startingDateTime, endingDateTime });
    while (startingDateTime < endingDateTime) {
      const slotStartDateTime = startingDateTime;
      const slotEndDateTime = addMinutes(startingDateTime, interval);

      const scheduleData = {
        startDateTime: slotStartDateTime,
        endDateTime: slotEndDateTime,
      };

      const existingSchedule = await prisma.schedule.findFirst({
        where: scheduleData,
      });

      // if no schedule was created before then create the schedule
      if (!existingSchedule) {
        const schedule = await prisma.schedule.create({
          data: scheduleData,
        });

        // push the schedule in the schedules created
        createdSchedule.push(schedule);
      }

      // change the slot startDateTime
      slotStartDateTime.setMinutes(slotStartDateTime.getMinutes() + interval);
    }

    // change the date
    startingDate.setDate(startingDate.getDate() + 1);
  }

  return createdSchedule;
};

const scheduleForDoctor = async (filter: any, options: IOptions) => {
  const { page, limit, skip, sort, order } = paginationHelper(options);
  const { startDateTime, endDateTime } = filter;

  const prismaAndConditions: Prisma.ScheduleWhereInput[] = [];

  if (startDateTime && endDateTime) {
    prismaAndConditions.push({
      AND: [
        {
          startDateTime: {
            gte: startDateTime,
          },
        },
        {
          endDateTime: {
            lte: endDateTime,
          },
        },
      ],
    });
  }

  const whereConditions: Prisma.ScheduleWhereInput =
    prismaAndConditions.length > 0
      ? {
          AND: prismaAndConditions,
        }
      : {};

  const doctorSchedule = await prisma.schedule.findMany({
    skip,
    take: limit,

    where: whereConditions,
    orderBy: {
      [sort]: order,
    },
  });

  const total = await prisma.schedule.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: doctorSchedule,
  };
};

const deleteSchedule = async (scheduleID: string) => {
  const result = await prisma.schedule.delete({
    where: {
      id: scheduleID,
    },
  });

  return result;
};

export const schedulesService = {
  createSchedules,
  scheduleForDoctor,
  deleteSchedule,
};
