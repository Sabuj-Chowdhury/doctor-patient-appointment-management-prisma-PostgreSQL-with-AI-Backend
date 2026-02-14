import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });

// Instantiate Prisma Client with the adapter
export const prisma = new PrismaClient({ adapter });
