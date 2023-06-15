import { ProdutoUseCase } from "./types";
import { ProdutoRepository } from "@domain/repositories/produtoRepository";
import { CategoriaEnum, Produto } from "@domain/entities/produto";

export class SystemProdutoUseCase implements ProdutoUseCase {
    private readonly produtoRepository: ProdutoRepository;

    constructor(produtoRepository: ProdutoRepository) {
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
}
