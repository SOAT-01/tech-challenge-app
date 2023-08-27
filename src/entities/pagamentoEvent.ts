export enum PagamentoEventTipoEnum {
    Pendente = "pendente",
    Aprovado = "aprovado",
    Recusado = "recusado",
}

export type PagamentoEventTipo = `${PagamentoEventTipoEnum}`;

export type PagamentoEventFields = Pick<PagamentoEvent, "pedidoId" | "tipo">;

export class PagamentoEvent {
    pedidoId: string;
    tipo: PagamentoEventTipo;

    constructor(fields: PagamentoEventFields) {
        this.pedidoId = fields.pedidoId;
        this.tipo = fields.tipo;
    }
}
