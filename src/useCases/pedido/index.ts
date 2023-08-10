import { IPedidoUseCase } from "./pedido.interface";
import { PedidoDTO } from "./dto";
import { PedidoGateway } from "@interfaces/gateways/pedidoGateway.interface";
import { ProdutoGateway } from "@interfaces/gateways/produtoGateway.interface";
import { StatusPedidoEnum } from "@entities/pedido";
import { ValorTotal } from "@valueObjects/valorTotal";
import { AssertionConcern } from "base/assertionConcern";
import { PedidoMapper } from "core/application/mappers";
import { ResourceNotFoundError } from "@utils/errors/resourceNotFoundError";

export class PedidoUseCase implements IPedidoUseCase {
    constructor(
        private readonly pedidoGateway: PedidoGateway,
        private readonly produtoGateway: ProdutoGateway,
    ) {}

    public async getAll(): Promise<PedidoDTO[]> {
        const results = await this.pedidoGateway.getAll();

        return results.map((result) => PedidoMapper.toDTO(result));
    }

    public async getById(id: string): Promise<PedidoDTO> {
        const result = await this.pedidoGateway.getById(id);

        if (!result) throw new ResourceNotFoundError("Pedido não encontrado");

        return PedidoMapper.toDTO(result);
    }

    public async create(pedido: PedidoDTO): Promise<PedidoDTO> {
        if (
            pedido.status &&
            pedido.status !== StatusPedidoEnum.Pagamento_pendente
        ) {
            throw new Error("Não é necessário informar o status");
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

        const result = await this.pedidoGateway.create(newPedido);
        return PedidoMapper.toDTO(result);
    }

    public async update(
        id: string,
        pedido: Omit<Partial<PedidoDTO>, "id" | "cliente">,
    ): Promise<PedidoDTO> {
        AssertionConcern.assertArgumentNotEmpty(pedido, "Pedido is required");

        const doesPedidoExists = await this.pedidoGateway.getById(id);

        if (!doesPedidoExists) {
            throw new ResourceNotFoundError("Pedido não encontrado");
        }

        const result = await this.pedidoGateway.update(id, pedido);
        return PedidoMapper.toDTO(result);
    }

    public async updatePaymentStatus(id: string): Promise<PedidoDTO> {
        const pedidoToUpdateStatus = await this.pedidoGateway.getById(id);

        if (!pedidoToUpdateStatus) {
            throw new ResourceNotFoundError("Pedido não encontrado");
        }
        if (
            pedidoToUpdateStatus.status !== StatusPedidoEnum.Pagamento_pendente
        ) {
            throw new Error("Pedido já foi pago");
        }

        const result = await this.pedidoGateway.update(id, {
            status: StatusPedidoEnum.Recebido,
        });
        return PedidoMapper.toDTO(result);
    }
}
