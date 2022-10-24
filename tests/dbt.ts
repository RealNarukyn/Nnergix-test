import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

// DataBaseTests
export class DBT {
  mongod: MongoMemoryServer | undefined;
  uri: string;
  constructor() {
    this.uri = "";
  }

  connect = async () => {
    this.mongod = await MongoMemoryServer.create();
    this.uri = this.mongod.getUri();
    await mongoose.connect(this.uri);
  };

  closeDb = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await (this.mongod as MongoMemoryServer).stop();
  };

  clearDb = async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  };
}
