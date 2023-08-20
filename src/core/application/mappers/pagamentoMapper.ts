import { Pagamento } from "@domain/entities/pagamento";
import { PagamentoDTO } from "@useCases/pagamento/dto";

export class PagamentoMapper {
    public static toDomain(dto: PagamentoDTO): Pagamento {
        return new Pagamento({
            id: dto?.id,
            status: dto.status,
        });
    }

    public static toDTO(pagamento: Pagamento): PagamentoDTO {
        return {
            id: pagamento.id,
            status: pagamento.status,
        };
    }
}
