import mongoose, { ConnectOptions } from "mongoose";

const mongodbConnString =
    process.env.MONGODB_CONN_STRING || "mongodb://localhost:27017";

export default function createConnection(): void {
    mongoose
        .connect(mongodbConnString, {
            dbName: "fast_food",
        } as ConnectOptions)
        .then(
            () => console.log("Successfully connected to MongoDB"),
            (error) => {
                console.error("Error connecting to MongoDB:", error);
            },
        );
}
