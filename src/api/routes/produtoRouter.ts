import { produtoController } from "controllers";
import { Router } from "express";

export function makeProdutoRouter(): Router {
    const produtoRouter = Router();
    produtoRouter.post("/", async (req, res, next) =>
        produtoController.post(req, res, next),
    );

    produtoRouter.get("/:categoria", async (req, res, next) => {
        produtoController.get(req, res, next);
    });

    produtoRouter.patch("/:id", async (req, res, next) => {
        produtoController.patch(req, res, next);
    });

    produtoRouter.delete("/:id", async (req, res, next) => {
        produtoController.delete(req, res, next);
    });

    return produtoRouter;
}
