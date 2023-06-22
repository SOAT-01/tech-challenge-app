import { Pedido } from "@domain/entities/pedido";

export interface IPedidoUseCase {
    getPedidos(): Promise<Pedido[]>;
    updatePedido(id: string, pedido: Omit<Partial<Pedido>, "id">): Promise<Pedido>;
}
