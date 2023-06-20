import { produtoController } from "../controllers";
import { Router } from "express";

export function makeProdutoRouter(): Router {
    const produtoRouter = Router();
    produtoRouter.post("/", async (req, res) =>
        produtoController.post(req, res),
    );

    produtoRouter.get("/:categoria", async (req, res) => {
        produtoController.get(req, res);
    });

    produtoRouter.patch("/:id", async (req, res) => {
        produtoController.patch(req, res);
    });

    produtoRouter.delete("/:id", async (req, res) => {
        produtoController.delete(req, res);
    });

    return produtoRouter;
}
