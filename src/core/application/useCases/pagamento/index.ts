import { PagamentoRepository } from "@domain/repositories/pagamentoRepository.interface";
import { ResourceNotFoundError } from "@domain/errors/resourceNotFoundError";
import { PagamentoMapper } from "@mappers/pagamentoMapper";
import { IPagamentoUseCase } from "./pagamento.interface";
import { PagamentoDTO } from "./dto";
import { AssertionConcern } from "@domain/base/assertionConcern";

export class PagamentoUseCase implements IPagamentoUseCase {
    constructor(private readonly pagamentoRepository: PagamentoRepository) {}

    public async create(pagamento: PagamentoDTO): Promise<PagamentoDTO> {
        if (pagamento.status) {
            throw new Error("Não é necessário informar o status");
        }

        const newPagamento = PagamentoMapper.toDomain(pagamento);

        const result = await this.pagamentoRepository.create(newPagamento);
        return PagamentoMapper.toDTO(result);
    }

    public async getById(id: string): Promise<PagamentoDTO | undefined> {
        const result = await this.pagamentoRepository.getById(id);

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

        const doesPagamentoExists = await this.pagamentoRepository.getById(id);

        if (!doesPagamentoExists) {
            throw new ResourceNotFoundError("Pagamento não encontrado");
        }

        const result = await this.pagamentoRepository.update(id, status);
        return PagamentoMapper.toDTO(result);
    }
}
