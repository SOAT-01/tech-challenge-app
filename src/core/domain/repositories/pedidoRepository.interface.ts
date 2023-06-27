import { Pedido } from "@domain/entities/pedido";

export interface IPedidoRepository {
    getAll(filters?: Partial<Pedido>): Promise<Pedido[]>;
    getById(id: string): Promise<Pedido>;
    update(id: string, pedido: Partial<Pedido>): Promise<Pedido>;
}
