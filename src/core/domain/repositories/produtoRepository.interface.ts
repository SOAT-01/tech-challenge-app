import { CategoriaEnum, Produto } from "@domain/entities/produto";

export interface ProdutoRepository {
    create(produto: Produto): Promise<Produto>;
    getByCategoria(categoria: CategoriaEnum): Promise<Produto[]>;
    getById(id: string): Promise<Produto | undefined>;
    update(id: string, produto: Partial<Produto>): Promise<Produto>;
    delete(id: string): Promise<void>;
}
