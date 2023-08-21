import { PedidoUseCase } from "useCases";
import { PedidoController } from "./controller";
import { PedidoModel, ProdutoModel } from "external/mongo/models";
import { PedidoMongoGateway } from "gateways/pedidoGateway";
import { ProdutoMongoGateway } from "gateways/produtoGateway";

export class PedidoControllerFactory {
    public static create(): PedidoController {
        const pedidoGateway = new PedidoMongoGateway(PedidoModel);
        const produtoGateway = new ProdutoMongoGateway(ProdutoModel);

        const pedidoUseCase = new PedidoUseCase(pedidoGateway, produtoGateway);

        return new PedidoController(pedidoUseCase);
    }
}
