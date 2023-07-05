import { ProdutoRepository } from "@domain/repositories/produtoRepository.interface";
import { CategoriaEnum, Produto } from "@domain/entities/produto";
import { ProdutoModel } from "../models";

export class ProdutoMongoRepository implements ProdutoRepository {
    constructor(private readonly productModel: typeof ProdutoModel) {}

    async create(produto: Produto): Promise<Produto> {
        const createdProduto = await this.productModel.create(produto);
        return new Produto(createdProduto);
    }

    async getByCategoria(categoria: CategoriaEnum): Promise<Produto[]> {
        const produtosByCategoriaResult = await this.productModel.find({
            categoria: categoria,
            deleted: { $ne: true },
        });

        return produtosByCategoriaResult.map(
            (produtosMongo) => new Produto(produtosMongo),
        );
    }

    async getById(id: string): Promise<Produto | undefined> {
        const produtoByIdResult = await this.productModel.findOne({
            _id: id,
            deleted: { $ne: true },
        });

        return new Produto(produtoByIdResult);
    }

    async getByIds(ids: string[]): Promise<Produto[]> {
        const produtosById = await this.productModel.find({
            _id: { $in: ids },
            deleted: { $ne: true },
        });

        return produtosById;
    }

    async update(id: string, produto: Partial<Produto>): Promise<Produto> {
        const updatedProduto = await this.productModel.findOneAndUpdate(
            { _id: id },
            produto,
            {
                new: true,
            },
        );

        if (!updatedProduto) return undefined;

        return new Produto(updatedProduto);
    }

    async delete(id: string): Promise<void> {
        await this.productModel.findOneAndUpdate(
            { _id: id },
            { deleted: true, deletedAt: new Date() },
        );
    }
}
