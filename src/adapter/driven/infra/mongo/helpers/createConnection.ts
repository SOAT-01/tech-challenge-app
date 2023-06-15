import mongoose, { ConnectOptions } from "mongoose";

const mongodbConnString = "mongodb://localhost";

export default function createConnection(): void {
    console.log("rodando");
    mongoose
        .connect(mongodbConnString, {
            dbName: "marketplace_dev",
        } as ConnectOptions)
        .then(
            () => console.log("Successfully connected to MongoDB"),
            (error) => {
                console.error("Error connecting to MongoDB:", error);
            },
        );
}
