import { Router } from "express";
import { getUserRouter } from "./userRouter";
import { makeProdutoRouter } from "./produtoRouter";

export function makeServerRouter(): Router {
    const serverRouter = Router();

    serverRouter.use("/users", getUserRouter());
    serverRouter.use("/produtos", makeProdutoRouter());

    return serverRouter;
}
