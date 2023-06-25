import { Cliente } from "@domain/entities/cliente";
import { Cpf, Email } from "@domain/valueObjects";

export interface IClienteUseCase {
    create(produto: Cliente): Promise<Cliente>;
    getByEmail(email: Email): Promise<Cliente>;
    getByCpf(cpf: Cpf): Promise<Cliente>;
}
