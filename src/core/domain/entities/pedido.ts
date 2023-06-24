import { AssertionConcern } from "../base/assertionConcern";
import { Entity } from "../base/entity.interface";
import { Produto } from "./produto";

export interface Item {
    produto: Produto;
    quantidade: number;
}

export class Pedido implements Entity {
    id: string;
    status: "recebido" | "em_preparacao" | "pronto" | "finalizado";
    preco: number; // float
    // cliente?: Cliente; // user
    cliente?: string;
    itens: Item[];

    constructor({
        id,
        status,
        preco,
        cliente,
        itens,
    }: {
        id: string;
        status: "recebido" | "em_preparacao" | "pronto" | "finalizado";
        preco: number;
        // cliente: Cliente;
        cliente: string;
        itens: Item[];
    }) {
        this.id = id;
        this.status = status;
        this.preco = preco;
        this.cliente = cliente;
        this.itens = itens;

        this.validateEntity();
    }

    public validateEntity(): void {
        // AssertionConcern.assertArgumentNotEmpty(this.id, "Id is required");
        AssertionConcern.assertArgumentNotEmpty(
            this.status,
            "Status is required",
        );
        AssertionConcern.assertArgumentNotEmpty(
            this.preco,
            "Preco is required",
        );
        AssertionConcern.assertArgumentNotEmpty(
            this.cliente,
            "Cliente is required",
        );
        AssertionConcern.assertArgumentNotEmpty(
            this.itens,
            "Itens is required",
        );
    }
}
