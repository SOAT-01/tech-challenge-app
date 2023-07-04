import { PedidoModel, ProdutoModel } from "@infra/mongo/models";
import {
    PedidoMongoRepository,
    ProdutoMongoRepository,
} from "@infra/mongo/repositories";
import { PedidoUseCase } from "@useCases/pedido";
import { PedidoController } from "./pedido";

import { ProdutoControllerFactory } from "./produto";
import { ClienteControllerFactory } from "./cliente";
import { HealthControllerFactory } from "./health";

const pedidoRepository = new PedidoMongoRepository(PedidoModel);
const produtoRepository = new ProdutoMongoRepository(ProdutoModel);

const pedidoUseCase = new PedidoUseCase(pedidoRepository, produtoRepository);

export const produtoController = ProdutoControllerFactory.create();
export const clienteController = ClienteControllerFactory.create();
export const pedidoController = new PedidoController(pedidoUseCase);
export const healthController = HealthControllerFactory.create();
