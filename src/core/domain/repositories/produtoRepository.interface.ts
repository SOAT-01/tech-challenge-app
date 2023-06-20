import { CategoriaEnum, Produto } from "@domain/entities/produto";

export interface IProdutoRepository {
    createProduto(produto: Produto): Promise<Produto>;
    getProdutoByCategoria(categoria: CategoriaEnum): Promise<Produto[]>;
    getProdutoById(id: string): Promise<Produto>;
    updateProduto(id: string, produto: Partial<Produto>): Promise<Produto>;
    deleteProduto(id: string): Promise<void>;
}
