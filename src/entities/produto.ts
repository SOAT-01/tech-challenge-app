import { Entity } from "interfaces/entity.interface";
import { AssertionConcern } from "utils/assertionConcern";

export enum CategoriaEnum {
    Lanche = "lanche",
    Bebida = "bebida",
    Acompanhamento = "acompanhamento",
    Sobremesa = "sobremesa",
}

export type Categoria = `${CategoriaEnum}`;

export class Produto implements Entity {
    id: string;
    nome: string;
    preco: number;
    categoria: Categoria;
    descricao: string;
    imagem: string;

    constructor({
        id,
        nome,
        preco,
        categoria,
        descricao,
        imagem,
    }: {
        id?: string;
        nome: string;
        preco: number;
        categoria: Categoria;
        descricao: string;
        imagem: string;
    }) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.categoria = categoria;
        this.descricao = descricao;
        this.imagem = imagem;

        this.validateEntity();
    }

    public validateEntity(): void {
        AssertionConcern.assertArgumentNotEmpty(this.nome, "Nome is required");
        AssertionConcern.assertArgumentNotEmpty(
            this.preco,
            "Preço is required",
        );
        AssertionConcern.assertArgumentIsBiggerThanZero(
            this.preco,
            "Preço should have a value bigger than zero",
        );
        AssertionConcern.assertArgumentNotEmpty(
            this.categoria,
            "Categoria is required",
        );
        AssertionConcern.assertArgumentIsValid(
            this.categoria,
            Object.values(CategoriaEnum),
            "Categoria should have a valid value",
        );
        AssertionConcern.assertArgumentNotEmpty(
            this.descricao,
            "Descrição is required",
        );
        AssertionConcern.assertArgumentNotEmpty(
            this.imagem,
            "Imagem is required",
        );
    }
}
