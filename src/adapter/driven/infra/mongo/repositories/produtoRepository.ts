import { IProdutoRepository } from "@domain/repositories/produtoRepository.interface";
import { ProdutoModel } from "../models";
import { CategoriaEnum, Produto } from "@domain/entities/produto";

export class ProdutoMongoRepository implements IProdutoRepository {
    private readonly productModel: typeof ProdutoModel;

    constructor(productModel: typeof ProdutoModel) {
        this.productModel = productModel;
    }

    async createProduto(produto: Produto): Promise<Produto> {
        const createdProduto = await this.productModel.create(produto);

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

    async deleteProduto(id: string): Promise<void> {
        await this.productModel.findOneAndUpdate(
            { _id: id },
            { deleted: true, deletedAt: new Date() },
        );
    }
}
