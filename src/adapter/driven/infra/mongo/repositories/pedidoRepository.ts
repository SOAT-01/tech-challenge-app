import { IPedidoRepository } from "@domain/repositories/pedidoRepository.interface";
import PedidoModel from "../models/Pedido";
import { Pedido, StatusPedidoEnum } from "@domain/entities/pedido";

export class PedidoMongoRepository implements IPedidoRepository {
    private readonly pedidoModel: typeof PedidoModel;

    constructor(pedidoModel: typeof PedidoModel) { 
        this.pedidoModel = pedidoModel;
    }

    async getPedidos(): Promise<Pedido[]> {
  
      const pedidosResult = await this.pedidoModel
        .aggregate([{
          $addFields: {
            statusOrder: {
              $switch: {
                branches: [
                  { case: { $eq: ["$status", "recebido"]}, then: 0 },
                  { case: { $eq: ["$status", "em_preparacao"]}, then: 1 },
                  { case: { $eq: ["$status", "pronto"]}, then: 2 },
                  { case: { $eq: ["$status", "finalizado"]}, then: 3 },
                ],
                default: 4,
              }
            }
          }
        }])
        .sort({ statusOrder: 1, createdAt: 1  })

      return pedidosResult;
    }

    async getPedidoById(id: string): Promise<Pedido> {
        const pedidoByIdResult = await this.pedidoModel.findOne({
            _id: id,
            deleted: { $ne: true },
        });

        return pedidoByIdResult;
    }

    async updatePedido(
        id: string,
        pedido: Partial<Pedido>,
    ): Promise<Pedido> {
        const updatedPedido = await this.pedidoModel.findOneAndUpdate(
            { _id: id },
            pedido,
            {
                new: true,
            },
        );

        return updatedPedido;
    }
}
