import { Categoria } from "@domain/interfaces/produto.interface";
import { AssertionConcern } from "../base/assertionConcern";
import { Entity } from "../base/entity.interface";

export class Produto implements Entity {
    id: string;
    nome: string;
    preco: number;
    categoria: Categoria;
    descricao: string;
    imagem: string;

    constructor(
        id: string,
        nome: string,
        preco: number,
        categoria: Categoria,
        descricao: string,
        imagem: string,
    ) {
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
        AssertionConcern.assertArgumentNotEmpty(
            this.categoria,
            "Categoria is required",
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
