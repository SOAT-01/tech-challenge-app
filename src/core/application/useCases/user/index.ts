import { ClienteRepository } from "@domain/repositories/clienteRepository.interface";
import { IClienteUseCase } from "./cliente.useCase";
import { Cliente } from "@domain/entities/cliente";

export class ClienteUseCase implements IClienteUseCase {
    constructor(private readonly clienteRepository: ClienteRepository) {}

    public create(cliente: Cliente): Promise<Cliente> {
        return this.clienteRepository.create(cliente);
    }

    public getByCpf(cpf: string): Promise<Cliente> {
        return this.clienteRepository.getByCpf(cpf);
    }

    public getByEmail(email: string): Promise<Cliente> {
        return this.clienteRepository.getByEmail(email);
    }
}
