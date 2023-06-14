import express from "express";
import { getServerRouter } from "./routes";

function buildServer() {
    const server = express();

    server.use(express.json({ limit: "10mb" }));
    server.use(express.urlencoded({ extended: true, limit: "10mb" }));

    server.use("/api", getServerRouter());

    return server;
}

export const server = buildServer();
