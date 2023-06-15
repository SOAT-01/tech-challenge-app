import ProdutoModel from "../mongo/Produto";
import { ProdutoRepository } from "@domain/repositories/produtoRepository";
import { Produto } from "@domain/entities/produto";

export class SystemProdutoRepository implements ProdutoRepository {
    private readonly productModel: typeof ProdutoModel;

    constructor(productModel: typeof ProdutoModel) {
        this.productModel = productModel;
    }

    async createProduto(produto: Produto): Promise<Produto> {
        const createdProduto = await this.productModel.create({
            nome: produto.nome,
            preco: produto.preco,
            categoria: produto.categoria,
            descricao: produto.descricao,
            imagem: produto.imagem,
        });

        return new Produto(createdProduto);
    }
}
