import { ClientePaths } from "./cliente";
import { ProdutoPaths } from "./produto";
import { PedidoPaths } from "./pedido";

export const ApiPaths = {
    ...ClientePaths,
    ...ProdutoPaths,
    ...PedidoPaths,
};
