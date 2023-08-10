import { PedidoDTO } from "useCases/pedido/dto";
import { ClienteDTO } from "useCases/cliente/dto";
import { PedidoGateway } from "interfaces/gateways/pedidoGateway.interface";

import { Pedido } from "entities/pedido";
import { PedidoModel } from "external/mongo/models";
import { PedidoMapper } from "adapters/mappers";

export class PedidoMongoGateway implements PedidoGateway {
    constructor(private readonly pedidoModel: typeof PedidoModel) {}

    async getAll(filters?: Partial<Pedido>): Promise<Pedido[]> {
        let filterQuery = { deleted: { $ne: true } };

        if (filters) {
            filterQuery = { ...filterQuery, ...filters };
        }

        const results = await this.pedidoModel
            .aggregate([
                {
                    $match: {
                        status: { $ne: "finalizado" },
                    },
                },
                {
                    $addFields: {
                        statusOrder: {
                            $switch: {
                                branches: [
                                    {
                                        case: { $eq: ["$status", "pronto"] },
                                        then: 0,
                                    },
                                    {
                                        case: {
                                            $eq: ["$status", "em_preparacao"],
                                        },
                                        then: 1,
                                    },
                                    {
                                        case: { $eq: ["$status", "recebido"] },
                                        then: 2,
                                    },
                                ],
                                default: 4,
                            },
                        },
                    },
                },
                {
                    $lookup: {
                        from: "clientes",
                        localField: "cliente",
                        foreignField: "_id",
                        as: "relatedCliente",
                    },
                },
                { $match: filterQuery },
            ])
            .sort({ statusOrder: 1, createdAt: 1 });

        return results.map((result) => {
            const [cliente] = result.relatedCliente;

            return PedidoMapper.toDomain(
                {
                    id: result._id,
                    status: result.status,
                    valorTotal: result.valorTotal,
                    itens: result.itens,
                    observacoes: result.observacoes,
                },
                {
                    id: cliente?._id,
                    nome: cliente?.nome,
                    email: cliente?.email,
                    cpf: cliente?.cpf,
                },
            );
        });
    }

    async getById(id: string): Promise<Pedido> {
        const result = await this.pedidoModel
            .findOne({
                _id: id,
                deleted: { $ne: true },
            })
            .populate<{ cliente: ClienteDTO }>("cliente");

        return PedidoMapper.toDomain(
            {
                id: result.id,
                status: result.status,
                valorTotal: result.valorTotal,
                itens: result.itens,
                observacoes: result.observacoes,
            },
            {
                id: result?.cliente?.id,
                nome: result?.cliente?.nome,
                email: result?.cliente?.email,
                cpf: result?.cliente?.cpf,
            },
        );
    }

    async create(pedido: PedidoDTO): Promise<Pedido> {
        const result = await this.pedidoModel.create({
            valorTotal: pedido.valorTotal,
            itens: pedido.itens,
            observacoes: pedido.observacoes,
            cliente: pedido.clienteId,
        });

        return PedidoMapper.toDomain({
            id: result.id,
            status: result.status,
            valorTotal: result.valorTotal,
            itens: result.itens,
            observacoes: result.observacoes,
        });
    }

    async update(
        id: string,
        pedido: Omit<Partial<Pedido>, "id" | "cliente">,
    ): Promise<Pedido> {
        const result = await this.pedidoModel
            .findOneAndUpdate({ _id: id }, pedido, {
                new: true,
            })
            .populate<{ cliente: ClienteDTO }>("cliente");

        return PedidoMapper.toDomain(
            {
                id: result.id,
                status: result.status,
                valorTotal: result.valorTotal,
                itens: result.itens,
                observacoes: result.observacoes,
            },
            {
                id: result?.cliente?.id,
                nome: result?.cliente?.nome,
                email: result?.cliente?.email,
                cpf: result?.cliente?.cpf,
            },
        );
    }

    async delete(id: string): Promise<void> {
        await this.pedidoModel.findOneAndUpdate(
            { _id: id },
            { deleted: true, deletedAt: new Date() },
        );
    }
}
