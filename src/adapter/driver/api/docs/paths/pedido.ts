import { serverError, notFound, unprocessableEntity } from "../defaults";

const PedidoFields = {
    status: {
        type: "string",
    },
    valorTotal: {
        type: "number",
    },
    cliente: {
        type: "string",
    },
    itens: {
        produtoId: { type: "string" },
        quantidade: { type: "number" },
        preco: { type: "number" },
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
                                    required: RequiredFields,
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
                            required: RequiredFields,
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
        delete: {
            tags: ["pedido"],
            summary: "Rota para deletar um pedido",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "id do pedido a ser deletado",
                    required: true,
                    schema: {
                        type: "string",
                    },
                },
            ],
            responses: {
                200: {
                    description: "pedido deletado",
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
