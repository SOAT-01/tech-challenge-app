import express from "express";
import { makeServerRouter } from "./routes";
import createConnection from "../../driven/infra/mongo/helpers/createConnection";

require("dotenv").config();

function buildServer() {
    createConnection();
    const server = express();

    server.use(express.json({ limit: "10mb" }));
    server.use(express.urlencoded({ extended: true, limit: "10mb" }));

    server.use("/api", makeServerRouter());

    return server;
}

export const server = buildServer();
