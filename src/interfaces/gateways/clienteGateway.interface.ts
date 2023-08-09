import { Cliente } from "entities/cliente";

export interface ClienteGateway {
    create(produto: Cliente): Promise<Cliente>;
    getByEmail(email: string): Promise<Cliente | undefined>;
    getByCpf(cpf: string): Promise<Cliente | undefined>;
    checkDuplicate(args: { email: string; cpf?: string }): Promise<boolean>;
}
