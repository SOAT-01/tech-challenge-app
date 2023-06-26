import { ClienteModel, ProdutoModel } from "@infra/mongo/models";
import {
    ClienteMongoRepository,
    ProdutoMongoRepository,
} from "@infra/mongo/repositories";
import { ClienteUseCase } from "@useCases/cliente";
import { ProdutoUseCase } from "@useCases/produto";
import { ClienteController } from "./cliente";
import { ProdutoController } from "./produto";

const clienteRepository = new ClienteMongoRepository(ClienteModel);
const produtoRepository = new ProdutoMongoRepository(ProdutoModel);

const clienteUseCase = new ClienteUseCase(clienteRepository);
const produtoUseCase = new ProdutoUseCase(produtoRepository);

export const clienteController = new ClienteController(clienteUseCase);
export const produtoController = new ProdutoController(produtoUseCase);
