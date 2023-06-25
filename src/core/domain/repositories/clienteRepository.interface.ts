import { Cliente } from "@domain/entities/cliente";

export interface ClienteRepository {
    create(produto: Cliente): Promise<Cliente>;
    getByEmail(email: string): Promise<Cliente>;
    getByCpf(cpf: string): Promise<Cliente>;
    checkDuplicate(args: { email: string; cpf?: string }): Promise<boolean>;
}
