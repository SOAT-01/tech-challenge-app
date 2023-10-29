import { PedidoGateway } from "interfaces/gateways";
import { PagamentoEvent } from "entities/pagamentoEvent";
import { Pedido } from "entities/pedido";
import { ResourceNotFoundError } from "utils/errors/resourceNotFoundError";
import { PagamentoEventMapper } from "adapters/mappers";
import { IPagamentoEventMockUseCase } from "./pagamentoEventMock.interface";
import { PagamentoEventDTO } from "./dto";

export class PagamentoEventMockUseCase implements IPagamentoEventMockUseCase {
    constructor(private readonly pedidoGateway: PedidoGateway) {}

    async handle(data: PagamentoEventDTO): Promise<void> {
        const { pedidoId, tipo } = PagamentoEventMapper.toDomain(data);

        if (tipo === "pendente") {
            return;
        }

        const pedido = await this.pedidoGateway.getById(pedidoId);

        if (!pedido) {
            throw new ResourceNotFoundError("Pedido não encontrado");
        }

        if (pedido.pagamento !== "pagamento_pendente") {
            return;
        }

        await this.pedidoGateway.updateStatusPagamento(
            pedido.id,
            this.parseStatusPagamento(tipo),
        );
    }

    private parseStatusPagamento(
        status: PagamentoEvent["tipo"],
    ): Pedido["pagamento"] {
        switch (status) {
            case "aprovado":
                return "pagamento_aprovado";
            case "recusado":
                return "pagamento_nao_autorizado";
        }
    }
}
