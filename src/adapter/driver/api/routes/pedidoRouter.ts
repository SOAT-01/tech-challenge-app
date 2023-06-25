import { pedidoController } from "../controllers";
import { Router } from "express";

export function makePedidoRouter(): Router {
    const pedidoRouter = Router();
    pedidoRouter.get("/:id", async (req, res) => {
        pedidoController.get(req, res);
    });

    pedidoRouter.post("/", async (req, res) => pedidoController.post(req, res));

    pedidoRouter.delete("/:id", async (req, res) => {
        pedidoController.delete(req, res);
    });

    return pedidoRouter;
}
