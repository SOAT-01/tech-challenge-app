import { serverError, unprocessableEntity } from "../defaults";

const PedidoFields = {
    status: {
        type: "string",
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
            summary: "Rota para cadastrar um pedido",
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
