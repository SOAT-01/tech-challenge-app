import { ProdutoModel } from "external/mongo/models";
import { ProdutoMapper } from "adapters/mappers";
import { Produto, CategoriaEnum } from "entities/produto";
import { ProdutoGateway } from "interfaces/gateways/produtoGateway.interface";

export class ProdutoMongoGateway implements ProdutoGateway {
    constructor(private readonly productModel: typeof ProdutoModel) {}

    async create(produto: Produto): Promise<Produto> {
        const result = await this.productModel.create(produto);
        return ProdutoMapper.toDomain(result);
    }

    async getByCategoria(categoria: CategoriaEnum): Promise<Produto[]> {
        const produtosByCategoriaResult = await this.productModel.find({
            categoria: categoria,
            deleted: { $ne: true },
        });

        return produtosByCategoriaResult.map((result) =>
            ProdutoMapper.toDomain(result),
        );
    }

    async getById(id: string): Promise<Produto | undefined> {
        const result = await this.productModel.findOne({
            _id: id,
            deleted: { $ne: true },
        });

        return ProdutoMapper.toDomain(result);
    }

    async getByIds(ids: string[]): Promise<Produto[]> {
        const produtosById = await this.productModel.find({
            _id: { $in: ids },
            deleted: { $ne: true },
        });

        return produtosById;
    }

    async update(id: string, produto: Partial<Produto>): Promise<Produto> {
        const result = await this.productModel.findOneAndUpdate(
            { _id: id },
            produto,
            {
                new: true,
            },
        );

        if (!result) return undefined;

        return ProdutoMapper.toDomain(result);
    }

    async delete(id: string): Promise<void> {
        await this.productModel.findOneAndUpdate(
            { _id: id },
            { deleted: true, deletedAt: new Date() },
        );
    }
}
