import z from "zod";

export const doctorSchedulesZodValidationSchema = z.object({
  schedulesIDs: z.array(z.string()),
});
