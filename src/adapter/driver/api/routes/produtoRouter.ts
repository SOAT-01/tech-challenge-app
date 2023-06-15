import { produtoController } from "../controllers";
import { Router } from "express";

export function postProdutoRouter(): Router {
    const produtoRouter = Router();

    produtoRouter.post("/", async (req, res) =>
        produtoController.post(req, res),
    );

    return produtoRouter;
}
