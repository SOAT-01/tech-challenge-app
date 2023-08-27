import { CategoriaEnum, Produto } from "entities/produto";

export interface ProdutoGateway {
    create(produto: Produto): Promise<Produto>;
    getByCategoria(categoria: CategoriaEnum): Promise<Produto[]>;
    getById(id: string): Promise<Produto | undefined>;
    getByIds(ids: string[]): Promise<Produto[]>;
    update(id: string, produto: Partial<Produto>): Promise<Produto>;
    delete(id: string): Promise<void>;
}
