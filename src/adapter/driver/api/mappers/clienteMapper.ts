import { Cliente } from "@domain/entities/cliente";
import { ClienteResponse } from "@apiTypes/cliente";

export class ClienteMapper {
    public static toResponse(cliente: Cliente): ClienteResponse {
        return {
            id: cliente.id,
            nome: cliente.nome,
            email: cliente.email.value,
            cpf: cliente.cpf.value,
        };
    }
}
