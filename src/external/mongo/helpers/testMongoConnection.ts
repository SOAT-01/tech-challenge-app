import { serverConfig } from "config/index";
import mongoose from "mongoose";

const mongodbConnString = serverConfig.mongo.connectionString;

export async function testMongoConnection(): Promise<boolean> {
    try {
        await mongoose.connect(mongodbConnString, {
            dbName: serverConfig.mongo.dbName,
            serverSelectionTimeoutMS: 500,
        });
        return true;
    } catch (error) {
        return false;
    }
}
