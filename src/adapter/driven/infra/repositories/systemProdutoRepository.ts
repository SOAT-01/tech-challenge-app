import ProdutoModel from "../mongo/models/Produto";
import { ProdutoRepository } from "@domain/repositories/produtoRepository";
import { CategoriaEnum, Produto } from "@domain/entities/produto";

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

        return createdProduto;
    }

    async getProdutoByCategoria(categoria: CategoriaEnum): Promise<Produto[]> {
        const produtosByCategoriaResult = await this.productModel.find({
            categoria: categoria,
            deleted: { $ne: true },
        });

        return produtosByCategoriaResult;
    }

    async getProdutoById(id: string): Promise<Produto> {
        const produtoByIdResult = await this.productModel.findOne({
            _id: id,
            deleted: { $ne: true },
        });

        return produtoByIdResult;
    }

    async updateProduto(
        id: string,
        produto: Partial<Produto>,
    ): Promise<Produto> {
        const updatedProduto = await this.productModel.findOneAndUpdate(
            { _id: id },
            produto,
            {
                new: true,
            },
        );

        return updatedProduto;
    }
}
