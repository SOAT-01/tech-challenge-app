import { SystemUserRepository } from "@infra/mongo/repositories/systemUserRepository";
import { ProdutoMongoRepository } from "@infra/mongo/repositories/produtoRepository";
import { SystemUserUseCase } from "@useCases/user";
import { UserController } from "./userController";
import { ProdutoUseCase } from "@useCases/produto";
import { ProdutoController } from "./produto/produtoController";
import Produto from "@infra/mongo/models/Produto";

import { PedidoMongoRepository } from "@infra/mongo/repositories/pedidoRepository";
import Pedido from "@infra/mongo/models/Pedido";
import { PedidoUseCase } from "@useCases/pedido";
import { PedidoController } from "./pedidoController";

const systemUserRepository = new SystemUserRepository();
const systemUserUseCase = new SystemUserUseCase(systemUserRepository);

export const userController = new UserController(systemUserUseCase);

const produtoRepository = new ProdutoMongoRepository(Produto);
const produtoUseCase = new ProdutoUseCase(produtoRepository);

export const produtoController = new ProdutoController(produtoUseCase);

const pedidoRepository = new PedidoMongoRepository(Pedido);
const pedidoUseCase = new PedidoUseCase(pedidoRepository);

export const pedidoController = new PedidoController(pedidoUseCase);
