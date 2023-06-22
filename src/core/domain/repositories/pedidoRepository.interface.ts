import { Pedido } from "@domain/entities/pedido";

export interface IPedidoRepository {
    getPedidos(): Promise<Pedido[]>;
    getPedidoById(id: string): Promise<Pedido>;
    updatePedido(id: string, pedido: Partial<Pedido>): Promise<Pedido>;
}
