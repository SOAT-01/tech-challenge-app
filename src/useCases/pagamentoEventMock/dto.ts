import { PagamentoEventTipo } from "entities/pagamentoEvent";

export interface PagamentoEventDTO {
    pedidoId: string;
    tipo: PagamentoEventTipo;
}
