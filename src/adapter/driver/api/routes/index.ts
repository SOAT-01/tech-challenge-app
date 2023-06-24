import { Router } from "express";
import { getUserRouter } from "./userRouter";
import { makeProdutoRouter } from "./produtoRouter";
import { testPedidoRouter } from "./pedidoRouter";

export function makeServerRouter(): Router {
    const serverRouter = Router();

    serverRouter.use("/users", getUserRouter());
    serverRouter.use("/produtos", makeProdutoRouter());
    serverRouter.use("/pedidos", testPedidoRouter());

    return serverRouter;
}
