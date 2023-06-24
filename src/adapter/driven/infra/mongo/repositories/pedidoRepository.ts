import { IPedidoRepository } from "@domain/repositories/pedidoRepository.interface";
import PedidoModel from "../models/Pedido";
import { Pedido } from "@domain/entities/pedido";

export class PedidoMongoRepository implements IPedidoRepository {
    private readonly pedidoModel: typeof PedidoModel;

    constructor(pedidoModel: typeof PedidoModel) {
        this.pedidoModel = pedidoModel;
    }

    async createPedido(pedido: Pedido): Promise<Pedido> {
        const createdPedido = await this.pedidoModel.create(pedido);

        return createdPedido;
    }

    async getPedidoById(id: string): Promise<Pedido> {
        const pedidoByIdResult = await this.pedidoModel.findOne({
            _id: id,
            // deleted: { $ne: true },
        });

        return pedidoByIdResult;
    }

    async deletePedido(id: string): Promise<void> {
        await this.pedidoModel.findOneAndDelete({ _id: id });
    }
}
