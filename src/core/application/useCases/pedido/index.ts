import { Pedido, StatusPedidoEnum } from "@domain/entities/pedido";
import { IPedidoUseCase } from "./pedido.interface";
import { AssertionConcern } from "@domain/base/assertionConcern";
import { IPedidoRepository } from "@domain/repositories/pedidoRepository.interface";

export class PedidoUseCase implements IPedidoUseCase {
    constructor(private readonly pedidoRepository: IPedidoRepository) {}

    getAll(filters?: Partial<Pedido>): Promise<Pedido[]> {
        return this.pedidoRepository.getAll(filters);
    }

    public async getById(id: string): Promise<Pedido> {
        return this.pedidoRepository.getById(id);
    }

    public async create(pedido: Pedido): Promise<Pedido> {
        if (pedido.status !== StatusPedidoEnum.Recebido) {
            throw new Error("Não é necessário informar o status");
        }

        return this.pedidoRepository.create(pedido);
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

    public async delete(id: string): Promise<void> {
        // const doesPedidoExists = await this.pedidoRepository.getPedidoById(id);

        // if (!doesPedidoExists) {
        //     throw new Error("Pedido não encontrado");
        // }

        this.pedidoRepository.delete(id);
    }
}
