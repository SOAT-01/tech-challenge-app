import { PagamentoEvent } from "entities/pagamentoEvent";

export interface PagamentoGateway {
    getPagamentoEvent(id: string): Promise<PagamentoEvent>;
}
