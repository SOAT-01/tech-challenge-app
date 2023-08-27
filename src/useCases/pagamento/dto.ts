import { StatusPagamento } from "entities/pagamento";

export interface PagamentoDTO {
    id?: string;
    status: StatusPagamento;
}
