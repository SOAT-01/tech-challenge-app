import { Produto } from "@domain/entities/produto";

export interface ProdutoRepository {
    // getProdutosByCategoria(): Promise<Produto[]>;
    createProduto(): Promise<Produto>;
}
