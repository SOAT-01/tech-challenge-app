import { IPedidoUseCase } from "./pedido.interface";
import { Pedido } from "@domain/entities/pedido";
import { AssertionConcern } from "@domain/base/assertionConcern";
import { IPedidoRepository } from "@domain/repositories/pedidoRepository.interface";

export class PedidoUseCase implements IPedidoUseCase {
    constructor(private readonly pedidoRepository: IPedidoRepository) {}

    getAll(filters?: Partial<Pedido>): Promise<Pedido[]> {
        return this.pedidoRepository.getAll(filters);
    }

    async update(
        id: string,
        pedido: Omit<Partial<Pedido>, "id">,
    ): Promise<Pedido> {
        AssertionConcern.assertArgumentNotEmpty(pedido, "Pedido is required");

        const doesPedidoExists = await this.pedidoRepository.getById(id);

        if (!doesPedidoExists) {
            throw new Error("Pedido não encontrado");
        }

        return this.pedidoRepository.update(id, pedido);
    }
}
