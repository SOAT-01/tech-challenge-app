import { ProdutoControllerFactory } from "./produto";
import { ClienteControllerFactory } from "./cliente";
import { PedidoControllerFactory } from "./pedido";
import { HealthControllerFactory } from "./health";
import { PagamentoControllerFactory } from "./pagamento";
import { WebhookControllerFactory } from "./webhook";

export const produtoController = ProdutoControllerFactory.create();
export const clienteController = ClienteControllerFactory.create();
export const pedidoController = PedidoControllerFactory.create();
export const healthController = HealthControllerFactory.create();
export const pagamentoController = PagamentoControllerFactory.create();
export const webhookController = WebhookControllerFactory.create();
