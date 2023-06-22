import { Router } from "express";
import { clienteController } from "@controllers/index";

export function makeClienteRouter(): Router {
    const clienteRouter = Router();

    clienteRouter.post("/", async (req, res) =>
        clienteController.post(req, res),
    );
    clienteRouter.get("/by-email/:email", async (req, res) =>
        clienteController.getByEmail(req, res),
    );
    clienteRouter.get("/by-cpf/:cpf", async (req, res) =>
        clienteController.getByCpf(req, res),
    );

    return clienteRouter;
}
