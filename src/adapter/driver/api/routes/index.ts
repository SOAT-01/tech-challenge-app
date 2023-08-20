import { Router } from "express";
import { makeClienteRouter } from "./clienteRouter";
import { makeProdutoRouter } from "./produtoRouter";
import { makePedidoRouter } from "./pedidoRouter";
import { makeHealthRouter } from "./healthRouter";
import { makePagamentoRouter } from "./pagamentoRouter";

export function makeServerRouter(): Router {
    const serverRouter = Router();

    serverRouter.use("/cliente", makeClienteRouter());
    serverRouter.use("/produto", makeProdutoRouter());
    serverRouter.use("/pedido", makePedidoRouter());
    serverRouter.use("/health", makeHealthRouter());
    serverRouter.use("/pagamento", makePagamentoRouter());

    return serverRouter;
}
