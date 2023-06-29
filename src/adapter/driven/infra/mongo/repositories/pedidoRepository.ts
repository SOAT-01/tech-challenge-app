import { PedidoRepository } from "@domain/repositories/pedidoRepository.interface";
import { Pedido } from "@domain/entities/pedido";
import { PedidoModel } from "../models/Pedido";

export class PedidoMongoRepository implements PedidoRepository {
    private readonly pedidoModel: typeof PedidoModel;

    constructor(pedidoModel: typeof PedidoModel) {
        this.pedidoModel = pedidoModel;
    }

    async getAll(filters?: Partial<Pedido>): Promise<Pedido[]> {
        let filterQuery = { deleted: { $ne: true } };

        if (filters) {
            filterQuery = { ...filterQuery, ...filters };
        }

        const pedidosResult = await this.pedidoModel
            .aggregate([
                {
                    $addFields: {
                        statusOrder: {
                            $switch: {
                                branches: [
                                    {
                                        case: { $eq: ["$status", "recebido"] },
                                        then: 0,
                                    },
                                    {
                                        case: {
                                            $eq: ["$status", "em_preparacao"],
                                        },
                                        then: 1,
                                    },
                                    {
                                        case: { $eq: ["$status", "pronto"] },
                                        then: 2,
                                    },
                                    {
                                        case: {
                                            $eq: ["$status", "finalizado"],
                                        },
                                        then: 3,
                                    },
                                ],
                                default: 4,
                            },
                        },
                    },
                },
                { $match: filterQuery },
            ])
            .sort({ statusOrder: 1, createdAt: 1 });

        return pedidosResult;
    }

    async getById(id: string): Promise<Pedido> {
        const pedidoByIdResult = await this.pedidoModel.findOne({
            _id: id,
            deleted: { $ne: true },
        });

        return pedidoByIdResult;
    }

    async create(pedido: Pedido): Promise<Pedido> {
        const createdPedido = await this.pedidoModel.create(pedido);

        return createdPedido;
    }

    async update(id: string, pedido: Partial<Pedido>): Promise<Pedido> {
        const updatedPedido = await this.pedidoModel.findOneAndUpdate(
            { _id: id },
            pedido,
            {
                new: true,
            },
        );

        return updatedPedido;
    }

    async delete(id: string): Promise<void> {
        await this.pedidoModel.findOneAndDelete({ _id: id });
    }
}
