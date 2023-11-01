import { ProdutoMapper } from "adapters/mappers";
import { Produto, CategoriaEnum } from "entities/produto";
import { ProdutoGateway } from "interfaces/gateways";
import { PostgresDB } from "external/postgres";
import { ProdutoSchema } from "external/postgres/schemas";
import { and, eq, inArray } from "drizzle-orm";

export class ProdutoPostgresGateway implements ProdutoGateway {
    constructor(
        private readonly postgresDB: typeof PostgresDB,
        private readonly produtoSchema: typeof ProdutoSchema,
    ) {}

    async getByCategoria(categoria: CategoriaEnum): Promise<Produto[]> {
        const produtosByCategoriaResult = await this.postgresDB
            .select()
            .from(this.produtoSchema)
            .where(
                and(
                    eq(this.produtoSchema.categoria, categoria),
                    eq(this.produtoSchema.deleted, false),
                ),
            );

        return produtosByCategoriaResult.map((result) =>
            ProdutoMapper.toDomain({
                id: result.id,
                nome: result.nome,
                preco: Number(result.preco),
                categoria: result.categoria as Produto["categoria"],
                descricao: result.descricao,
                imagem: result.imagem,
            }),
        );
    }

    async getById(id: string): Promise<Produto | undefined> {
        const [result] = await this.postgresDB
            .select()
            .from(this.produtoSchema)
            .where(
                and(
                    eq(this.produtoSchema.id, id),
                    eq(this.produtoSchema.deleted, false),
                ),
            );

        return ProdutoMapper.toDomain({
            id: result.id,
            nome: result.nome,
            preco: Number(result.preco),
            categoria: result.categoria as Produto["categoria"],
            descricao: result.descricao,
            imagem: result.imagem,
        });
    }

    async getByIds(ids: string[]): Promise<Produto[]> {
        const produtosById = await this.postgresDB
            .select()
            .from(this.produtoSchema)
            .where(
                and(
                    inArray(this.produtoSchema.id, ids),
                    eq(this.produtoSchema.deleted, false),
                ),
            );

        return produtosById.map((result) =>
            ProdutoMapper.toDomain({
                id: result.id,
                nome: result.nome,
                preco: Number(result.preco),
                categoria: result.categoria as Produto["categoria"],
                descricao: result.descricao,
                imagem: result.imagem,
            }),
        );
    }

    async create(produto: Produto): Promise<Produto> {
        const [result] = await this.postgresDB
            .insert(this.produtoSchema)
            .values({
                nome: produto.nome,
                preco: produto.preco.toString(10),
                categoria: produto.categoria,
                descricao: produto.descricao,
                imagem: produto.imagem,
            })
            .returning();

        return ProdutoMapper.toDomain({
            id: result.id,
            nome: result.nome,
            preco: Number(result.preco),
            categoria: result.categoria as Produto["categoria"],
            descricao: result.descricao,
            imagem: result.imagem,
        });
    }

    async update(id: string, produto: Partial<Produto>): Promise<Produto> {
        const [result] = await this.postgresDB
            .update(this.produtoSchema)
            .set({
                nome: produto.nome,
                preco: produto.preco.toString(10),
                categoria: produto.categoria,
                descricao: produto.descricao,
                imagem: produto.imagem,
            })
            .where(eq(this.produtoSchema.id, id))
            .returning();

        if (!result) return undefined;

        return ProdutoMapper.toDomain({
            id: result.id,
            nome: result.nome,
            preco: Number(result.preco),
            categoria: result.categoria as Produto["categoria"],
            descricao: result.descricao,
            imagem: result.imagem,
        });
    }

    async delete(id: string): Promise<void> {
        await this.postgresDB
            .delete(this.produtoSchema)
            .where(eq(this.produtoSchema.id, id));
    }
}
