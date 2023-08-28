import { ClientePaths } from "./cliente";
import { ProdutoPaths } from "./produto";
import { PedidoPaths } from "./pedido";
import { WebhookPaths } from "./webhook";

export const ApiPaths = {
    ...ClientePaths,
    ...ProdutoPaths,
    ...PedidoPaths,
    ...WebhookPaths,
};
