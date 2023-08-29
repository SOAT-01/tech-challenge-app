import { StatusPedido, Item } from "entities/pedido";
import { StatusPagamento } from "entities/pagamento";

export interface PedidoDTO {
    id?: string;
    status?: StatusPedido;
    pagamento?: StatusPagamento;
    valorTotal?: number;
    observacoes?: string;
    itens: Item[];
    clienteId?: string;
}
