export enum CategoriaEnum {
    Lanche = "lanche",
    Bebida = "bebida",
    Acompanhamento = "acompanhamento",
    Sobremesa = "sobremesa",
}

export type Categoria = `${CategoriaEnum}`;

export interface Produto {
    id: string;
    nome: string;
    preco: number;
    categoria: Categoria;
    descricao: string;
    imagem: string;
}
