import dotenv from "dotenv";
dotenv.config();

export const CONF = {
  PORT: process.env["PORT"],
  DB_URL: process.env["DB_URL"],
};
