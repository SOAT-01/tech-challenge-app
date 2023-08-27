import { Pagamento } from "entities/pagamento";

export interface PagamentoGateway {
    create(pagamento: Pagamento): Promise<Pagamento>;
    getById(id: string): Promise<Pagamento | undefined>;
    update(id: string, status: Pick<Pagamento, "status">): Promise<Pagamento>;
}
