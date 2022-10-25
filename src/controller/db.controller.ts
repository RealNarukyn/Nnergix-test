import mongoose from "mongoose";
import { CONF } from "../config";

const DB_URL = CONF["DB_URL"] || "mongodb://localhost:27017/nnergix";

export class DbController {
  static initDB = async () => {
    await mongoose.connect(DB_URL);
    console.log("DataBase Connected ✨");
  };

  static closeDB = async () => await mongoose.connection.close();

  static clearDB = async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  };
}
