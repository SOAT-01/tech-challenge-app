import { pedidoController } from "controllers";
import { Router } from "express";

export function makePedidoRouter(): Router {
    const pedidoRouter = Router();

    pedidoRouter.get("/", async (req, res, next) => {
        pedidoController.get(req, res, next);
    });

    pedidoRouter.get("/ordered-by-status", async (req, res, next) => {
        pedidoController.getAllOrderedByStatus(req, res, next);
    });

    pedidoRouter.get("/:id/payment-status", async (req, res, next) => {
        pedidoController.getPaymentStatus(req, res, next);
    });

    pedidoRouter.post("/", async (req, res, next) =>
        pedidoController.post(req, res, next),
    );

    pedidoRouter.patch("/:id", async (req, res, next) => {
        pedidoController.patch(req, res, next);
    });

    pedidoRouter.patch("/:id/update-status", async (req, res, next) => {
        pedidoController.patchStatus(req, res, next);
    });

    pedidoRouter.patch("/:id/payment-checkout", async (req, res, next) => {
        pedidoController.patchPaymentStatus(req, res, next);
    });

    return pedidoRouter;
}
