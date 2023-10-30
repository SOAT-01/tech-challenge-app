import { PedidoUseCase } from "useCases";
import { PedidoMongoGateway } from "gateways/pedidoGateway";
import { ProdutoPostgresGateway } from "gateways/produtoGateway";
import { PedidoModel } from "external/mongo/models";
import { PostgresDB } from "external/postgres";
import { ClienteSchema, ProdutoSchema } from "external/postgres/schemas";
import { PedidoController } from "./controller";
import { ClientePostgresGateway } from "gateways";

export class PedidoControllerFactory {
    public static create(): PedidoController {
        const pedidoGateway = new PedidoMongoGateway(PedidoModel);
        const produtoGateway = new ProdutoPostgresGateway(
            PostgresDB,
            ProdutoSchema,
        );
        const clienteGateway = new ClientePostgresGateway(
            PostgresDB,
            ClienteSchema,
        );

        const pedidoUseCase = new PedidoUseCase(
            pedidoGateway,
            produtoGateway,
            clienteGateway,
        );

        return new PedidoController(pedidoUseCase);
    }
}
