import { PedidoModel } from "@infra/mongo/models";
import { PedidoMongoRepository } from "@infra/mongo/repositories";
import { PedidoUseCase } from "@useCases/pedido";
import { PedidoController } from "./pedido";

import { ProdutoControllerFactory } from "./produto";
import { ClienteControllerFactory } from "./cliente";
import { HealthControllerFactory } from "./health";

const pedidoRepository = new PedidoMongoRepository(PedidoModel);
const pedidoUseCase = new PedidoUseCase(pedidoRepository);

export const produtoController = ProdutoControllerFactory.create();
export const clienteController = ClienteControllerFactory.create();
export const pedidoController = new PedidoController(pedidoUseCase);
export const healthController = HealthControllerFactory.create();
