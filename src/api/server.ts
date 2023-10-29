import express from "express";
import { serve, setup } from "swagger-ui-express";
import { createMongoConnection } from "external/mongo";
import { errorHandler } from "./middlewares";
import { makeServerRouter } from "./routes";
import { requestLogger } from "../utils/requestLogger";
import { SwaggerConfig } from "./docs";

require("dotenv").config();

function buildServer() {
    createMongoConnection();

    const server = express();

    server.use(requestLogger);

    server.use(express.json({ limit: "10mb" }));
    server.use(express.urlencoded({ extended: true, limit: "10mb" }));

    server.use("/api-docs", serve, setup(SwaggerConfig));
    server.use("/api", makeServerRouter());
    server.use(errorHandler);

    return server;
}

export const server = buildServer();
