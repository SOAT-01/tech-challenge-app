import { Pedido } from "@domain/entities/pedido";

export interface IPedidoRepository {
    createPedido(pedido: Pedido): Promise<Pedido>;
    getPedidoById(id: string): Promise<Pedido>;
    deletePedido(id: string): Promise<void>;
}
