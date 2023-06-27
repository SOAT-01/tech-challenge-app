import { Pedido } from "@domain/entities/pedido";

export interface IPedidoUseCase {
    getAll(): Promise<Pedido[]>;
    update(
        id: string,
        pedido: Omit<Partial<Pedido>, "id">,
    ): Promise<Pedido>;
}
