import { Cliente } from "@domain/entities/cliente";
import { ClienteDTO } from "@useCases/cliente/dto";

export class ClienteMapper {
    public static toResponse(cliente: Cliente): ClienteDTO {
        return {
            id: cliente.id,
            nome: cliente.nome,
            email: cliente.email.value,
            cpf: cliente.cpf.value,
        };
    }
}
