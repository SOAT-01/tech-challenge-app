import { PedidoUseCase } from "useCases";
import { PedidoMongoGateway } from "gateways/pedidoGateway";
import { ProdutoPostgresGateway } from "gateways/produtoGateway";
import { PedidoModel } from "external/mongo/models";
import { PostgresDB } from "external/postgres";
import { ProdutoSchema } from "external/postgres/schemas";
import { PedidoController } from "./controller";

export class PedidoControllerFactory {
    public static create(): PedidoController {
        const pedidoGateway = new PedidoMongoGateway(PedidoModel);
        const produtoGateway = new ProdutoPostgresGateway(
            PostgresDB,
            ProdutoSchema,
        );

        const pedidoUseCase = new PedidoUseCase(pedidoGateway, produtoGateway);

        return new PedidoController(pedidoUseCase);
    }
}
