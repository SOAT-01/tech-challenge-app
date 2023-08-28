import { PagamentoEventMockUseCase } from "useCases";
import { PedidoModel } from "external/mongo/models";
import { WebhookController } from "./controller";
import { PedidoMongoGateway } from "gateways";

export class WebhookControllerFactory {
    public static create(): WebhookController {
        const pedidoGateway = new PedidoMongoGateway(PedidoModel);
        const produtoUseCase = new PagamentoEventMockUseCase(pedidoGateway);

        return new WebhookController(produtoUseCase);
    }
}
