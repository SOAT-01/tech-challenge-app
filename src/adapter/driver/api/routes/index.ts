import { Router } from "express";
import { getUserRouter } from "./userRouter";
import {
    getProdutoRouter,
    patchProdutoRouter,
    postProdutoRouter,
} from "./produtoRouter";

export function getServerRouter(): Router {
    const serverRouter = Router();

    serverRouter.use("/users", getUserRouter());
    serverRouter.use("/produtos", getProdutoRouter());

    return serverRouter;
}
export function postServerRouter(): Router {
    const serverRouter = Router();

    serverRouter.use("/produtos", postProdutoRouter());

    return serverRouter;
}

export function patchServerRouter(): Router {
    const serverRouter = Router();

    serverRouter.use("/produtos", patchProdutoRouter());

    return serverRouter;
}
