import { Router } from "express";
import { webhookController } from "controllers";

export function makeWebhookRouter(): Router {
    const webhookRouter = Router();

    webhookRouter.post("/pagamento/mock", async (req, res, next) =>
        webhookController.postMock(req, res, next),
    );

    webhookRouter.post("/pagamento/mercado-pago", async (req, res) => {
        try {
            console.log(req.body);
            return res.status(200).end();
        } catch (error) {
            console.log(error);
            return res.status(500).end();
        }
    });

    return webhookRouter;
}
