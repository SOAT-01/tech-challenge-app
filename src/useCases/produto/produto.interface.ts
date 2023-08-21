import { CategoriaEnum } from "entities/produto";
import { ProdutoDTO } from "./dto";

export interface IProdutoUseCase {
    getByCategoria(categoria: CategoriaEnum): Promise<ProdutoDTO[]>;
    create(data: ProdutoDTO): Promise<ProdutoDTO>;
    update(
        id: string,
        produto: Omit<Partial<ProdutoDTO>, "id">,
    ): Promise<ProdutoDTO>;
    delete(id: string): Promise<void>;
}
