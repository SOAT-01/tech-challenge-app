import { Cliente } from "@domain/entities/cliente";

export interface IClienteUseCase {
    create(produto: Cliente): Promise<Cliente>;
    getByEmail(email: string): Promise<Cliente>;
    getByCpf(cpf: string): Promise<Cliente>;
}
