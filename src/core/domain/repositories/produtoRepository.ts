import { Produto } from "@domain/entities/produto";

export interface ProdutoRepository {
    createProduto(produto: Produto): Promise<Produto>;
}
