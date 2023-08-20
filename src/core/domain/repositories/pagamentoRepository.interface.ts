import { Pagamento } from "@domain/entities/pagamento";

export interface PagamentoRepository {
    create(pagamento: Pagamento): Promise<Pagamento>;
    getById(id: string): Promise<Pagamento | undefined>;
    update(id: string, status: Pick<Pagamento, "status">): Promise<Pagamento>;
}
