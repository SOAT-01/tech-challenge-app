import { Router } from "express";
import { userController } from "../controllers";

export function getUserRouter(): Router {
    const userRouter = Router();

    userRouter.get("/", async (req, res) => userController.get(req, res));

    return userRouter;
}
