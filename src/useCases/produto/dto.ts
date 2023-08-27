import { Categoria } from "entities/produto";

export interface ProdutoDTO {
    id?: string;
    nome: string;
    preco: number;
    categoria: Categoria;
    descricao: string;
    imagem: string;
}
