import { Produto } from "@domain/entities/produto";

export interface ProdutoUseCase {
    createProduto: () => Promise<Produto>;
}
