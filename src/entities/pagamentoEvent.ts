import { AssertionConcern } from "utils/assertionConcern";

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

        this.validateEntity();
    }

    public validateEntity(): void {
        AssertionConcern.assertArgumentNotEmpty(
            this.pedidoId,
            "pedidoId is required",
        );
        AssertionConcern.assertArgumentIsObjectId(
            this.pedidoId,
            "pedidoId must be a valid ObjectId",
        );
        AssertionConcern.assertArgumentNotEmpty(
            this.pedidoId,
            "status is required",
        );
        AssertionConcern.assertArgumentIsValid(
            this.tipo,
            Object.values(PagamentoEventTipoEnum),
            `status must be one of ${Object.values(PagamentoEventTipoEnum)}`,
        );
    }
}
