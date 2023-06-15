import { SystemUserRepository } from "@infra/repositories/systemUserRepository";
import { SystemProdutoRepository } from "@infra/repositories/systemProdutoRepository";
import { SystemUserUseCase } from "@useCases/user";
import { UserController } from "./userController";
import { SystemProdutoUseCase } from "@useCases/produto";
import { ProdutoController } from "./produto/produtoController";
import Produto from "@infra/mongo/Produto";

const systemUserRepository = new SystemUserRepository();
const systemUserUseCase = new SystemUserUseCase(systemUserRepository);

export const userController = new UserController(systemUserUseCase);

const systemProdutoRepository = new SystemProdutoRepository(Produto);
const systemProdutoUseCase = new SystemProdutoUseCase(systemProdutoRepository);

export const produtoController = new ProdutoController(systemProdutoUseCase);
