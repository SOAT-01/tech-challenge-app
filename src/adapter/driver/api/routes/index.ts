import { Router } from "express";
import { getUserRouter } from "./userRouter";

export function getServerRouter(): Router {
    const serverRouter = Router();

    serverRouter.use("/users", getUserRouter());

    return serverRouter;
}
