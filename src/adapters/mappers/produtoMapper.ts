import { Produto } from "entities/produto";
import { ProdutoDTO } from "useCases";

export class ProdutoMapper {
    public static toDomain(dto: ProdutoDTO): Produto {
        return new Produto({
            id: dto.id,
            nome: dto.nome,
            preco: dto.preco,
            categoria: dto.categoria,
            descricao: dto.descricao,
            imagem: dto.imagem,
        });
    }

    public static toDTO(produto: Produto): ProdutoDTO {
        return {
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            categoria: produto.categoria,
            descricao: produto.descricao,
            imagem: produto.imagem,
        };
    }
}
