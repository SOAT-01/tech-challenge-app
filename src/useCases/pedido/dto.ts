import { StatusPedido, Item, StatusPagamento } from "entities/pedido";

export interface PedidoDTO {
    id?: string;
    status?: StatusPedido;
    pagamento?: StatusPagamento;
    valorTotal?: number;
    observacoes?: string;
    itens: Item[];
    clienteId?: string;
    clienteNome?: string;
    clienteEmail?: string;
    clienteCpf?: string;
}
