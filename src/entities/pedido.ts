import { Entity } from "interfaces/entity.interface";
import { AssertionConcern } from "utils/assertionConcern";
import { Cliente } from "./cliente";

export enum StatusPedidoEnum {
    Recebido = "recebido",
    Em_preparacao = "em_preparacao",
    Pronto = "pronto",
    Finalizado = "finalizado",
}

export enum StatusPagamentoEnum {
    Pagamento_pendente = "pagamento_pendente",
    Pagamento_aprovado = "pagamento_aprovado",
    Pagamento_nao_autorizado = "pagamento_nao_autorizado"
}

export type StatusPedido = `${StatusPedidoEnum}`;
export type StatusPagamento = `${StatusPagamentoEnum}`;

export interface Item {
    produtoId: string;
    quantidade: number;
    preco?: number;
}

export class Pedido implements Entity {
    id: string;
    status: StatusPedido;
    pagamento: StatusPagamento;
    valorTotal: number;
    cliente?: Cliente;
    itens: Item[];
    observacoes?: string;

    constructor({
        id,
        status,
        pagamento,
        valorTotal,
        cliente,
        itens,
        observacoes,
    }: {
        id?: string;
        status?: StatusPedido;
        pagamento?: StatusPagamento;
        valorTotal: number;
        cliente?: Cliente;
        itens: Item[];
        observacoes?: string;
    }) {
        this.id = id;
        this.status = status || StatusPedidoEnum.Recebido;
        this.pagamento = pagamento || StatusPagamentoEnum.Pagamento_pendente;
        this.valorTotal = valorTotal;
        this.cliente = cliente || null;
        this.itens = itens;
        this.observacoes = observacoes;

        this.validateEntity();
    }

    public validateEntity(): void {
        AssertionConcern.assertArgumentNotEmpty(
            this.valorTotal,
            "Valor total is required",
        );

        AssertionConcern.assertArgumentIsBiggerThanZero(
            this.valorTotal,
            "Valor total must be bigger than zero",
        );

        AssertionConcern.assertArgumentIsValid(
            this.status,
            Object.values(StatusPedidoEnum),
            `Status must be one of ${Object.values(StatusPedidoEnum)}`,
        );

        AssertionConcern.assertArgumentIsValid(
            this.pagamento,
            Object.values(StatusPagamentoEnum),
            `Status must be one of ${Object.values(StatusPagamentoEnum)}`,
        );

        AssertionConcern.assertArgumentNotEmpty(
            this.itens,
            "At least one Item is required",
        );
    }
}
