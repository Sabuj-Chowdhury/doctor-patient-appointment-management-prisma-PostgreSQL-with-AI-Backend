import z from "zod";

export const scheduleValidationZodSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});
