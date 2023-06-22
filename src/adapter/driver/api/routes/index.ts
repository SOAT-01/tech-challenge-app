import { Router } from "express";
import { makeClienteRouter } from "./clienteRouter";
import { makePedidoRouter } from "./pedidoRouter";
import { makeProdutoRouter } from "./produtoRouter";

export function makeServerRouter(): Router {
    const serverRouter = Router();

    serverRouter.use("/cliente", makeClienteRouter());
    serverRouter.use("/produto", makeProdutoRouter());
    serverRouter.use("/pedido", makePedidoRouter());

    return serverRouter;
}
