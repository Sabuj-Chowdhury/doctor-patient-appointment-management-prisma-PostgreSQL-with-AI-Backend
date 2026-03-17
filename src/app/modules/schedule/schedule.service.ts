import { addHours, addMinutes, format } from "date-fns";

const createSchedules = async (payload: any) => {
  //   console.log({ payload });

  const { startDate, endDate, startTime, endTime } = payload;

  const startingDate = new Date(startDate);
  const endingDate = new Date(endDate);
  //   console.log({ startingDate, endingDate });

  while (startingDate <= endingDate) {
    const startingDateTime = new Date(
      addMinutes(
        addHours(
          `${format(startingDate, "yyyy-mm-dd")}`,
          Number(startTime.split(":")[0]), //10:00
        ),

        Number(startTime.split(":")[1]),
      ),
    );

    const endingDateTime = new Date(
      addMinutes(
        addHours(
          `${format(endingDate, "yyyy-mm-dd")}`,
          Number(endTime.split(":")[0]), //10:00
        ),

        Number(endTime.split(":")[1]),
      ),
    );

    console.log({ startingDateTime, endingDateTime });
  }

  return "payload";
};

export const schedulesService = {
  createSchedules,
};
