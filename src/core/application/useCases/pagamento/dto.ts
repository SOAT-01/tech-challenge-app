import { StatusPagamento } from "@domain/entities/pagamento";

export interface PagamentoDTO {
    id?: string;
    status: StatusPagamento;
}
