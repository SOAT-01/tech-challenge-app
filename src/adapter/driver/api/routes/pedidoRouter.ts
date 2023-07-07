import { pedidoController } from "../controllers";
import { Router } from "express";

export function makePedidoRouter(): Router {
    const pedidoRouter = Router();

    pedidoRouter.get("/", async (req, res) => {
        pedidoController.get(req, res);
    });

    pedidoRouter.post("/", async (req, res) => pedidoController.post(req, res));

    pedidoRouter.patch("/:id", async (req, res) => {
        pedidoController.patch(req, res);
    });

    return pedidoRouter;
}
