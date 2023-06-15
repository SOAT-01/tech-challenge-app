import { Produto } from "@domain/entities/produto";

export interface ProdutoUseCase {
    createProduto: (produto: Produto) => Promise<Produto>;
}
