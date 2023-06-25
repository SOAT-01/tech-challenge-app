import { AssertionConcern } from "../base/assertionConcern";
import { Entity } from "../base/entity.interface";
import { Produto } from "./produto";

export enum StatusPedidoEnum {
    Recebido = "recebido",
    Em_preparacao = "em_preparacao",
    Pronto = "pronto",
    Finalizado = "finalizado",
}

export type StatusPedido = `${StatusPedidoEnum}`;

export interface Item {
    produto: Produto;
    quantidade: number;
}

export class Pedido implements Entity {
    id: string;
    status: StatusPedido;
    valorTotal: number; // float
    // cliente?: Cliente; // user
    cliente?: string;
    itens: Item[];
    observacoes?: string;

    constructor({
        id,
        status,
        valorTotal,
        cliente,
        itens,
        observacoes,
    }: {
        id: string;
        status: StatusPedido;
        valorTotal: number;
        // cliente?: Cliente;
        cliente?: string;
        itens: Item[];
        observacoes?: string;
    }) {
        this.id = id;
        this.status = status || StatusPedidoEnum.Recebido;
        this.valorTotal = valorTotal;
        this.cliente = cliente;
        this.itens = itens;
        this.observacoes = observacoes;

        this.validateEntity();
    }

    public validateEntity(): void {
        // AssertionConcern.assertArgumentNotEmpty(this.id, "Id is required");
        AssertionConcern.assertArgumentNotEmpty(
            this.status,
            "Status is required",
        );
        AssertionConcern.assertArgumentNotEmpty(
            this.valorTotal,
            "Valor total is required",
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
