import { Cliente } from "@domain/entities/cliente";

export interface ClienteRepository {
    create(produto: Cliente): Promise<Cliente>;
    getByEmail(email: string): Promise<Cliente | undefined>;
    getByCpf(cpf: string): Promise<Cliente | undefined>;
    checkDuplicate(args: { email: string; cpf?: string }): Promise<boolean>;
}
