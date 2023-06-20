import { IProdutoUseCase } from "./produto.interface";
import { CategoriaEnum, Produto } from "@domain/entities/produto";
import { AssertionConcern } from "@domain/base/assertionConcern";
import { IProdutoRepository } from "@domain/repositories/produtoRepository.interface";

export class ProdutoUseCase implements IProdutoUseCase {
    private readonly produtoRepository: IProdutoRepository;

    constructor(produtoRepository: IProdutoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public async createProduto(produto: Produto): Promise<Produto> {
        return this.produtoRepository.createProduto(produto);
    }

    public async getProdutoByCategoria(
        categoria: CategoriaEnum,
    ): Promise<Produto[]> {
        return this.produtoRepository.getProdutoByCategoria(categoria);
    }

    public async updateProduto(
        id: string,
        produto: Omit<Partial<Produto>, "id">,
    ): Promise<Produto> {
        AssertionConcern.assertArgumentNotEmpty(produto, "Produto is required");
        const doesProdutoExists = await this.produtoRepository.getProdutoById(
            id,
        );

        if (!doesProdutoExists) {
            throw new Error("Produto não encontrado");
        }
        return this.produtoRepository.updateProduto(id, produto);
    }

    public async deleteProduto(id: string): Promise<void> {
        const doesProdutoExists = await this.produtoRepository.getProdutoById(
            id,
        );

        if (!doesProdutoExists) {
            throw new Error("Produto não encontrado");
        }

        this.produtoRepository.deleteProduto(id);
    }
}
