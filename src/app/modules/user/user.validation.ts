import z from "zod";

export const createPatientZodValidation = z.object({
  password: z.string(),
  patient: z.object({
    name: z.string(),
    email: z.email(),
    contactNumber: z
      .string()
      .regex(/^(?:\+?880|0)1[3-9]\d{8}$/, "Invalid Bangladesh mobile number"),

    address: z.string().optional(),
  }),
});
