import { StatusPagamentoEnum, StatusPedidoEnum } from "entities/pedido";
import { serverError, unprocessableEntity } from "../defaults";

const StatusEnum = Object.values(StatusPedidoEnum);
const PagamentoEnum = Object.values(StatusPagamentoEnum);

const PedidoFields = {
    status: {
        type: "string",
        enum: StatusEnum,
    },
    pagamento: {
        type: "string",
        enum: PagamentoEnum,
    },
    valorTotal: {
        type: "number",
    },
    clienteId: {
        type: "string",
    },
    itens: {
        type: "array",
        items: {
            type: "object",
            properties: {
                produtoId: { type: "string" },
                quantidade: { type: "number" },
                preco: { type: "number" },
            },
        },
    },
    observacoes: {
        type: "string",
    },
};

const RequiredFields = ["status", "valorTotal", "itens"];

export const PedidoPaths = {
    "/pedido/ordered-by-status": {
        get: {
            tags: ["pedido"],
            summary:
                "Rota para listar todos os pedidos ordenados por status e sem o status finalizado",
            responses: {
                200: {
                    description: "pedidos encontrados",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        id: {
                                            type: "string",
                                        },
                                        ...PedidoFields,
                                    },
                                },
                            },
                        },
                    },
                },
                500: {
                    ...serverError,
                },
            },
        },
    },
    "/pedido/{id}/payment-status": {
        get: {
            tags: ["pedido"],
            summary: "Rota para obter o status de pagamento de um pedido",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "id do pedido a ser encontrado",
                    required: true,
                    schema: {
                        type: "string",
                    },
                },
            ],
            responses: {
                200: {
                    description: "Pagamento encontrado",
                    content: {
                        "application/json": {
                            schema: {
                                type: "string",
                                example: { pagamento: "pagamento_pendente" },
                            },
                        },
                    },
                },
                422: {
                    ...unprocessableEntity,
                },
                500: {
                    ...serverError,
                },
            },
        },
    },
    "/pedido": {
        get: {
            tags: ["pedido"],
            summary: "Rota para listar todos os pedidos",
            responses: {
                200: {
                    description: "pedidos encontrados",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        id: {
                                            type: "string",
                                        },
                                        ...PedidoFields,
                                    },
                                },
                            },
                        },
                    },
                },
                500: {
                    ...serverError,
                },
            },
        },
        post: {
            tags: ["pedido"],
            summary: "Rota para fazer o checkout (criar) de um pedido",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                ...PedidoFields,
                            },
                            example: {
                                itens: [
                                    {
                                        produtoId: "649cdc20a6f75c45046d7984",
                                        quantidade: 1,
                                    },
                                    {
                                        produtoId: "649cdc4ba6f75c45046d7986",
                                        quantidade: 1,
                                    },
                                ],
                                observacoes: "Sem cebola",
                                clienteId: "649cdaa7a6f75c45046d797d",
                            },
                            required: ["itens"],
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: "Pedido cadastrado",
                    content: {
                        "application/json": {
                            schema: {
                                type: "string",
                                example: { id: "64deb912c3d31615c0af2863" },
                            },
                        },
                    },
                },
                422: {
                    ...unprocessableEntity,
                },
                500: {
                    ...serverError,
                },
            },
        },
    },
    "/pedido/{id}": {
        patch: {
            tags: ["pedido"],
            summary: "Rota para atualizar um pedido",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "id do pedido a ser atualizado",
                    required: true,
                    schema: {
                        type: "string",
                    },
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                ...PedidoFields,
                            },
                            required: RequiredFields,
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: "Pedido atualizado",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    id: {
                                        type: "string",
                                    },
                                    ...PedidoFields,
                                },
                                required: RequiredFields,
                            },
                        },
                    },
                },
                422: {
                    ...unprocessableEntity,
                },
                500: {
                    ...serverError,
                },
            },
        },
    },
    "/pedido/{id}/update-status": {
        patch: {
            tags: ["pedido"],
            summary: "Rota para atualizar o status de um pedido",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "id do pedido a ser atualizado",
                    required: true,
                    schema: {
                        type: "string",
                    },
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                status: {
                                    type: "string",
                                    enum: StatusEnum,
                                    default: "em_preparacao",
                                },
                            },
                            required: "status",
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: "Status do pedido atualizado",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    id: {
                                        type: "string",
                                    },
                                    ...PedidoFields,
                                },
                                required: RequiredFields,
                            },
                        },
                    },
                },
                422: {
                    ...unprocessableEntity,
                },
                500: {
                    ...serverError,
                },
            },
        },
    },
    "/pedido/{id}/payment-checkout": {
        patch: {
            tags: ["pedido"],
            summary: "Rota para atualizar o status de pagamento de um pedido",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "id do pedido a ser atualizado",
                    required: true,
                    schema: {
                        type: "string",
                    },
                },
            ],
            responses: {
                201: {
                    description: "Status de pagamento do pedido atualizado",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    id: {
                                        type: "string",
                                    },
                                    ...PedidoFields,
                                },
                                required: RequiredFields,
                            },
                        },
                    },
                },
                422: {
                    ...unprocessableEntity,
                },
                500: {
                    ...serverError,
                },
            },
        },
    },
};
