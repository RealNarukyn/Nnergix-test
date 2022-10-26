import dotenv from "dotenv";
dotenv.config();

export const CONF = {
  PORT: process.env["PORT"],
  DB_URL: "mongodb://mongodb:27017/nnergix",
};
