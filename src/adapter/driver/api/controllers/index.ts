import { ClienteModel, ProdutoModel } from "@infra/mongo/models";
import {
    ClienteMongoRepository,
    ProdutoMongoRepository,
} from "@infra/mongo/repositories";
import { ClienteUseCase } from "@useCases/cliente";
import { ProdutoUseCase } from "@useCases/produto";
import { ClienteController } from "./cliente";
import { ProdutoController } from "./produto";

import { PedidoModel } from "@infra/mongo/models/Pedido";
import { PedidoMongoRepository } from "@infra/mongo/repositories/pedidoRepository";
import { PedidoUseCase } from "@useCases/pedido";
import { PedidoController } from "./pedido/pedidoController";

const clienteRepository = new ClienteMongoRepository(ClienteModel);
const produtoRepository = new ProdutoMongoRepository(ProdutoModel);
const pedidoRepository = new PedidoMongoRepository(PedidoModel);

const clienteUseCase = new ClienteUseCase(clienteRepository);
const produtoUseCase = new ProdutoUseCase(produtoRepository);
const pedidoUseCase = new PedidoUseCase(pedidoRepository);

export const clienteController = new ClienteController(clienteUseCase);
export const produtoController = new ProdutoController(produtoUseCase);
export const pedidoController = new PedidoController(pedidoUseCase);
