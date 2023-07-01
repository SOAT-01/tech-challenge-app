import { CategoriaEnum, Produto } from "@domain/entities/produto";
import { ProdutoDTO } from "./dto";

export interface IProdutoUseCase {
    getByCategoria(categoria: CategoriaEnum): Promise<Produto[]>;
    create(data: ProdutoDTO): Promise<Produto>;
    update(
        id: string,
        produto: Omit<Partial<ProdutoDTO>, "id">,
    ): Promise<Produto>;
    delete(id: string): Promise<void>;
}
