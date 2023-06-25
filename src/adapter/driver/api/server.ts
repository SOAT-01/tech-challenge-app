import express from "express";
import { createMongoConnection } from "@infra/mongo/helpers/createMongoConnection";
import { requestLogger } from "@utils/requestLogger";
import { makeServerRouter } from "./routes";

require("dotenv").config();

function buildServer() {
    createMongoConnection();

    const server = express();

    server.use(requestLogger);

    server.use(express.json({ limit: "10mb" }));
    server.use(express.urlencoded({ extended: true, limit: "10mb" }));

    server.use("/api", makeServerRouter());

    return server;
}

export const server = buildServer();
