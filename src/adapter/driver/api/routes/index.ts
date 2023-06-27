import { Router } from "express";
import { makeClienteRouter } from "./clienteRouter";
import { makeProdutoRouter } from "./produtoRouter";
import { makePedidoRouter } from "./pedidoRouter";

export function makeServerRouter(): Router {
    const serverRouter = Router();

    serverRouter.use("/cliente", makeClienteRouter());
    serverRouter.use("/produto", makeProdutoRouter());
    serverRouter.use("/pedido", makePedidoRouter());

    return serverRouter;
}
