import { serverError, unprocessableEntity } from "../defaults";

const ProdutoFields = {
    nome: {
        type: "string",
        default: "X-Bacon",
    },
    preco: {
        type: "number",
        default: 10,
    },
    categoria: {
        type: "string",
        default: "lanche",
    },
    descricao: {
        type: "string",
        default: "Pão, hambúrguer, queijo, bacon, alface e tomate",
    },
    imagem: {
        type: "string",
        default: "https://example.com/image.png",
    },
};

const RequiredFields = ["nome", "preco", "categoria", "descricao", "imagem"];

export const ProdutoPaths = {
    "/produto/{categoria}": {
        get: {
            tags: ["produto"],
            summary: "Rota para encontrar produtos por categoria",
            parameters: [
                {
                    in: "path",
                    name: "categoria",
                    description: "categoria de produtos a serem encontrados",
                    required: true,
                    schema: {
                        type: "string",
                    },
                },
            ],
            responses: {
                200: {
                    description: "produtos encontrados",
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
                                        ...ProdutoFields,
                                    },
                                    required: RequiredFields,
                                },
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
    "/produto": {
        post: {
            tags: ["produto"],
            summary: "Rota para cadastrar um produto",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                ...ProdutoFields,
                            },
                            required: RequiredFields,
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: "Produto cadastrado",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    id: {
                                        type: "string",
                                    },
                                    ...ProdutoFields,
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
    "/produto/{id}": {
        patch: {
            tags: ["produto"],
            summary: "Rota para atualizar um produto",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "id do produto a ser atualizado",
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
                                ...ProdutoFields,
                            },
                            required: RequiredFields,
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: "Produto atualizado",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    id: {
                                        type: "string",
                                    },
                                    ...ProdutoFields,
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
            tags: ["produto"],
            summary: "Rota para deletar um produto",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "id do produto a ser deletado",
                    required: true,
                    schema: {
                        type: "string",
                    },
                },
            ],
            responses: {
                200: {
                    description: "produto deletado",
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
