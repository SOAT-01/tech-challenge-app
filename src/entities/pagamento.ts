import { Entity } from "interfaces/entity.interface";
// import { AssertionConcern } from "utils/assertionConcern";

export enum StatusPagamentoEnum {
    Aprovado = "aprovado",
    Processando = "processando",
    Reprovado = "reprovado",
}

export type StatusPagamento = `${StatusPagamentoEnum}`;

export class Pagamento implements Entity {
    id: string;
    status: StatusPagamento;

    constructor({ id, status }: { id?: string; status?: StatusPagamento }) {
        this.id = id;
        this.status = status || StatusPagamentoEnum.Processando;

        this.validateEntity();
    }

    public validateEntity(): void {
        // AssertionConcern.assertArgumentIsValid(
        //     this.status,
        //     Object.values(StatusPagamentoEnum),
        //     `Status must be one of ${Object.values(StatusPagamentoEnum)}`,
        // );
    }
}
