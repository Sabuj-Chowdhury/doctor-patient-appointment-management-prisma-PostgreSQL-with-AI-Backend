import dotenv from "dotenv";

dotenv.config();

interface IEnv {
  PORT: string;
  NODE_ENV: "development" | "production";
  SALT_ROUND: string;
}

const requiredVariable = ["PORT", "NODE_ENV", "SALT_ROUND"];

const loadEnv = (): IEnv => {
  requiredVariable.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing required env variables ${key}`);
    }
  });
  return {
    PORT: process.env.PORT as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    SALT_ROUND: process.env.SALT_ROUND as string,
  };
};

export const envVariable = loadEnv();
