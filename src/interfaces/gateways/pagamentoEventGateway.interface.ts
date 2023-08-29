import { PagamentoEvent } from "entities/pagamentoEvent";

export interface PagamentoEventGateway {
    getPagamentoEvent(id: string): Promise<PagamentoEvent>;
}
