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

export function patchProdutoRouter(): Router {
    const produtoRouter = Router();

    produtoRouter.patch("/:id", async (req, res) => {
        produtoController.patch(req, res);
    });

    return produtoRouter;
}

export function deleteProdutoRouter(): Router {
    const produtoRouter = Router();

    produtoRouter.delete("/:id", async (req, res) => {
        produtoController.delete(req, res);
    });

    return produtoRouter;
}
