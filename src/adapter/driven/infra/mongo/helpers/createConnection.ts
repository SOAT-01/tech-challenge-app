import { serverConfig } from "@config/index";
import mongoose from "mongoose";

const mongodbConnString = serverConfig.mongo.connectionString;

export default function createConnection(): void {
    mongoose
        .connect(mongodbConnString, {
            dbName: serverConfig.mongo.dbName,
        })
        .then(
            () => console.log("Successfully connected to MongoDB"),
            (error) => {
                console.error("Error connecting to MongoDB:", error);
            },
        );
}
