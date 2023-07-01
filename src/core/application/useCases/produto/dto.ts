import { Categoria } from "@domain/entities/produto";

export interface ProdutoDTO {
    id?: string;
    nome: string;
    preco: number;
    categoria: Categoria;
    descricao: string;
    imagem: string;
}
