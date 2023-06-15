import express from "express";
import {
    deleteServerRouter,
    getServerRouter,
    patchServerRouter,
    postServerRouter,
} from "./routes";
import createConnection from "../../driven/infra/mongo/helpers/createConnection";

function buildServer() {
    createConnection();
    const server = express();

    server.use(express.json({ limit: "10mb" }));
    server.use(express.urlencoded({ extended: true, limit: "10mb" }));

    server.use("/api", getServerRouter());
    server.use("/api", postServerRouter());
    server.use("/api", patchServerRouter());
    server.use("/api", deleteServerRouter());

    return server;
}

export const server = buildServer();
