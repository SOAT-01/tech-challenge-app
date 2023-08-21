import { ProdutoUseCase } from "useCases";
import { ProdutoController } from "./controller";
import { ProdutoModel } from "external/mongo/models";
import { ProdutoMongoGateway } from "gateways/produtoGateway";

export class ProdutoControllerFactory {
    public static create(): ProdutoController {
        const produtoGateway = new ProdutoMongoGateway(ProdutoModel);
        const produtoUseCase = new ProdutoUseCase(produtoGateway);

        return new ProdutoController(produtoUseCase);
    }
}
