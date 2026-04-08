import { Gender } from "@prisma/client";

export interface IDoctorPayload {
  name: string;
  email: string;
  contactNumber: string;
  address: string;
  registrationNumber: string;
  experience: number;
  gender: Gender;
  appointmentFee: number;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;
  isDeleted: boolean;
  specialities: {
    specialityID: string;
    isDeleted?: boolean;
  }[];
}
