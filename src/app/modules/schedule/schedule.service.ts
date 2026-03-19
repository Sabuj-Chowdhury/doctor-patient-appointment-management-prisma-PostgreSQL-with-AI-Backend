import { addHours, addMinutes, format } from "date-fns";
import { prisma } from "../../config/prismaInstance";

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

export const schedulesService = {
  createSchedules,
};
