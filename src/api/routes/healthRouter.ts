import { healthController } from "controllers";
import { Router } from "express";

export function makeHealthRouter(): Router {
    const healthRouter = Router();

    healthRouter.get("/", async (req, res, next) => {
        healthController.get(req, res, next);
    });

    return healthRouter;
}
