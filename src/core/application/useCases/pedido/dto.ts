import { Item, StatusPedido } from "@domain/entities/pedido";

export interface PedidoDTO {
    id?: string;
    status?: StatusPedido;
    valorTotal?: number;
    observacoes?: string;
    itens: Item[];
    clienteId?: string;
}
