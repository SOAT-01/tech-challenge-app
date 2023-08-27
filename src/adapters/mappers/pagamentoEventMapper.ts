import { PagamentoEvent } from "entities/pagamentoEvent";
import { PagamentoEventDTO } from "useCases";

export class PagamentoEventMapper {
    public static toDomain(dto: PagamentoEventDTO): PagamentoEvent {
        return new PagamentoEvent({
            pedidoId: dto.pedidoId,
            tipo: dto.tipo,
        });
    }
}
