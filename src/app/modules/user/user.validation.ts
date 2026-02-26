import { Gender } from "@prisma/client";
import z from "zod";

export const createPatientZodValidation = z.object({
  password: z.string({ error: "password is required!" }),
  patient: z.object({
    name: z.string({ error: "name is required!" }),
    email: z.email(),
    contactNumber: z
      .string()
      .regex(/^(?:\+?880|0)1[3-9]\d{8}$/, "Invalid Bangladesh mobile number"),

    address: z.string().optional(),
  }),
});

export const createAdminZodValidation = z.object({
  password: z.string({ error: "password is required!" }),
  admin: z.object({
    name: z.string({ error: "name is required!" }),
    email: z.email(),
    contactNumber: z
      .string({ error: "contact number is required!" })
      .regex(/^(?:\+?880|0)1[3-9]\d{8}$/, "Invalid Bangladesh mobile number"),
  }),
});

export const createDoctorZodValidation = z.object({
  password: z.string({ error: "password is required!" }),
  doctor: z.object({
    name: z.string({ error: "name is required!" }),
    email: z.email(),
    contactNumber: z
      .string({ error: "contact number is required!" })
      .regex(/^(?:\+?880|0)1[3-9]\d{8}$/, "Invalid Bangladesh mobile number"),
    address: z.string().optional(),
    registrationNumber: z.string({ error: "registration number is required!" }),
    experience: z.number().optional(),
    gender: z.enum([Gender.MALE, Gender.FEMALE]),
    appointmentFee: z.number({ error: "appointment fee is required!" }),
    qualification: z.string({ error: "qualification is required!" }),
    currentWorkingPlace: z.string({ error: "current working place required!" }),
    designation: z.string({ error: " designation is required!" }),
  }),
});
