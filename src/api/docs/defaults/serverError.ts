export const serverError = {
    description: "Erro no servidor",
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
