import { CategoriaEnum, Produto } from "@domain/entities/produto";
import { AssertionConcern } from "@domain/base/assertionConcern";
import { ProdutoRepository } from "@domain/repositories/produtoRepository.interface";
import { ResourceNotFoundError } from "@domain/errors/resourceNotFoundError";
import { IProdutoUseCase } from "./produto.interface";
import { ProdutoDTO } from "./dto";

export class ProdutoUseCase implements IProdutoUseCase {
    constructor(private readonly produtoRepository: ProdutoRepository) {}

    public async create(data: ProdutoDTO): Promise<ProdutoDTO> {
        const newProduto = new Produto(data);
        return this.produtoRepository.create(newProduto);
    }

    public async getByCategoria(
        categoria: CategoriaEnum,
    ): Promise<ProdutoDTO[]> {
        return this.produtoRepository.getByCategoria(categoria);
    }

    public async update(
        id: string,
        produto: Omit<Partial<ProdutoDTO>, "id">,
    ): Promise<ProdutoDTO> {
        AssertionConcern.assertArgumentNotEmpty(produto, "Produto is required");
        const doesProdutoExists = await this.produtoRepository.getById(id);

        if (!doesProdutoExists) {
            throw new ResourceNotFoundError("Produto não encontrado");
        }

        return this.produtoRepository.update(id, produto);
    }

    public async delete(id: string): Promise<void> {
        const doesProdutoExists = await this.produtoRepository.getById(id);

        if (!doesProdutoExists) {
            throw new ResourceNotFoundError("Produto não encontrado");
        }

        await this.produtoRepository.delete(id);
    }
}
