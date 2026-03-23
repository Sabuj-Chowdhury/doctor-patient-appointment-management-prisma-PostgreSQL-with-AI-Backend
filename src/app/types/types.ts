import { UserRole } from "@prisma/client";

export interface IJWTUserPayload {
  email: string;
  role: UserRole;
}
