import { Cliente } from "@domain/entities/cliente";
import { ClienteDTO } from "./dto";

export interface IClienteUseCase {
    create(data: ClienteDTO): Promise<Cliente>;
    getByEmail(email: string): Promise<Cliente | undefined>;
    getByCpf(cpf: string): Promise<Cliente | undefined>;
}
