import { CategoriaEnum, Produto } from "@domain/entities/produto";

export interface ProdutoUseCase {
    createProduto: (produto: Produto) => Promise<Produto>;
    getProdutoByCategoria: (categoria: CategoriaEnum) => Promise<Produto[]>;
}
