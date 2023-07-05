import { Pedido } from "@domain/entities/pedido";

export interface IPedidoUseCase {
    getAll(): Promise<Pedido[]>;
    getById(id: string): Promise<Pedido>;
    create(pedido: Pedido): Promise<Pedido>;
    update(id: string, pedido: Omit<Partial<Pedido>, "id">): Promise<Pedido>;
    delete(id: string): Promise<void>;
}
