import { ProdutoModel } from "@infra/mongo/models";
import { ProdutoMongoRepository } from "@infra/mongo/repositories";
import { ProdutoUseCase } from "@useCases/produto";
import { ProdutoController } from "./controller";

export class ProdutoControllerFactory {
    public static create(): ProdutoController {
        const produtoRepository = new ProdutoMongoRepository(ProdutoModel);
        const produtoUseCase = new ProdutoUseCase(produtoRepository);

        return new ProdutoController(produtoUseCase);
    }
}
