import { Pedido } from "@domain/entities/pedido";

export interface IPedidoRepository {
    getAll(filters?: Partial<Pedido>): Promise<Pedido[]>;
    getById(id: string): Promise<Pedido>;
    create(pedido: Pedido): Promise<Pedido>;
    update(id: string, pedido: Partial<Pedido>): Promise<Pedido>;
    delete(id: string): Promise<void>;
}
