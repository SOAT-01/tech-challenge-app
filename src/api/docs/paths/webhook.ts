import { serverError } from "../defaults";

const WebhookFields = {
    pedidoId: {
        type: "string",
    },
    tipo: {
        type: "string",
        enum: ["aprovado", "recusado"],
        default: "aprovado",
    },
};

const RequiredFields = ["pedidoId", "tipo"];

export const WebhookPaths = {
    "/webhook/pagamento/mock": {
        post: {
            tags: ["webhook"],
            summary:
                "Rota que recebe um webhook de atualização do status de pagamento",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                ...WebhookFields,
                            },
                            required: RequiredFields,
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "webhook executado com sucesso",
                    // content: {
                    //     "application/json": {
                    //         schema: {
                    //             type: "array",
                    //             items: {
                    //                 type: "object",
                    //                 properties: {
                    //                     id: {
                    //                         type: "string",
                    //                     },
                    //                     ...WebhookFields,
                    //                 },
                    //                 required: RequiredFields,
                    //             },
                    //         },
                    //     },
                    // },
                },
                500: {
                    ...serverError,
                },
            },
        },
    },
};
