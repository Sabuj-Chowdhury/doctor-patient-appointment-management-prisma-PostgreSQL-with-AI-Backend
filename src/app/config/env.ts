import dotenv from "dotenv";

dotenv.config();

interface IEnv {
  PORT: string;
  NODE_ENV: "development" | "production";
  SALT_ROUND: string;

  JWT: {
    JWT_ACCESS_SECRET: string;
    JWT_ACCESS_EXPIRES: string;
    JWT_REFRESH_SECRET: string;
    JWT_REFRESH_EXPIRES: string;
  };

  CLOUDINARY: {
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
  };
}

const requiredVariable = [
  "PORT",
  "NODE_ENV",
  "SALT_ROUND",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
  "JWT_ACCESS_SECRET",
  "JWT_ACCESS_EXPIRES",
  "JWT_REFRESH_SECRET",
  "JWT_REFRESH_EXPIRES",
];

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

    JWT: {
      JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
      JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
      JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
      JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string,
    },

    CLOUDINARY: {
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
    },
  };
};

export const envVariable = loadEnv();
