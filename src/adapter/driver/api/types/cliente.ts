// ? Maybe rename to a more general name
// ? Like HttpCliente or prefix with driver ApiCliente
export interface ClienteResponse {
    id: string;
    nome: string;
    email: string;
    cpf: string;
}

export type CreateClienteRequestBody = Pick<
    ClienteResponse,
    "nome" | "email" | "cpf"
>;
