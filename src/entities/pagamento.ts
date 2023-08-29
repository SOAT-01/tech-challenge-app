import { Entity } from "interfaces/entity.interface";
import { AssertionConcern } from "utils/assertionConcern";

export enum StatusPagamentoEnum {
    // Aprovado = "aprovado",
    // Processando = "processando",
    // Reprovado = "reprovado",
    Pagamento_pendente = "pagamento_pendente",
    Pagamento_aprovado = "pagamento_aprovado",
    Pagamento_nao_autorizado = "pagamento_nao_autorizado",
}

export type StatusPagamento = `${StatusPagamentoEnum}`;

export class Pagamento implements Entity {
    id: string;
    status: StatusPagamento;

    constructor({ id, status }: { id?: string; status?: StatusPagamento }) {
        this.id = id;
        this.status = status || StatusPagamentoEnum.Pagamento_pendente;

        this.validateEntity();
    }

    public validateEntity(): void {
        AssertionConcern.assertArgumentNotEmpty(
            this.status,
            "É necessário informar um status",
        );
        AssertionConcern.assertArgumentIsValid(
            this.status,
            Object.values(StatusPagamentoEnum),
            `Status must be one of ${Object.values(StatusPagamentoEnum)}`,
        );
    }
}
