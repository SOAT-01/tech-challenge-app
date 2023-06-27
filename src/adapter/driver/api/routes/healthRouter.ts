import { healthController } from "../controllers";
import { Router } from "express";

export function makeHealthRouter(): Router {
    const healthRouter = Router();

    healthRouter.get("/", async (req, res) => {
        healthController.get(req, res);
    });

    return healthRouter;
}
