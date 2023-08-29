import { PagamentoEventDTO } from "./dto";

export interface IPagamentoEventMockUseCase {
    handle(data: PagamentoEventDTO): Promise<void>;
}
