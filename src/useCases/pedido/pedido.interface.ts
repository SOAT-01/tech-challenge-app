import { PedidoDTO } from "./dto";

export interface IPedidoUseCase {
    getAll(): Promise<PedidoDTO[]>;
    getAllOrderedByStatus(): Promise<PedidoDTO[]>;
    getById(id: string): Promise<PedidoDTO>;
    create(pedido: PedidoDTO): Promise<PedidoDTO>;
    update(
        id: string,
        pedido: Omit<Partial<PedidoDTO>, "id" | "cliente">,
    ): Promise<PedidoDTO>;
}
