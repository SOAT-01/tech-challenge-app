import { Pagamento } from "entities/pagamento";
import { PagamentoGateway } from "interfaces/gateways/pagamentoGateway.interface";
import { PagamentoMapper } from "adapters/mappers";
import { PagamentoModel } from "external/mongo/models";

export class PagamentoMongoGateway implements PagamentoGateway {
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
            { status: status },
            {
                new: true,
            },
        );

        if (!result) return undefined;

        return PagamentoMapper.toDomain(result);
    }
}
