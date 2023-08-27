import { Router } from "express";
import { makeClienteRouter } from "./clienteRouter";
import { makeProdutoRouter } from "./produtoRouter";
import { makePedidoRouter } from "./pedidoRouter";
import { makeHealthRouter } from "./healthRouter";
import { makeWebhookRouter } from "./webhookRouter";

export function makeServerRouter(): Router {
    const serverRouter = Router();

    serverRouter.use("/cliente", makeClienteRouter());
    serverRouter.use("/produto", makeProdutoRouter());
    serverRouter.use("/pedido", makePedidoRouter());
    serverRouter.use("/health", makeHealthRouter());
    serverRouter.use("/webhook", makeWebhookRouter());

    return serverRouter;
}
