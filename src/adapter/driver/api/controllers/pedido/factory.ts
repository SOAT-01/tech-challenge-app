import { PedidoModel, ProdutoModel } from "@infra/mongo/models";
import {
    PedidoMongoRepository,
    ProdutoMongoRepository,
} from "@infra/mongo/repositories";
import { PedidoUseCase } from "@useCases/pedido";
import { PedidoController } from "./controller";

export class PedidoControllerFactory {
    public static create(): PedidoController {
        const pedidoRepository = new PedidoMongoRepository(PedidoModel);
        const produtoRepository = new ProdutoMongoRepository(ProdutoModel);

        const pedidoUseCase = new PedidoUseCase(
            pedidoRepository,
            produtoRepository,
        );

        return new PedidoController(pedidoUseCase);
    }
}
