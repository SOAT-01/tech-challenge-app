import { Router } from "express";
import { makeClienteRouter } from "./clienteRouter";
import { makeProdutoRouter } from "./produtoRouter";

export function makeServerRouter(): Router {
    const serverRouter = Router();

    serverRouter.use("/cliente", makeClienteRouter());
    serverRouter.use("/produto", makeProdutoRouter());

    return serverRouter;
}
