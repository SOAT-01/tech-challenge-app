import { produtoController } from "../controllers";
import { Router } from "express";

export function postProdutoRouter(): Router {
    const produtoRouter = Router();

    produtoRouter.post("/", async (req, res) =>
        produtoController.post(req, res),
    );

    return produtoRouter;
}

export function getProdutoRouter(): Router {
    const produtoRouter = Router();

    produtoRouter.get("/:categoria", async (req, res) => {
        produtoController.get(req, res);
    });

    return produtoRouter;
}
