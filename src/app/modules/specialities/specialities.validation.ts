import z from "zod";

export const createSpecialitiesZodValidationSchema = z.object({
  title: z.string({ error: "Title is required!" }),
});
