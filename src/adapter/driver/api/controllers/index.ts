import { ProdutoMongoRepository } from "@infra/mongo/repositories/produtoRepository";
import { ProdutoUseCase } from "@useCases/produto";
import { ClienteModel, ProdutoModel } from "@infra/mongo/models";
import { ProdutoController } from "./produto/produtoController";
import { ClienteMongoRepository } from "@infra/mongo/repositories";
import { ClienteUseCase } from "@useCases/user";
import { ClienteController } from "./cliente";
import { HealthController } from "./health";

const produtoRepository = new ProdutoMongoRepository(ProdutoModel);
const produtoUseCase = new ProdutoUseCase(produtoRepository);
export const produtoController = new ProdutoController(produtoUseCase);

const clienteRepository = new ClienteMongoRepository(ClienteModel);
const clienteUseCase = new ClienteUseCase(clienteRepository);
export const clienteController = new ClienteController(clienteUseCase);

export const healthController = new HealthController();