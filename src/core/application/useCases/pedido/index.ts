import { IPedidoUseCase } from "./pedido.interface";
import { Pedido } from "@domain/entities/pedido";
import { AssertionConcern } from "@domain/base/assertionConcern";
import { IPedidoRepository } from "@domain/repositories/pedidoRepository.interface";

export class PedidoUseCase implements IPedidoUseCase {
    private readonly pedidoRepository: IPedidoRepository;

    constructor(produtoRepository: IPedidoRepository) {
        this.pedidoRepository = produtoRepository;
    }

    getPedidos(filters?: Partial<Pedido>): Promise<Pedido[]> {
        return this.pedidoRepository.getPedidos(filters);
    }

    async updatePedido(id: string, pedido: Omit<Partial<Pedido>, "id">): Promise<Pedido> {
        AssertionConcern.assertArgumentNotEmpty(pedido, "Pedido is required");

        const doesPedidoExists = await this.pedidoRepository.getPedidoById(
            id,
        );

        if (!doesPedidoExists) {
            throw new Error("Pedido não encontrado");
        }

        return this.pedidoRepository.updatePedido(id, pedido);
    }
}
