import { Cliente } from "@domain/entities/cliente";
import { ClienteRepository } from "@domain/repositories/clienteRepository.interface";
import { Cpf, Email } from "@domain/valueObjects";
import { IClienteUseCase } from "./cliente.interface";

export class ClienteUseCase implements IClienteUseCase {
    constructor(private readonly clienteRepository: ClienteRepository) {}

    public async create(cliente: Cliente): Promise<Cliente> {
        const alreadyExists = await this.clienteRepository.checkDuplicate({
            cpf: cliente.cpf.value,
            email: cliente.email.value,
        });

        if (alreadyExists) throw new Error("Cliente already exists.");

        return this.clienteRepository.create(cliente);
    }

    public async getByCpf(cpf: Cpf): Promise<Cliente> {
        return this.clienteRepository.getByCpf(cpf.value);
    }

    public async getByEmail(email: Email): Promise<Cliente> {
        return this.clienteRepository.getByEmail(email.value);
    }
}
