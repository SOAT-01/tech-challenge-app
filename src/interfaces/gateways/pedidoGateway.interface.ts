import { Pedido } from "entities/pedido";
import { PedidoDTO } from "useCases/pedido/dto";

export interface PedidoGateway {
    getAll(filters?: Partial<Pedido>): Promise<Pedido[]>;
    getById(id: string): Promise<Pedido>;
    create(pedido: PedidoDTO): Promise<Pedido>;
    update(
        id: string,
        pedido: Omit<Partial<Pedido>, "id" | "cliente">,
    ): Promise<Pedido>;
}
