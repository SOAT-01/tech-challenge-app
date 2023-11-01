import { ProdutoUseCase } from "useCases";
import { ProdutoController } from "./controller";
import { ProdutoPostgresGateway } from "gateways/produtoGateway";
import { PostgresDB } from "external/postgres";
import { ProdutoSchema } from "external/postgres/schemas";

export class ProdutoControllerFactory {
    public static create(): ProdutoController {
        const produtoGateway = new ProdutoPostgresGateway(
            PostgresDB,
            ProdutoSchema,
        );
        const produtoUseCase = new ProdutoUseCase(produtoGateway);

        return new ProdutoController(produtoUseCase);
    }
}
