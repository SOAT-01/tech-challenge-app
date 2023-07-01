export const unprocessableEntity = {
    description: "Requisição inválida",
    content: {
        "application/json": {
            schema: {
                type: "object",
                properties: {
                    code: {
                        type: "number",
                    },
                    name: {
                        type: "string",
                    },
                    message: {
                        type: "string",
                    },
                },
            },
        },
    },
};
