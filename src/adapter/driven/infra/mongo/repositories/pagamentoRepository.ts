import { Pagamento } from "@domain/entities/pagamento";
import { PagamentoRepository } from "@domain/repositories/pagamentoRepository.interface";
import { PagamentoMapper } from "@mappers/pagamentoMapper";
import { PagamentoModel } from "../models";

export class PagamentoMongoRepository implements PagamentoRepository {
    constructor(private readonly pagamentoModel: typeof PagamentoModel) {}

    public async create(pagamento: Pagamento): Promise<Pagamento> {
        const result = await this.pagamentoModel.create({
            status: pagamento.status,
        });

        return PagamentoMapper.toDomain(result);
    }

    public async getById(id: string): Promise<Pagamento | undefined> {
        const result = await this.pagamentoModel.findOne({
            _id: id,
            deleted: { $ne: true },
        });

        if (!result) return undefined;

        return PagamentoMapper.toDomain(result);
    }

    async update(
        id: string,
        status: Pick<Pagamento, "status">,
    ): Promise<Pagamento> {
        const result = await this.pagamentoModel.findOneAndUpdate(
            { _id: id },
            status,
            {
                new: true,
            },
        );

        if (!result) return undefined;

        return PagamentoMapper.toDomain(result);
    }
}
