import { ApiPaths } from "./paths";

export const SwaggerConfig = {
    openapi: "3.0.0",
    info: {
        title: "fiap-soat1-tech-challenge",
        description:
            "Projeto do curso da pós tech Fiap Arquitetura de Software",
        version: "1.0.0",
    },
    servers: [
        {
            url: "/api",
        },
    ],
    tags: [
        {
            name: "produto",
            description: "Rotas relacionadas a produto",
        },
        {
            name: "cliente",
            description: "Rotas relacionadas a cliente",
        },
        {
            name: "pedido",
            description: "Rotas relacionadas a pedido",
        },
        {
            name: "webhook",
            description: "Rotas relacionadas a webhooks",
        },
    ],
    paths: ApiPaths,
};
