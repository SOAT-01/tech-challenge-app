import { Pedido, StatusPedidoEnum } from "@domain/entities/pedido";
import { IPedidoUseCase } from "./pedido.interface";
// import { AssertionConcern } from "@domain/base/assertionConcern";
import { IPedidoRepository } from "@domain/repositories/pedidoRepository.interface";

export class PedidoUseCase implements IPedidoUseCase {
    private readonly pedidoRepository: IPedidoRepository;

    constructor(pedidoRepository: IPedidoRepository) {
        this.pedidoRepository = pedidoRepository;
    }

    public async createPedido(pedido: Pedido): Promise<Pedido> {
        if (pedido.status !== StatusPedidoEnum.Recebido) {
            throw new Error("Não é necessário informar o status");
        }

        return this.pedidoRepository.createPedido(pedido);
    }

    public async getPedidoById(id: string): Promise<Pedido> {
        return this.pedidoRepository.getPedidoById(id);
    }

    public async deletePedido(id: string): Promise<void> {
        // const doesPedidoExists = await this.pedidoRepository.getPedidoById(id);

        // if (!doesPedidoExists) {
        //     throw new Error("Pedido não encontrado");
        // }

        this.pedidoRepository.deletePedido(id);
    }
}
