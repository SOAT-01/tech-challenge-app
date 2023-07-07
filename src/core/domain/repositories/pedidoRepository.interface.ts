import { Pedido } from "@domain/entities/pedido";
import { PedidoDTO } from "@useCases/pedido/dto";

export interface PedidoRepository {
    getAll(filters?: Partial<Pedido>): Promise<Pedido[]>;
    getById(id: string): Promise<Pedido>;
    create(pedido: PedidoDTO): Promise<Pedido>;
    update(
        id: string,
        pedido: Omit<Partial<Pedido>, "id" | "cliente">,
    ): Promise<Pedido>;
    delete(id: string): Promise<void>;
}
