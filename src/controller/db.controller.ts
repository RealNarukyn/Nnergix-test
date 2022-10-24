import mongoose from "mongoose";
import { CONF } from "../config";

export class DbController {
  static initDB = async () => {
    await mongoose.connect(CONF["DB_URL"] as string);
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
