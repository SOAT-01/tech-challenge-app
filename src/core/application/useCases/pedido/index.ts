import { Pedido, StatusPedidoEnum } from "@domain/entities/pedido";
import { IPedidoUseCase } from "./pedido.interface";
import { AssertionConcern } from "@domain/base/assertionConcern";
import { PedidoRepository } from "@domain/repositories/pedidoRepository.interface";
import { ProdutoRepository } from "@domain/repositories/produtoRepository.interface";
import { ValorTotal } from "@domain/valueObjects/valorTotal";

export class PedidoUseCase implements IPedidoUseCase {
    private readonly pedidoRepository: PedidoRepository;
    private readonly produtoRepository: ProdutoRepository;

    constructor(
        pedidoRepository: PedidoRepository,
        produtoRepository: ProdutoRepository,
    ) {
        this.pedidoRepository = pedidoRepository;
        this.produtoRepository = produtoRepository;
    }

    public async getAll(filters?: Partial<Pedido>): Promise<Pedido[]> {
        return this.pedidoRepository.getAll(filters);
    }

    public async getById(id: string): Promise<Pedido> {
        return this.pedidoRepository.getById(id);
    }

    public async create(pedido: Pedido): Promise<Pedido> {
        const ids = pedido.itens.map((item) => item.produtoId);

        const itensPedido = await this.produtoRepository.getByIds(ids);

        const itensComPreco = pedido.itens.map((item) => ({
            ...item,
            preco: itensPedido.find((produto) => produto.id === item.produtoId)
                .preco,
        }));

        const valorTotal = ValorTotal.create(itensComPreco);

        if (pedido.status && pedido.status !== StatusPedidoEnum.Recebido) {
            throw new Error("Não é necessário informar o status");
        }

        return this.pedidoRepository.create(
            new Pedido({
                ...pedido,
                valorTotal: valorTotal.value,
            }),
        );
    }

    public async update(
        id: string,
        pedido: Omit<Partial<Pedido>, "id">,
    ): Promise<Pedido> {
        AssertionConcern.assertArgumentNotEmpty(pedido, "Pedido is required");

        const doesPedidoExists = await this.pedidoRepository.getById(id);

        if (!doesPedidoExists) {
            throw new Error("Pedido não encontrado");
        }

        return this.pedidoRepository.update(id, pedido);
    }
}
