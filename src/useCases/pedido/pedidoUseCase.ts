import { PedidoMapper } from "adapters/mappers";
import { StatusPagamentoEnum, StatusPedidoEnum } from "entities/pedido";
import { PedidoGateway } from "interfaces/gateways/pedidoGateway.interface";
import { ProdutoGateway } from "interfaces/gateways/produtoGateway.interface";
import { AssertionConcern } from "utils/assertionConcern";
import { ResourceNotFoundError } from "utils/errors/resourceNotFoundError";
import { ValorTotal } from "valueObjects";
import { PedidoDTO } from "./dto";
import { IPedidoUseCase } from "./pedido.interface";
import { BadError } from "utils/errors/badError";

export class PedidoUseCase implements IPedidoUseCase {
    constructor(
        private readonly pedidoGateway: PedidoGateway,
        private readonly produtoGateway: ProdutoGateway,
    ) {}

    public async getAll(): Promise<PedidoDTO[]> {
        const results = await this.pedidoGateway.getAll();

        return results.map((result) => PedidoMapper.toDTO(result));
    }

    public async getAllOrderedByStatus(): Promise<PedidoDTO[]> {
        const results = await this.pedidoGateway.getAllOrderedByStatus();

        return results.map((result) => PedidoMapper.toDTO(result));
    }

    public async getById(id: string): Promise<PedidoDTO> {
        const result = await this.pedidoGateway.getById(id);

        if (!result) throw new ResourceNotFoundError("Pedido não encontrado");

        return PedidoMapper.toDTO(result);
    }

    public async getPaymentStatus(id: string): Promise<PedidoDTO> {
        const result = await this.pedidoGateway.getById(id);

        if (!result) throw new ResourceNotFoundError("Pedido não encontrado");

        return PedidoMapper.toDTO(result);
    }

    public async checkout(pedido: PedidoDTO): Promise<PedidoDTO> {
        if (pedido.status && pedido.status !== StatusPedidoEnum.Recebido) {
            throw new Error("Não é necessário informar o status");
        }

        if (
            pedido.pagamento &&
            pedido.pagamento !== StatusPagamentoEnum.Pagamento_pendente
        ) {
            throw new Error("Não é necessário informar o status de pagamento");
        }

        const ids = pedido.itens.map((item) => item.produtoId);

        const itensPedido = await this.produtoGateway.getByIds(ids);

        const itensComPreco = pedido.itens.map((item) => ({
            ...item,
            preco: itensPedido.find((produto) => produto.id === item.produtoId)
                .preco,
        }));

        const valorTotal = ValorTotal.create(itensComPreco);

        const newPedido = {
            ...pedido,
            valorTotal: valorTotal.value,
            itens: itensComPreco,
        };

        const result = await this.pedidoGateway.checkout(newPedido);
        return PedidoMapper.toDTO(result);
    }

    public async update(
        id: string,
        pedido: Omit<Partial<PedidoDTO>, "id" | "cliente">,
    ): Promise<PedidoDTO> {
        AssertionConcern.assertArgumentNotEmpty(pedido, "Pedido is required");

        if (pedido.status) {
            throw new BadError("Não é possível alterar o status por essa rota");
        }

        if (pedido.pagamento) {
            throw new BadError(
                "Não é possível alterar o status de pagamento por essa rota",
            );
        }

        const doesPedidoExists = await this.pedidoGateway.getById(id);

        if (!doesPedidoExists) {
            throw new ResourceNotFoundError("Pedido não encontrado");
        }

        const result = await this.pedidoGateway.update(id, pedido);
        return PedidoMapper.toDTO(result);
    }

    public async updateStatus(
        id: string,
        status: StatusPedidoEnum,
    ): Promise<PedidoDTO> {
        const pedidoToUpdateStatus = await this.pedidoGateway.getById(id);
        const statusOrder = Object.values(StatusPedidoEnum);
        const expectedStatus = statusOrder.indexOf(status);

        AssertionConcern.assertArgumentNotEmpty(
            status,
            "É necessário informar o status",
        );
        AssertionConcern.assertArgumentIsValid(
            status,
            statusOrder,
            "É necessário informar um status válido",
        );

        if (!pedidoToUpdateStatus) {
            throw new ResourceNotFoundError("Pedido não encontrado");
        }

        if (pedidoToUpdateStatus.status === StatusPedidoEnum.Finalizado) {
            throw new BadError(
                "Não é possível alterar o status pois o pedido já está finalizado!",
            );
        }

        if (
            pedidoToUpdateStatus.pagamento !==
            StatusPagamentoEnum.Pagamento_aprovado
        ) {
            throw new BadError(
                "Não é possível alterar o status pois o pagamento ainda não foi aprovado!",
            );
        }

        const currentStatus = statusOrder.indexOf(
            pedidoToUpdateStatus.status as StatusPedidoEnum,
        );

        if (expectedStatus - 1 !== currentStatus) {
            throw new BadError(
                `Status inválido, o próximo status válido para esse pedido é: ${
                    statusOrder[currentStatus + 1]
                }`,
            );
        }

        const result = await this.pedidoGateway.updateStatus(id, status);
        return PedidoMapper.toDTO(result);
    }

    public async updatePaymentStatus(id: string): Promise<PedidoDTO> {
        const pedidoToUpdateStatus = await this.pedidoGateway.getById(id);

        if (!pedidoToUpdateStatus) {
            throw new ResourceNotFoundError("Pedido não encontrado");
        }
        if (
            pedidoToUpdateStatus.pagamento !==
            StatusPagamentoEnum.Pagamento_pendente
        ) {
            throw new Error("Pedido já foi pago");
        }

        const result = await this.pedidoGateway.update(id, {
            status: StatusPedidoEnum.Recebido,
        });
        return PedidoMapper.toDTO(result);
    }
}
