import { Router } from "express";
import { pagamentoController } from "@controllers/index";

export function makePagamentoRouter(): Router {
    const pagamentoRouter = Router();

    pagamentoRouter.post("/", async (req, res, next) =>
        pagamentoController.post(req, res, next),
    );

    pagamentoRouter.get("/:id", async (req, res, next) =>
        pagamentoController.getById(req, res, next),
    );

    pagamentoRouter.patch("/:id", async (req, res, next) => {
        pagamentoController.patch(req, res, next);
    });

    return pagamentoRouter;
}
