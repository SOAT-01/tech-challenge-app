import { PagamentoDTO } from "./dto";

export interface IPagamentoUseCase {
    create(pagamento: PagamentoDTO): Promise<PagamentoDTO>;
    getById(id: string): Promise<PagamentoDTO | undefined>;
    update(
        id: string,
        status: Pick<PagamentoDTO, "status">,
    ): Promise<PagamentoDTO>;
}
