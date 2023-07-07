import { Cliente } from "@domain/entities/cliente";
import { Cpf, Email } from "@domain/valueObjects";
import { ClienteDTO } from "@useCases/cliente/dto";

export class ClienteMapper {
    public static toDomain(dto: ClienteDTO): Cliente {
        return new Cliente({
            id: dto?.id,
            nome: dto.nome,
            email: Email.create(dto.email),
            cpf: Cpf.create(dto.cpf),
        });
    }

    public static toDTO(cliente: Cliente): ClienteDTO {
        return {
            id: cliente.id,
            nome: cliente.nome,
            email: cliente.email.value,
            cpf: cliente.cpf.value,
        };
    }
}
