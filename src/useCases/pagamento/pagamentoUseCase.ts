import { PagamentoGateway } from "interfaces/gateways/pagamentoGateway.interface";
import { ResourceNotFoundError } from "utils/errors/resourceNotFoundError";
import { PagamentoMapper } from "adapters/mappers";
import { IPagamentoUseCase } from "./pagamento.interface";
import { PagamentoDTO } from "./dto";
import { AssertionConcern } from "utils/assertionConcern";

export class PagamentoUseCase implements IPagamentoUseCase {
    constructor(private readonly pagamentoGateway: PagamentoGateway) {}

    public async create(pagamento: PagamentoDTO): Promise<PagamentoDTO> {
        if (pagamento.status) {
            throw new Error("Não é necessário informar o status");
        }

        const newPagamento = PagamentoMapper.toDomain(pagamento);

        const result = await this.pagamentoGateway.create(newPagamento);
        return PagamentoMapper.toDTO(result);
    }

    public async getById(id: string): Promise<PagamentoDTO | undefined> {
        const result = await this.pagamentoGateway.getById(id);

        if (!result)
            throw new ResourceNotFoundError("Pagamento não encontrado");

        return PagamentoMapper.toDTO(result);
    }

    public async update(
        id: string,
        status: Pick<PagamentoDTO, "status">,
    ): Promise<PagamentoDTO> {
        AssertionConcern.assertArgumentNotEmpty(
            status,
            "É necessário informar um status",
        );

        const doesPagamentoExists = await this.pagamentoGateway.getById(id);

        if (!doesPagamentoExists) {
            throw new ResourceNotFoundError("Pagamento não encontrado");
        }

        const result = await this.pagamentoGateway.update(id, status);
        return PagamentoMapper.toDTO(result);
    }
}
